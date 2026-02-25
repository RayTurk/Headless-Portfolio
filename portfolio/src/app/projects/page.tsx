import { Metadata } from 'next';
import { getAllProjects } from '@/lib/api';
import { BentoGrid } from '@/components/ui/bento-grid';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilter } from '@/components/projects/ProjectFilter';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Explore my portfolio of web design, WordPress, and custom development projects.',
  openGraph: {
    title: 'Projects',
    description: 'Explore my portfolio of web design, WordPress, and custom development projects.',
    type: 'website',
  },
};

export default async function ProjectsPage() {
  const { projects } = await getAllProjects();

  // Extract unique project types from projects
  const typeMap = new Map<string, { name: string; slug: string }>();
  projects.forEach((project) => {
    project.projectTypes?.nodes?.forEach((pt) => {
      if (!typeMap.has(pt.slug)) {
        typeMap.set(pt.slug, { name: pt.name, slug: pt.slug });
      }
    });
  });
  const projectTypes = Array.from(typeMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <main className="min-h-screen bg-surface-950 pt-32 pb-20 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-4">
            → Selected Work
          </p>
          <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tight text-cinder mb-3">
            MY <span className="text-brand-500">PROJECTS</span>
          </h1>
          <p className="font-display uppercase tracking-[0.08em] text-surface-400 text-lg mt-3">
            Web Design · WordPress · Custom Dev
          </p>
        </div>

        {/* Filter Bar */}
        <ProjectFilter
          projectTypes={[{ name: 'All', slug: 'all' }, ...projectTypes]}
          projects={projects}
        />
      </section>
    </main>
  );
}
