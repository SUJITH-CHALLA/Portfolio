"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { title: "HOME", href: "#" },
    { title: "WORK", href: "#work" },
    { title: "ABOUT", href: "#about" },
    { title: "CONTACT", href: "#contact" },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {

    return (
        <>
            {/* Menu Button (Two Lines) */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col justify-center items-end gap-[6px] w-[40px] h-[40px] relative z-50 group mix-blend-difference cursor-pointer"
                aria-label="Open Menu"
            >
                <div className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-10"></div>
                <div className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:w-10"></div>
            </button>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 md:top-12 md:right-12 text-white p-4 group cursor-pointer z-[110]"
                            aria-label="Close Menu"
                        >
                            <div className="relative w-8 h-8">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]"></div>
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45 transition-transform duration-300 group-hover:-rotate-[135deg]"></div>
                            </div>
                        </button>

                        {/* Navigation Links */}
                        <div className="flex flex-col items-center justify-center gap-0 w-full max-w-5xl px-4 md:px-8">
                            {navLinks.map((link, index) => (
                                <div key={index} className="overflow-hidden w-full relative group">
                                    <motion.a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ y: "100%", opacity: 0, rotate: 5 }}
                                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                                        exit={{ y: "20%", opacity: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative flex items-center justify-center text-[60px] md:text-[80px] lg:text-[110px] leading-[0.85] font-black italic tracking-tighter uppercase cursor-pointer text-center w-full"
                                    >
                                        {/* Hover Arrow Indicator - slides in from left */}
                                        <span className="absolute left-[5%] md:left-[15%] lg:left-[20%] text-2xl md:text-5xl opacity-0 -translate-x-12 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out text-white font-normal !not-italic">
                                            ↗
                                        </span>

                                        {/* Text Layer - Outlined by default, fills to solid white on hover like kingkohli site */}
                                        <span className="text-transparent transition-all duration-500 ease-out [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,1)] group-hover:text-white">
                                            {link.title}
                                        </span>
                                    </motion.a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
