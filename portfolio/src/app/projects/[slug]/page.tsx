import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from '@/lib/api';
import { ProjectIframe } from '@/components/projects/ProjectIframe';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const description = project.projectInfo?.projectExcerpt ||
    project.excerpt?.replace(/<[^>]*>/g, '') || '';
  const imageUrl = project.featuredImage?.node?.sourceUrl;

  return {
    title: `${project.title} | Projects`,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
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
  const relatedProjects = await getRelatedProjects(project.id, projectTypeId);

  const imageUrl = project.featuredImage?.node?.sourceUrl;
  const technologies = project.techStacks?.nodes || [];

  const breadcrumbItems = [
    { label: 'Projects', href: '/projects' },
    { label: project.title },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            {project.title}
          </h1>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-6 mb-8 text-slate-300">
            {project.projectDetails?.clientName && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Client</p>
                <p className="text-lg font-semibold text-white">{project.projectDetails.clientName}</p>
              </div>
            )}
            {project.projectDetails?.projectDate && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Completed</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(project.projectDetails.projectDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            )}
            {project.projectDetails?.projectDuration && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Duration</p>
                <p className="text-lg font-semibold text-white">{project.projectDetails.projectDuration}</p>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {technologies.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-slate-400 uppercase tracking-wide mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.projectInfo?.projectUrl && (
              <a
                href={project.projectInfo.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Live Site
              </a>
            )}
            {project.projectInfo?.githubUrl && (
              <a
                href={project.projectInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </section>

        {/* Project Preview */}
        {imageUrl && (
          <section className="max-w-5xl mx-auto mb-20">
            <ProjectIframe project={project} />
          </section>
        )}

        {/* Description */}
        {project.content && (
          <section className="max-w-3xl mx-auto mb-16">
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              <div
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <section className="max-w-5xl mx-auto">
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
            creator: {
              '@type': 'Person',
              name: 'Ray Turk',
            },
            dateCreated: project.date,
            dateModified: project.modified,
          }),
        }}
      />
    </main>
  );
}
