import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink, Github } from 'lucide-react';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from '@/lib/api';
import { ProjectIframe } from '@/components/projects/ProjectIframe';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const revalidate = 3600 // Revalidate every hour
export const dynamicParams = true // Render new slugs on-demand without a rebuild

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const description =
    project.projectInfo?.projectExcerpt ||
    project.excerpt?.replace(/<[^>]*>/g, '') ||
    '';
  const imageUrl = project.featuredImage?.node?.sourceUrl;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'website',
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: project.title }]
        : [],
    },
    keywords: [
      project.title,
      ...(project.projectTypes?.nodes?.map((pt) => pt.name) || []),
      ...(project.techStacks?.nodes?.map((t) => t.name) || []),
    ],
  };
}

export default async function ProjectPage(
  { params }: { params: { slug: string } }
) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const projectTypeId = project.projectTypes?.nodes?.[0]?.id;
  const projectTypeName = project.projectTypes?.nodes?.[0]?.name || 'Work';
  const relatedProjects = await getRelatedProjects(project.id, projectTypeId);

  const imageUrl = project.featuredImage?.node?.sourceUrl;
  const technologies = project.techStacks?.nodes || [];

  const breadcrumbItems = [
    { label: 'Projects', href: '/projects' },
    { label: project.title },
  ];

  return (
    <main className="min-h-screen bg-surface-950">
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12">

        {/* Breadcrumbs */}
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto mt-10 mb-16">
          {/* Eyebrow */}
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-4">
            → {projectTypeName}
          </p>

          {/* Title */}
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl uppercase leading-none tracking-tight text-cinder mb-10">
            {project.title}
          </h1>

          {/* Meta row */}
          {(project.projectDetails?.clientName ||
            project.projectDetails?.projectDate ||
            project.projectDetails?.projectDuration) && (
            <div className="flex flex-wrap gap-x-10 gap-y-5 mb-10 pb-10 border-b border-surface-800">
              {project.projectDetails?.clientName && (
                <div>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase text-surface-500 mb-1.5">
                    Client
                  </p>
                  <p className="text-cinder font-semibold">
                    {project.projectDetails.clientName}
                  </p>
                </div>
              )}
              {project.projectDetails?.projectDate && (
                <div>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase text-surface-500 mb-1.5">
                    Completed
                  </p>
                  <p className="text-cinder font-semibold">
                    {new Date(project.projectDetails.projectDate).toLocaleDateString(
                      'en-US',
                      { year: 'numeric', month: 'long' }
                    )}
                  </p>
                </div>
              )}
              {project.projectDetails?.projectDuration && (
                <div>
                  <p className="font-mono text-xs tracking-[0.15em] uppercase text-surface-500 mb-1.5">
                    Duration
                  </p>
                  <p className="text-cinder font-semibold">
                    {project.projectDetails.projectDuration}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {technologies.length > 0 && (
            <div className="mb-10">
              <p className="font-mono text-xs tracking-[0.15em] uppercase text-surface-500 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="font-mono text-xs px-3 py-1.5 bg-surface-900 text-ash border border-surface-700 rounded"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.projectInfo?.projectUrl && (
              <a
                href={project.projectInfo.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                View Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.projectInfo?.githubUrl && (
              <a
                href={project.projectInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-800 hover:bg-surface-700 text-ash border border-surface-700 font-semibold rounded-lg transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            )}
          </div>
        </section>

        {/* ── Project Preview ── */}
        {imageUrl && (
          <section className="max-w-5xl mx-auto mb-20">
            <ProjectIframe project={project} />
          </section>
        )}

        {/* ── Description ── */}
        {project.content && (
          <section className="max-w-3xl mx-auto mb-20">
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-brand-500 mb-6">
              → About This Project
            </p>
            <div className="prose prose-invert prose-lg max-w-none text-ash [&_a]:text-brand-400 [&_a:hover]:text-brand-300">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </section>
        )}

        {/* ── Related Projects ── */}
        {relatedProjects && relatedProjects.length > 0 && (
          <section className="max-w-5xl mx-auto border-t border-surface-800 pt-16">
            <RelatedProjects projects={relatedProjects} />
          </section>
        )}
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.excerpt?.replace(/<[^>]*>/g, '') || '',
            image: imageUrl,
            creator: { '@type': 'Person', name: 'Ray Turk' },
            dateCreated: project.date,
            dateModified: project.modified,
          }),
        }}
      />
    </main>
  );
}
