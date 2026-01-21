import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1220] to-black text-white">
      <header className="flex justify-between px-10 py-6">
        <h1 className="text-xl font-semibold">Shubham Parab</h1>
        <nav className="space-x-6 text-sm text-gray-300">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="flex flex-col items-center text-center mt-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold">
          Hi, Im <span className="text-cyan-400">Shubham Parab</span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl">
          Full Stack Software Engineer | Immediately Available | React, Next.js
          & MERN Specialist
        </p>

        <div className="relative mt-10 w-44 h-44 rounded-full overflow-hidden border-4 border-cyan-400">
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <p className="mt-8 text-gray-400 max-w-xl">
          Full Stack Engineer with nearly 4 years of experience building
          scalable MERN applications and deploying them on AWS.
        </p>

        <div className="mt-10">
          <Button className="bg-cyan-400 text-black hover:bg-cyan-300">
            Download Resume
          </Button>
        </div>
      </section>
    </main>
  );
}
