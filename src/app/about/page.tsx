"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Ensure Lanyard only renders on the client side because of 3D / WebGL dependencies
const Lanyard = dynamic(() => import("../../components/Lanyard"), {
    ssr: false,
    loading: () => null,
});

export default function AboutPage() {
    return (
        <div className="min-h-screen lg:h-screen w-full bg-black text-white overflow-x-hidden lg:overflow-hidden relative flex flex-col lg:flex-row">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,40,90,0.15),rgba(0,0,0,1))] pointer-events-none" />

            {/* Back to Home Navigation */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-auto">
                <Link
                    href="/"
                    className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 text-xs tracking-widest uppercase font-medium text-gray-300 hover:text-white"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Return</span>
                </Link>
            </div>

            {/* Left Column: 3D Lanyard Interactive Component */}
            <div className="w-full lg:w-1/2 min-h-[50vh] lg:h-full relative z-10 flex items-center justify-center cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-white/10 pointer-events-auto shrink-0">
                <Lanyard position={[0, 0, 16]} fov={18} />
            </div>

            {/* Right Column: About Details */}
            <div className="w-full lg:w-1/2 flex-1 lg:h-full relative z-10 flex flex-col justify-center px-8 py-6 lg:px-8 xl:px-16 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-xl mx-auto w-full my-auto flex flex-col justify-center h-full"
                >
                    <div className="inline-block px-3 py-1 mb-4 text-[9px] md:text-[10px] uppercase font-mono tracking-[0.3em] text-blue-400 bg-blue-900/20 rounded-full border border-blue-500/30 w-max shrink-0">
                        About Me
                    </div>

                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mb-4 leading-tight shrink-0">
                        Engineering structure,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                            Coding intelligence.
                        </span>
                    </h1>

                    <div className="space-y-3 text-gray-400 text-xs md:text-sm leading-relaxed font-light overflow-hidden">
                        <p>
                            I am a multidisciplinary engineer who thrives at the intersection of heavy mechanical machinery and cutting-edge software development. Whether it's drafting precise CAD models for industrial erection or architecting robust backend infrastructures for scalable web applications, my approach remains the same: meticulous design and flawless execution.
                        </p>
                        <p>
                            My background provides me with a unique perspective. I don't just write code; I understand how physical systems operate in the real world. This allows me to build comprehensive AI tools and system integrations that bridge the gap between hardware and software.
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-6 shrink-0">
                        <div>
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2">Focus Areas</h4>
                            <p className="text-sm text-gray-200">Mechanical Design • Full-Stack Web • AI Tooling</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-2">Location</h4>
                            <p className="text-sm text-gray-200">Global / Remote</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
