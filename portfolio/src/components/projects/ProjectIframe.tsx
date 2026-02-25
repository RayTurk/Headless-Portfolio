'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectIframeData {
  title: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

interface ProjectIframeProps {
  project: ProjectIframeData;
}

export function ProjectIframe({ project }: ProjectIframeProps) {
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = project.featuredImage?.node?.sourceUrl;
  const hasImage = !!imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      {/* Device Frame */}
      <div className="relative rounded-2xl overflow-hidden bg-surface-900 border border-surface-700 shadow-2xl">
        {/* Browser Chrome */}
        <div className="bg-surface-800 px-6 py-4 border-b border-surface-700 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 ml-4 px-3 py-1 bg-surface-700 rounded text-xs text-ash truncate">
            project preview
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full bg-white aspect-video overflow-hidden">
          {hasImage ? (
            <Image
              src={imageUrl!}
              alt={project.featuredImage?.node?.altText || project.title}
              fill
              className="object-cover"
              onLoad={() => setIsLoading(false)}
            />
          ) : null}
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-surface-400 text-sm mt-4">
        {hasImage && 'Project showcase'}
      </p>
    </motion.div>
  );
}
