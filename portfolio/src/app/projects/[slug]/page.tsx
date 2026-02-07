import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from '@/lib/api';
import { ProjectIframe } from '@/components/projects/ProjectIframe';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
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

  const description = project.projectFields?.seoDescription ||
    project.excerpt?.replace(/<[^>]*>/g, '') || '';
  const imageUrl = project.featuredImage?.node?.sourceUrl;

  return {
    title: project.projectFields?.seoTitle || `${project.title} | Projects`,
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
            {project.projectFields?.clientName && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Client</p>
                <p className="text-lg font-semibold text-white">{project.projectFields.clientName}</p>
              </div>
            )}
            {project.projectFields?.projectDate && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Completed</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(project.projectFields.projectDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            )}
            {project.projectFields?.projectDuration && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Duration</p>
                <p className="text-lg font-semibold text-white">{project.projectFields.projectDuration}</p>
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
            {project.projectFields?.liveUrl && (
              <a
                href={project.projectFields.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Live Site
              </a>
            )}
            {project.projectFields?.githubUrl && (
              <a
                href={project.projectFields.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </section>

        {/* Project Iframe / Preview */}
        {(project.projectFields?.iframeEmbedUrl || project.projectFields?.projectGif || imageUrl) && (
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

        {/* Gallery */}
        {project.projectFields?.projectGallery && project.projectFields.projectGallery.length > 0 && (
          <section className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-white">Project Gallery</h2>
            <ProjectGallery
              images={project.projectFields.projectGallery.map((img) => ({
                url: img.sourceUrl,
                alt: img.altText || project.title,
              }))}
            />
          </section>
        )}

        {/* Testimonial */}
        {project.projectFields?.projectTestimonial && (
          <section className="max-w-3xl mx-auto mb-20 p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20">
            <div className="text-lg text-slate-300 italic mb-4">
              &ldquo;{project.projectFields.projectTestimonial}&rdquo;
            </div>
            {project.projectFields.testimonialAuthor && (
              <div className="text-slate-400">
                &mdash; {project.projectFields.testimonialAuthor}
                {project.projectFields.testimonialRole && (
                  <span className="text-slate-500">, {project.projectFields.testimonialRole}</span>
                )}
              </div>
            )}
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
