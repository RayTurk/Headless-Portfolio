import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Ray Turk — Cleveland WordPress & Full Stack Developer';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f0d0b',
          padding: '0',
          position: 'relative',
        }}
      >
        {/* Orange top bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: '#f97316', display: 'flex' }} />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 80px 56px',
            flex: 1,
          }}
        >
          {/* Top: eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
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
              CLEVELAND, OHIO
            </span>
          </div>

          {/* Main text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                fontSize: '88px',
                fontWeight: 900,
                color: '#fdf6ee',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              RAY TURK
            </div>
            <div
              style={{
                fontSize: '32px',
                fontWeight: 400,
                color: '#e8dfd4',
                lineHeight: 1.3,
              }}
            >
              WordPress & Full Stack Developer
            </div>
          </div>

          {/* Bottom: tags + domain */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['WordPress', 'Next.js', 'Web Maintenance'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #334e68',
                    borderRadius: '4px',
                    color: '#e8dfd4',
                    fontSize: '16px',
                    letterSpacing: '0.05em',
                    display: 'flex',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div
              style={{
                color: '#f97316',
                fontSize: '22px',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              rturk.me
            </div>
          </div>
        </div>

        {/* Right accent bar */}
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
