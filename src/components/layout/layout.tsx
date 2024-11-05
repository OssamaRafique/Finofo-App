import * as React from "react";
import "./layout.css";

export function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="gradient-bg min-h-screen pt-10 md:pt-10 pb-6 px-2 md:px-0">
        <header className="max-w-lg mx-auto">
          <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">
              Finofo Exercise
            </h1>
          </a>
        </header>

        <main className="bg-white max-w-[85%] mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          {children}
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">
            Developed by&nbsp;
            <a
              href="https://ossamarafique.com"
              className="font-bold hover:underline"
              target="_blank"
            >
              Ossama Rafique
            </a>
          </p>
        </div>

        <footer className="max-w-lg mx-auto flex justify-center text-white">
          <a
            href="https://ossamarafique.com"
            target="_blank"
            className="hover:underline"
          >
            Portfolio
          </a>
          <span className="mx-3">•</span>
          <a
            href="https://github.com/OssamaRafique"
            target="_blank"
            className="hover:underline"
          >
            Github
          </a>
          <span className="mx-3">•</span>
          <a
            href="https://linkedin.com/in/ossamarafique"
            target="_blank"
            className="hover:underline"
          >
            Linkedin
          </a>
        </footer>
      </div>
    </>
  );
}