import Hero from "@/components/Hero";
import ContentSections from "@/components/ContentSections";
import { getProjects } from "@/app/actions/projectActions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dynamicProjects = await getProjects();

  return (
    <div className="w-full">
      <Hero />
      <div
        className="w-full h-10 md:h-12 lg:h-14 opacity-90"
        style={{ backgroundImage: "url('/sadu.png')", backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'center' }}
      ></div>
      <ContentSections dynamicProjects={dynamicProjects} />
    </div>
  );
}
