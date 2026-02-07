import { Metadata, MetadataRoute } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
} from '@/lib/api';
import { ProjectIframe } from '@/components/projects/ProjectIframe';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { motion } from 'framer-motion';
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

  return {
    title: `${project.title.rendered} | Projects`,
    description: project.excerpt.rendered.replace(/<[^>]*>/g, ''),
    openGraph: {
      title: project.title.rendered,
      description: project.excerpt.rendered.replace(/<[^>]*>/g, ''),
      type: 'website',
      images: project.featured_media_url
        ? [
            {
              url: project.featured_media_url,
              width: 1200,
              height: 630,
              alt: project.title.rendered,
            },
          ]
        : [],
    },
    keywords: [
      project.title.rendered,
      ...(project.project_type?.map((pt: any) => pt.name) || []),
      ...(project.technologies?.map((t: any) => t.name) || []),
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

  const relatedProjects = await getRelatedProjects(project.id, project.project_type?.[0]?.id);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title.rendered, href: `/projects/${params.slug}`, current: true },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="pt-32 pb-20 px-4 md:px-8 lg:px-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 mt-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            {project.title.rendered}
          </h1>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-6 mb-8 text-slate-300">
            {project.client_name && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Client</p>
                <p className="text-lg font-semibold text-white">{project.client_name}</p>
              </div>
            )}
            {project.completion_date && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Completed</p>
                <p className="text-lg font-semibold text-white">
                  {new Date(project.completion_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            )}
            {project.project_duration && (
              <div>
                <p className="text-sm text-slate-400 uppercase tracking-wide">Duration</p>
                <p className="text-lg font-semibold text-white">{project.project_duration}</p>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-slate-400 uppercase tracking-wide mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: any) => (
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
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Live Site
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </motion.section>

        {/* Project Iframe / Preview */}
        {(project.iframe_url || project.demo_gif_url || project.featured_media_url) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <ProjectIframe project={project} />
          </motion.section>
        )}

        {/* Description */}
        {project.content.rendered && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              <div
                dangerouslySetInnerHTML={{ __html: project.content.rendered }}
              />
            </div>
          </motion.section>
        )}

        {/* Gallery */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">Project Gallery</h2>
            <ProjectGallery images={project.gallery_images} />
          </motion.section>
        )}

        {/* Testimonial */}
        {project.client_testimonial && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-20 p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20"
          >
            <div className="text-lg text-slate-300 italic mb-4">
              "{project.client_testimonial}"
            </div>
            {project.client_name && (
              <div className="text-slate-400">— {project.client_name}</div>
            )}
          </motion.section>
        )}

        {/* Related Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <RelatedProjects projects={relatedProjects} />
          </motion.section>
        )}
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title.rendered,
            description: project.excerpt.rendered.replace(/<[^>]*>/g, ''),
            image: project.featured_media_url,
            creator: {
              '@type': 'Person',
              name: 'Portfolio Owner',
            },
            dateCreated: project.date,
            dateModified: project.modified,
          }),
        }}
      />
    </main>
  );
}
