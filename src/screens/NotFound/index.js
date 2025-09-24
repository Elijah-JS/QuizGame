// src/screens/NotFound/index.jsx
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-zinc-400">
        Oops! The page you’re looking for doesn’t exist.
      </p>
    </div>
  );
}
