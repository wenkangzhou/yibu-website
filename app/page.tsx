import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TravelMap } from "@/components/sections/map";
import { Hobbies } from "@/components/sections/hobbies";
import { Achievements } from "@/components/sections/achievements";
import { Works } from "@/components/sections/works";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TravelMap />
      <Hobbies />
      <Achievements />
      <Works />
    </>
  );
}
