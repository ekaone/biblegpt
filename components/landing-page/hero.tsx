"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen">
      <div className="container px-4 mx-auto text-left animate-fade-in animate-duration-1000 animate-delay-200">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
          Unlock Deeper Meaning with AI
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl">
          Your <strong>AI-powered</strong> Bible study assistant to{" "}
          <strong>explore</strong> and <strong>understand</strong> the
          scriptures better.
        </p>
        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8 inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-md hover:from-blue-600 hover:to-pink-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 drop-shadow-md"
        >
          <Link href="/board" passHref>
            Go to Board
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
