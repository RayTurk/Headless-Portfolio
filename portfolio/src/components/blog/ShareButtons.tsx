'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-11.35a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0323 3z" />
        </svg>
      ),
      onClick: shareTwitter,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      onClick: shareLinkedIn,
    },
    {
      name: 'Copy',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16H5v-4m0-5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h3m0-2h8"
          />
        </svg>
      ),
      onClick: handleCopyLink,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {shareButtons.map((button) => (
        <motion.button
          key={button.name}
          onClick={button.onClick}
          className="p-3 rounded-lg bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-ash transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={button.name}
        >
          {button.icon}
          {copied && button.name === 'Copy' && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-10 bg-surface-900 text-brand-400 px-3 py-1 rounded text-sm font-semibold whitespace-nowrap"
            >
              Copied!
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
