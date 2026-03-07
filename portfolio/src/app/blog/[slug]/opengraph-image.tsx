import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/api';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  const title = post?.title ?? 'Blog';
  const category = post?.categories?.nodes?.[0]?.name ?? 'Web Development';
  const readingTime = post?.blogFields?.readingTimeOverride
    ? `${post.blogFields.readingTimeOverride} min read`
    : null;

  // Truncate long titles
  const displayTitle = title.length > 60 ? title.slice(0, 57) + '…' : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0d0b',
          position: 'relative',
        }}
      >
        {/* Orange top bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: '#f97316', display: 'flex' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px 56px',
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '2px', backgroundColor: '#f97316', display: 'flex' }} />
            <span
              style={{
                color: '#f97316',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </span>
            {readingTime && (
              <>
                <span style={{ color: '#334e68', fontSize: '18px', display: 'flex' }}>·</span>
                <span style={{ color: '#6b7c93', fontSize: '18px', display: 'flex' }}>{readingTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 40 ? '52px' : '64px',
              fontWeight: 800,
              color: '#fdf6ee',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              maxWidth: '900px',
            }}
          >
            {displayTitle}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f0d0b',
                  fontWeight: 800,
                  fontSize: '18px',
                }}
              >
                RT
              </div>
              <span style={{ color: '#e8dfd4', fontSize: '18px' }}>Ray Turk</span>
              <span style={{ color: '#334e68', fontSize: '18px', display: 'flex' }}>·</span>
              <span style={{ color: '#6b7c93', fontSize: '18px', display: 'flex' }}>rturk.me/blog</span>
            </div>
            <div
              style={{
                padding: '8px 20px',
                backgroundColor: '#1a1714',
                border: '1px solid #2a2420',
                borderRadius: '4px',
                color: '#e8dfd4',
                fontSize: '16px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              Article
            </div>
          </div>
        </div>

        {/* Right accent */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: '#334e68',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
