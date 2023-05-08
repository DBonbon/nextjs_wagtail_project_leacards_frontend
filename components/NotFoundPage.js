import React from "react";
import Link from "next/link";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

          <section className="flex items-center h-full p-16">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
              <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl">
                  <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
                <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our
                  homepage.</p>
                <Link rel="noopener noreferrer" href="/"
                   className="px-4 py-3 text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Back to homepage
                </Link>
              </div>
            </div>
          </section>

      </div>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
