import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-2 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/bible.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          BibleGPT
        </h1>
      </Link>
      <Link
        href="https://twitter.com/twekaone"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Bible Icon"
          src="/icon-36x36.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={36}
        />
      </Link>
    </header>
  );
}
