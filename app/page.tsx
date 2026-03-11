import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Hobbies } from "@/components/sections/hobbies";
import { Achievements } from "@/components/sections/achievements";
import { Works } from "@/components/sections/works";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Hobbies />
      <Achievements />
      <Works />
    </>
  );
}
