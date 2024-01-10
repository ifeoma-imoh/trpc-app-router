import Main from "@/components/Main";

export default function Home() {
  return (
    <main className="py-12 px-8">
      <h1 className="text-center font-semibold text-3xl">
        TRPC Next.js App Router Demo
      </h1>
      <section className="w-full max-w-[50rem] mx-auto my-8 grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-12">
        <Main />
      </section>
    </main>
  );
}