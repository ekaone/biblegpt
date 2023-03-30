import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

// Components
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingDots from "@/components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `I want you to act as a Bible Answered, You will answer based on your knowledge of Bible principles, follow the user's instructions carefully with ${vibe} point of view. ${bio}`;

  const generateBio = async (e: any) => {
    e.preventDefault();

    if (bio === "") {
      toast.error("Please enter a question");
      return;
    }

    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  // util helper to convert new lines to <br /> tags
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>BibleGPT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/number-1.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Write your question or topic{" "}
              <span className="text-slate-500">
                (and you can write with your own language)
              </span>
              .
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-pink-500 my-5"
            placeholder={"e.g. What does the Bible say about tattoos?"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/number-2.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!loading && (
            <button
              className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate answer &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-gradient-to-br from-lime-500 to-green-500 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              🪄 <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated answer
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios && (
                  <div
                    className="text-justify bg-white rounded-xl shadow-md hover:bg-gray-100 transition cursor-copy border p-4"
                    onClick={() => {
                      // @ts-ignore
                      navigator.clipboard.writeText(generatedBios);
                      toast("Result copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                  >
                    <p>
                      {
                        // @ts-ignore
                        convertNewLines(generatedBios)
                      }
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
