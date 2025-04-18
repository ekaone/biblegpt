import React from "react";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen rainbow-gradient-bg">
      <div className="container px-4 mx-auto text-left animate-fade-in animate-duration-1000 animate-delay-200">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
          Unlock Deeper Meaning with AI
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl">
          Your <strong>AI-powered</strong> Bible study assistant to{" "}
          <strong>explore</strong> and <strong>understand</strong> the
          scriptures better.
        </p>
      </div>
    </section>
  );
}
