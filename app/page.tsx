export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-medium text-zinc-500">
            Spanish Studies
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Mój system nauki hiszpańskiego
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-600">
            Język · Historia · Literatura
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h2 className="text-xl font-semibold">Język</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Słówka, gramatyka, przykłady i kontekst.
            </p>
            <a
              href="/language"
              className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            >
              Otwórz
            </a>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h2 className="text-xl font-semibold">Historia</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Osoby, wydarzenia, daty, miejsca i zależności.
            </p>
            <a
              href="/history"
              className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            >
              Otwórz
            </a>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h2 className="text-xl font-semibold">Literatura</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Autorzy, dzieła, pojęcia i najważniejsze motywy.
            </p>
            <a
              href="/literature"
              className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            >
              Otwórz
            </a>
          </div></section>
          </div>
          </main>
          );
          }