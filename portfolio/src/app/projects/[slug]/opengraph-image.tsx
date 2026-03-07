import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/api';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  const title = project?.title ?? 'Project';
  const projectType = project?.projectTypes?.nodes?.[0]?.name ?? 'Web Development';
  const techs = project?.techStacks?.nodes?.slice(0, 4).map((t) => t.name) ?? [];
  const clientName = project?.projectDetails?.clientName ?? null;

  const displayTitle = title.length > 55 ? title.slice(0, 52) + '…' : title;

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
              {projectType}
            </span>
            {clientName && (
              <>
                <span style={{ color: '#334e68', fontSize: '18px', display: 'flex' }}>·</span>
                <span style={{ color: '#6b7c93', fontSize: '18px', display: 'flex' }}>{clientName}</span>
              </>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: displayTitle.length > 35 ? '56px' : '72px',
              fontWeight: 800,
              color: '#fdf6ee',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              maxWidth: '920px',
            }}
          >
            {displayTitle}
          </div>

          {/* Bottom */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {/* Tech tags */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {techs.map((tech) => (
                <div
                  key={tech}
                  style={{
                    padding: '6px 14px',
                    border: '1px solid #334e68',
                    borderRadius: '4px',
                    color: '#6b7c93',
                    fontSize: '15px',
                    letterSpacing: '0.08em',
                    display: 'flex',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Byline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f0d0b',
                  fontWeight: 800,
                  fontSize: '15px',
                }}
              >
                RT
              </div>
              <span style={{ color: '#e8dfd4', fontSize: '17px' }}>Ray Turk</span>
              <span style={{ color: '#334e68', fontSize: '17px', display: 'flex' }}>·</span>
              <span style={{ color: '#f97316', fontSize: '17px', fontWeight: 600, display: 'flex' }}>rturk.me</span>
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
