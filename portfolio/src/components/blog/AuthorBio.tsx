'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  name?: string;
  bio?: string;
  avatar?: string;
}

export function AuthorBio({ name, bio, avatar }: AuthorBioProps) {
  if (!name && !bio && !avatar) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl bg-surface-900 border border-surface-700 p-6"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        {avatar && (
          <div className="flex-shrink-0">
            <Image
              src={avatar}
              alt={name || 'Author'}
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {name && (
            <h3 className="text-lg font-bold text-cinder mb-2">
              About {name}
            </h3>
          )}
          {bio && (
            <p className="text-ash text-sm mb-4">
              {bio}
            </p>
          )}
          <Link
            href={`/blog?author=${name?.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors inline-flex items-center gap-2"
          >
            View more posts by {name}
            <span>→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
