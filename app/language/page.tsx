"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type VocabularyResult = {
  spanish: string;
  polish: string;
  part_of_speech: string;
  gender: string | null;
  plural: string | null;
  is_reflexive: boolean;
  reflexive_form: string | null;
  grammatical_info: string | null;
  spanish_example: string;
  polish_example: string;
    context: string | null;
      notes: string | null;
        synonyms: {
            spanish: string;
                polish: string;
                    explanation: string;
                      }[];
                        antonyms: {
                            spanish: string;
                                polish: string;
                                    explanation: string;
                                      }[];
                                      };

export default function Language() {
  const [spanish, setSpanish] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<VocabularyResult | null>(null);

  async function addWord() {
    setMessage("");
    setResult(null);

    if (!spanish.trim()) {
      setMessage("Wpisz hiszpańskie słowo lub wyrażenie.");
      return;
    }

    setMessage("Przygotowuję słowo…");

    try {
      const response = await fetch("/api/ai/vocabulary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spanish: spanish.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Wystąpił błąd.");
        return;
      }

      setResult(data);
      const saveResponse = await fetch("/api/vocabulary", {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
                  },
                    body: JSON.stringify(data),
                    });

                    const saveData = await saveResponse.json();

                    if (!saveResponse.ok) {
                      setMessage(saveData.error || "Nie udało się zapisać słowa.");
                        return;
                        }

                        setMessage("Słowo zostało dodane.");
      
    } catch (error) {
      console.error(error);
      setMessage("Nie udało się połączyć z AI.");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Język hiszpański
        </h1>

        <p className="mt-3 text-zinc-600">
          Słówka, gramatyka, przykłady i kontekst.
        </p>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-xl font-semibold">
            Dodaj nowe słowo
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Wpisz tylko hiszpańskie słowo lub wyrażenie. Resztą zajmie się AI.
          </p>

          <label className="mt-6 block text-sm font-medium">
            Hiszpańskie słowo lub wyrażenie
          </label>

          <input
            value={spanish}
            onChange={(e) => setSpanish(e.target.value)}
            placeholder="np. aprovechar"
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />

          <button
            onClick={addWord}
            className="mt-5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            Dodaj słowo
          </button>

          {message && (
            <p className="mt-4 text-sm text-zinc-700">
              {message}
            </p>
          )}

          {result && (
            <div className="mt-6 rounded-xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
              <h3 className="text-lg font-semibold">
                Wynik AI
              </h3>

              <p className="mt-3">
                <strong>Hiszpański:</strong> {result.spanish}
              </p>

              <p className="mt-2">
                <strong>Polski:</strong> {result.polish}
              </p>

              <p className="mt-2">
                <strong>Część mowy:</strong> {result.part_of_speech}
              </p>

              {result.gender && (
                <p className="mt-2">
                  <strong>Rodzaj:</strong> {result.gender}
                </p>
              )}

              {result.plural && (
                <p className="mt-2">
                  <strong>Liczba mnoga:</strong> {result.plural}
                </p>
              )}

              <p className="mt-2">
                <strong>Zwrotny:</strong>{" "}
                {result.is_reflexive ? "tak" : "nie"}
              </p>

              {result.reflexive_form && (
                <p className="mt-2">
                  <strong>Forma zwrotna:</strong>{" "}
                  {result.reflexive_form}
                </p>
              )}

              {result.grammatical_info && (
                <p className="mt-2">
                  <strong>Gramatyka:</strong>{" "}
                  {result.grammatical_info}
                </p>
              )}

              <p className="mt-2">
                <strong>Przykład:</strong>{" "}
                {result.spanish_example}
              </p>

              <p className="mt-2">
                <strong>Tłumaczenie:</strong>{" "}
                {result.polish_example}
              </p>

              {result.context && (
                <p className="mt-2">
                  <strong>Kontekst:</strong> {result.context}
                </p>
              )}

              {result.notes && (
                <p className="mt-2">
                  <strong>Uwagi:</strong> {result.notes}
                </p>
              )}
                            {result.synonyms.length > 0 && (
                                              <div className="mt-4">
                                                                <strong>Synonimy:</strong>
                                                                                  <ul className="mt-2 list-disc pl-6">
                                                                                                      {result.synonyms.map((item, index) => (
                                                                                                                            <li key={index} className="mt-1">
                                                                                                                                                    <strong>{item.spanish}</strong> — {item.polish}
                                                                                                                                                                            <p className="text-sm text-zinc-600">
                                                                                                                                                                                                      {item.explanation}
                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                    </li>
                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                          </ul>
                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                        )}

                                                                                                                                                                                                                                                                                                                                      {result.antonyms.length > 0 && (
                                                                                                                                                                                                                                                                                                                                                      <div className="mt-4">
                                                                                                                                                                                                                                                                                                                                                                        <strong>Antonimy:</strong>
                                                                                                                                                                                                                                                                                                                                                                                          <ul className="mt-2 list-disc pl-6">
                                                                                                                                                                                                                                                                                                                                                                                                              {result.antonyms.map((item, index) => (
                                                                                                                                                                                                                                                                                                                                                                                                                                    <li key={index} className="mt-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                            <strong>{item.spanish}</strong> — {item.polish}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <p className="text-sm text-zinc-600">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              {item.explanation}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </ul>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                )}
                            
            </div>
          )}
        </section>
      </div>
    </main>
  );
}