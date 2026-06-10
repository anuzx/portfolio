"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/containers";

import Projects from "@/components/projects";
import { Github, Linkedin, Mail, FileUser, FileText } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Timeline from "@/components/timeline";
import GithubGraph from "@/components/githubgraph";
import Skills from "@/components/skills";
import GetInTouch from "@/components/get-in-touch";

export default function Home() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socials = [

    {
      name: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/anuzx", "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://linkedin.com/in/your-linkedin", "_blank"),
    },
    {
      name: "X",
      icon: FaXTwitter,
      action: () => window.open("https://x.com/0xzdev", "_blank"),
    },
    {
      name: "Resume",
      icon: FileText,
      action: () => window.open("", "_blank")
    },
  ];

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-[200vh] px-8 pt-24 md:p-20 md:pb-10 mx-auto ">

        {/* RIGHT BORDER */}
        <div
          className="absolute right-0 top-0 h-full w-6 border-x border-x-(--pattern-fg) 
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* LEFT BORDER */}
        <div
          className="absolute left-0 top-0 h-full w-6 border-x border-x-(--pattern-fg) 
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* ---------------------------------------- */}
        {/* HEADING + SOCIALS (FIXED SAME LINE) */}
        {/* ---------------------------------------- */}

        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">Anuj  Parasar</span>
          </h1>

          <div className="flex flex-wrap gap-4 sm:justify-end">
            {socials.map((social) => (
              <div
                key={social.name}
                className="relative cursor-pointer"
                onClick={social.action}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <social.icon
                  size={18}
                  className="text-neutral-900 dark:text-neutral-50 opacity-70 hover:opacity-100 transition"
                />
                <AnimatePresence>
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <div
                        className="
                          relative
                          bg-neutral-900 dark:bg-neutral-100
                          text-neutral-100 dark:text-neutral-900
                          text-[10px]
                          px-2 py-1
                          rounded-md
                          shadow-xl
                          whitespace-nowrap
                          font-custom2
                        "
                      >
                        {social.name}
                        <div
                          className="
                            absolute
                            left-1/2
                            top-full
                            -translate-x-1/2
                            border-4
                            border-transparent
                            border-t-neutral-900
                            dark:border-t-neutral-100
                          "
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* SUBTEXT */}
        {/* ---------------------------------------- */}

        <div className="text-secondary font-custom2 text-s mt-1">
          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">Full-stack developer and an avid Linux enthusiast.</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-bold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">AI is something that excites me nowadays.</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">
              “Focused on building robust backends & resilient systems.”
            </span>
          </p>
        </div>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-6 -mx-2 md:-mx-14"></div>



        <Projects />

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14"></div>


        <Timeline></Timeline>



        <GithubGraph></GithubGraph>

        <Skills />

        <GetInTouch />


      </Container>
    </div> );
} 
 

 

 
  
 
  
 
    
 
 
 
  
    
      
    
    
  
    
  
  
 
 

 
 
 

 

  
  
    
 
    
  
      
      
        
          
            
          
          
        
          
        
      
        
        


        
        
      
    
  
    
 
  

  
 
 
 
  
 
 
 

 
   
 














































































































































































































































































































































































































































































































































































































































































































































 

  

  

    

  

  

  
  
  
    
  
    
    
    
     
    
 
      

      
 

 



 

 



  









  

    

    

  



  

    

    

  



  

    

    





































































