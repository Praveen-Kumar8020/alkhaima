import Hero from "@/components/Hero";
import ContentSections from "@/components/ContentSections";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div 
        className="w-full h-10 md:h-14 lg:h-16 opacity-90"
        style={{ backgroundImage: "url('/sadu.png')", backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'center' }}
      ></div>
      <ContentSections />
    </div>
  );
}
