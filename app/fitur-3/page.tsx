export default function Fitur3() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
            Fitur 3
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Halaman untuk Fitur 3 lomba. Silakan kembangkan fitur Anda di sini.
          </p>
          <div className="mt-8 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <p className="text-zinc-700 dark:text-zinc-300">
              Konten fitur 3 akan ditampilkan di sini.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
