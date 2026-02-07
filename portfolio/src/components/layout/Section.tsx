'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Container from '@/components/layout/Container';
import GradientText from '@/components/ui/GradientText';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  heading?: string;
  subheading?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'dots' | 'gradient';
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

const paddingMap = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32',
};

const backgroundPatterns = {
  none: '',
  dots: "bg-[radial-gradient(circle,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:50px_50px]",
  gradient: 'bg-gradient-to-b from-surface-900/50 to-surface-950',
};

const Section = ({
  children,
  className,
  id,
  heading,
  subheading,
  padding = 'lg',
  background = 'none',
  container = true,
  containerSize = 'xl',
  animate = true,
}: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial={animate ? { opacity: 0 } : undefined}
      whileInView={animate ? { opacity: 1 } : undefined}
      viewport={animate ? { once: true, margin: '-100px' } : undefined}
      transition={animate ? { duration: 0.6 } : undefined}
      className={cn(paddingMap[padding], backgroundPatterns[background], className)}
    >
      {(heading || subheading) && (
        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={animate ? { once: true } : undefined}
          transition={animate ? { delay: 0.1, duration: 0.5 } : undefined}
          className="text-center mb-12 md:mb-16"
        >
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-100 mb-4">
              {heading.includes('|') ? (
                <>
                  {heading.split('|')[0]}
                  <GradientText>{heading.split('|')[1]}</GradientText>
                </>
              ) : (
                heading
              )}
            </h2>
          )}
          {subheading && (
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </motion.div>
      )}

      {container ? (
        <Container size={containerSize}>
          {children}
        </Container>
      ) : (
        children
      )}
    </motion.section>
  );
};

export default Section;
