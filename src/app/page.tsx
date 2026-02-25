"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Galaxy from "../components/Galaxy";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fearless watermark removal: Check continuously and aggressively search shadow doms
    const removeWatermark = setInterval(() => {
      const scanAndRemove = (root: Document | ShadowRoot | Element) => {
        // Find visible or hidden anchor tags and SVG/Img tags for UnicornStudio
        const watermarks = root.querySelectorAll('a[href*="unicorn"]');
        watermarks.forEach(el => el.remove());

        // Recursively check elements with shadow roots
        const allElements = root.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.shadowRoot) {
            scanAndRemove(el.shadowRoot);
          }
        });
      };
      scanAndRemove(document);
    }, 100);

    return () => clearInterval(removeWatermark);
  }, []);

  // Initialize Unicorn Studio safely on mount/remount
  useEffect(() => {
    if (!isMounted) return;

    // We must poll for the library because Next.js soft-routing will keep the script tag loaded
    // but the actual WebGL canvas needs to be re-initialized every time the page mounts.
    const attemptInit = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).UnicornStudio) {
        clearInterval(attemptInit);

        // Wrap in a try-catch because re-initialization can occasionally throw if the canvas is locked
        try {
          (window as any).UnicornStudio.init()
            .then(() => {
              console.log("UnicornStudio initialized successfully on route.");
            })
            .catch((err: any) => {
              console.error("Failed to initialize UnicornStudio", err);
            });
        } catch (e) {
          console.error(e);
        }
      }
    }, 200);

    return () => clearInterval(attemptInit);
  }, [isMounted]);

  // Prevent hydration mismatch by only rendering the Unicorn Studio container after the component is fully mounted on the client.
  if (!isMounted) return <main className="w-screen h-screen overflow-hidden bg-black text-white" />;

  return (
    <div className="bg-black min-h-screen relative w-full overflow-x-hidden">
      <section className="w-full h-screen overflow-hidden bg-black text-white relative flex items-center justify-center">
        {/* Force hide Unicorn Studio watermark no matter what */}
        <style>{`
        a[href*="unicorn.studio"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>

        {/* Unicorn Studio Library Script */}
        <Script
          src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2/dist/unicornStudio.umd.js"
          strategy="afterInteractive"
        />

        {/* Header Overlay */}
        <header className="absolute top-0 left-0 w-full p-8 md:px-12 z-10 flex justify-between items-start pointer-events-auto">
          <div className="flex flex-col gap-1">
            <h1 className="text-[80px] font-bold leading-none tracking-tighter m-0 select-none">SUJITH</h1>
            <p className="text-xs md:text-sm font-light tracking-[0.3em] text-white/40 uppercase ml-1 select-none">Building Industrial Intelligence</p>
          </div>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </header>

        <AnimatePresence>
          {!isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 md:bottom-12 w-full flex justify-center z-10 pointer-events-auto"
            >
              <Link href="/about" className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 text-xs md:text-sm tracking-widest uppercase font-medium">
                <span>Explore My Story</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content Overlay (Optional, the user said they just want the webgl component but a hero structure is expected) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* We scale the container up slightly and shift it down so the absolute bottom (where the logo is injected) is pushed out of the visible viewport */}
          <div
            data-us-project="aXTPY3nP3dLMrjKImkkH"
            data-us-dpi="1"
            data-us-scale="1"
            data-us-fps="60"
            style={{ width: "100%", height: "115%", transform: "translateY(0%)" }}
            className="pointer-events-auto"
          ></div>

          {/* Minimal Galaxy Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-60">
            <Galaxy
              density={0.05} // Very minimal stars
              glowIntensity={0.1}
              twinkleIntensity={0.2}
              starSpeed={0.2}
              speed={0.5}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
