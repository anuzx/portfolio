"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

const PREVIEW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PREVIEW_ASPECT = 1.91;
// On phones the card hides this long after the last scroll event.
const SCROLL_IDLE_MS = 700;

export type FloatingPreviewActive = {
  title: string;
  image?: string;
};

export type FloatingPreviewApi = {
  mounted: boolean;
  listRef: RefObject<HTMLDivElement | null>;
  activeIdx: number | null;
  hoveredIdx: number | null;
  /** Call from a row's onMouseEnter. Ignored on touch devices. */
  onRowEnter: (idx: number, e: ReactMouseEvent) => void;
  onMouseMove: (e: ReactMouseEvent) => void;
  onMouseLeave: () => void;
  previewX: MotionValue<number>;
  previewY: MotionValue<number>;
};

/**
 * Shared hover-preview state for list rows marked with `data-preview-row`.
 * Desktop (real hover): the preview spring-follows the cursor.
 * Phones: the preview shows only WHILE the user scrolls, on the row crossing
 * ~62% of the viewport, pinned to the right edge.
 */
export function useFloatingPreview(): FloatingPreviewApi {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrollIdx, setScrollIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  // false until the card has been given a real position for this showing
  const placed = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 260, damping: 28, mass: 0.6 });
  const previewY = useSpring(mouseY, { stiffness: 260, damping: 28, mass: 0.6 });

  const activeIdx = hoveredIdx ?? scrollIdx;

  useEffect(() => {
    setMounted(true);
  }, []);

  // When the card hides, forget its position so the next showing snaps
  // straight to the right place instead of springing in from (0, 0).
  useEffect(() => {
    if (activeIdx === null) placed.current = false;
  }, [activeIdx]);

  const previewSize = () => {
    const width = window.innerWidth < 768 ? 160 : 224;
    return { width, height: width / PREVIEW_ASPECT + 4 };
  };

  const place = (x: number, y: number) => {
    mouseX.set(x);
    mouseY.set(y);
    if (!placed.current) {
      // jump() skips the spring: no fly-in from the top-left corner.
      previewX.jump(x);
      previewY.jump(y);
      placed.current = true;
    }
  };

  const trackCursor = (clientX: number, clientY: number) => {
    const { width, height } = previewSize();
    let left = clientX + 24;
    if (left + width > window.innerWidth - 12) left = clientX - 24 - width;
    left = Math.max(12, left);
    const top = Math.min(
      Math.max(clientY - 150, 56),
      window.innerHeight - height - 12,
    );
    place(left, top);
  };

  const trackRow = (rect: DOMRect) => {
    const { width, height } = previewSize();
    const top = rect.top + rect.height / 2 - height / 2;
    place(
      window.innerWidth - width - 16,
      Math.min(Math.max(top, 56), window.innerHeight - height - 12),
    );
  };

  // Phones only: show while scrolling, hide when scrolling stops.
  useEffect(() => {
    if (!mounted) return;
    if (!window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let idle = 0;
    // Ignore scrolls we did not cause by touch (e.g. Next.js scrolling to
    // the top after navigation), so nothing flashes on arrival.
    let userTouched = false;

    const update = () => {
      raf = 0;
      const rows = listRef.current?.querySelectorAll<HTMLElement>(
        "[data-preview-row]",
      );
      if (!rows || rows.length === 0) {
        setScrollIdx(null);
        return;
      }
      const line = window.innerHeight * 0.62;
      let found = -1;
      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        if (line >= rect.top && line < rect.bottom) found = index;
      });
      if (found < 0) {
        setScrollIdx(null);
        return;
      }
      trackRow(rows[found].getBoundingClientRect());
      setScrollIdx(found);
    };

    const onTouch = () => {
      userTouched = true;
    };
    const onScroll = () => {
      if (!userTouched) return;
      if (!raf) raf = requestAnimationFrame(update);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setScrollIdx(null), SCROLL_IDLE_MS);
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return {
    mounted,
    listRef,
    activeIdx,
    hoveredIdx,
    onRowEnter: (idx, e) => {
      // Taps on phones fire an emulated mouseenter. Ignore it.
      if (!canHover()) return;
      // A bogus (0,0) event would put the card in the top-left corner.
      if (e.clientX === 0 && e.clientY === 0) return;
      trackCursor(e.clientX, e.clientY);
      setHoveredIdx(idx);
    },
    onMouseMove: (e) => {
      if (!canHover()) return;
      trackCursor(e.clientX, e.clientY);
    },
    onMouseLeave: () => setHoveredIdx(null),
    previewX,
    previewY,
  };
}

/**
 * Floating preview card, rendered in a portal so nothing can clip it.
 * Shows the cover image when available, otherwise a title fallback card.
 */
export const FloatingPreview = ({
  mounted,
  previewX,
  previewY,
  active,
}: {
  mounted: boolean;
  previewX: MotionValue<number>;
  previewY: MotionValue<number>;
  active: FloatingPreviewActive | null;
}) => {
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          key="floating-preview"
          aria-hidden="true"
          className="pointer-events-none fixed z-50 w-40 overflow-hidden rounded-lg border-2 border-neutral-900 bg-neutral-100 shadow-[0_18px_45px_-14px_rgba(0,0,0,0.4)] md:w-56 dark:border-white dark:bg-neutral-900"
          style={{ left: previewX, top: previewY }}
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: PREVIEW_EASE }}
        >
          {active.image ? (
            <Image
              src={active.image}
              alt=""
              width={512}
              height={268}
              className="block aspect-[1.91/1] w-full object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[1.91/1] w-full flex-col justify-between p-3">
              <span className="font-custom2 text-[10px] tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
                writing
              </span>
              <span className="font-custom2 text-sm leading-5 font-medium text-neutral-900 dark:text-neutral-100">
                {active.title}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
