"use client";

import { useState } from "react";

export default function Review() {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  function checkAnswer() {
    const normalized = answer.trim().toLowerCase();

    if (normalized === "wykorzystać" || normalized === "skorzystać") {
      setMessage("Dobrze! ✓");
    } else if (!normalized) {
      setMessage("Wpisz odpowiedź.");
    } else {
      setMessage("Nie tym razem. Poprawna odpowiedź: wykorzystać; skorzystać");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-zinc-500">
          Spanish Studies
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Dzisiejsza powtórka
        </h1>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <p className="text-sm text-zinc-500">
            Język hiszpański
          </p>

          <h2 className="mt-4 text-2xl font-semibold">
            Co znaczy po polsku:
          </h2>

          <p className="mt-3 text-3xl font-bold">
            aprovechar
          </p>

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Wpisz odpowiedź po polsku"
            className="mt-6 w-full rounded-lg border border-zinc-300 px-3 py-3"
          />

          <button
            onClick={checkAnswer}
            className="mt-4 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white"
          >
            Sprawdź
          </button>

          {message && (
            <p className="mt-4 text-sm font-medium">
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}