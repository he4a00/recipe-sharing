//app/page.tsx

import Hero from "../components/Hero";
import RecipesWrapper from "../components/RecipesWrapper";

export default function Home() {
  return (
    <main className="w-[99vw] overflow-hidden">
      <Hero />
      <RecipesWrapper />
    </main>
  );
}
