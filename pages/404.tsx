// 404.js
// React component for custom error page 404
// Redirects to home page

import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Custom 404 page component
const Custom404: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-6xl font-bold mb-14">Page Not Found</h2>
        <Link
          href="/"
          className="px-10 py-3 text-2xl font-bold bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default Custom404;
