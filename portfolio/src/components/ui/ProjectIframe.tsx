'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Monitor, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WPImage {
  src: string;
  alt: string;
}

interface ProjectIframeProps {
  embedUrl?: string;
  fallbackGif?: string;
  fallbackImage?: WPImage;
  title: string;
  brandColor?: string;
  className?: string;
}

const ProjectIframe = ({
  embedUrl,
  fallbackGif,
  fallbackImage,
  title,
  brandColor = '#6366f1',
  className,
}: ProjectIframeProps) => {
  const [isLoading, setIsLoading] = useState(!!embedUrl);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedUrl || !isInteractive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInteractive(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [embedUrl, isInteractive]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleContainerClick = () => {
    if (embedUrl) {
      setIsInteractive(!isInteractive);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative group w-full', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Device Frame */}
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Frame Chrome */}
        <motion.div
          className="relative"
          animate={{
            rotateX: isHovered && !isInteractive ? -8 : 0,
            rotateY: isHovered && !isInteractive ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Bar */}
          <div className="bg-gradient-to-b from-surface-900 to-surface-950 border-b border-surface-800 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="text-xs text-surface-500 font-mono flex-1 text-center truncate">
              {new URL(embedUrl || 'https://example.com').hostname}
            </div>
            <Monitor size={14} className="text-surface-500" />
          </div>

          {/* Content Area */}
          <div
            className={cn(
              'relative w-full overflow-hidden',
              'aspect-video bg-surface-950'
            )}
            onClick={handleContainerClick}
            style={{
              pointerEvents: isInteractive ? 'auto' : 'none',
            }}
          >
            {/* Iframe */}
            {embedUrl && (
              <motion.iframe
                ref={iframeRef}
                src={embedUrl}
                title={title}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                onLoad={handleIframeLoad}
                animate={{
                  opacity: isInteractive ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Fallback GIF or Image */}
            {!embedUrl && (fallbackGif || fallbackImage) && (
              <motion.div
                className="w-full h-full relative"
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={fallbackGif || fallbackImage!.src}
                  alt={fallbackImage?.alt || title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Loading Skeleton */}
            <AnimatePresence>
              {isLoading && embedUrl && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-surface-800 via-surface-700 to-surface-800 animate-pulse"
                />
              )}
            </AnimatePresence>

            {/* Interactive Overlay */}
            <AnimatePresence>
              {!isInteractive && embedUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer group/overlay transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="flex flex-col items-center gap-3"
                  >
                    <motion.div
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover/overlay:bg-white/20 transition-all"
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Play size={24} className="text-white fill-white" />
                    </motion.div>
                    <p className="text-white font-medium">Click to interact</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Badge */}
            <AnimatePresence>
              {isInteractive && embedUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-3 right-3 z-50 bg-brand-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Interactive Mode
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar */}
          <div className="bg-gradient-to-t from-surface-950 to-surface-900 border-t border-surface-800 px-4 py-2 flex items-center justify-center text-xs text-surface-600">
            <span className="w-40 h-1 bg-surface-800 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* View Full Site Button */}
      {embedUrl && (
        <motion.a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/50 hover:scale-105"
        >
          <span>View Full Site</span>
          <ExternalLink size={16} />
        </motion.a>
      )}

      {/* Info Tooltip */}
      <AnimatePresence>
        {isHovered && isInteractive && embedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute -bottom-16 left-0 right-0 text-center text-xs text-surface-400 whitespace-nowrap"
          >
            Press ESC to exit interactive mode
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectIframe;
