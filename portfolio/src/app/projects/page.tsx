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
    <main className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A selection of recent web design, WordPress, and custom development projects
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
