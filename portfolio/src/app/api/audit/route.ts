import { NextRequest, NextResponse } from 'next/server';

export interface AuditCheck {
  id: string;
  category: 'seo' | 'technical' | 'social' | 'accessibility';
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  detail: string;
  points: number;
  maxPoints: number;
}

export interface AuditResult {
  url: string;
  score: number;
  checks: AuditCheck[];
  fetchError?: string;
}

function extract(html: string, pattern: RegExp): string | null {
  const m = pattern.exec(html);
  return m ? m[1]?.replace(/\s+/g, ' ').trim() : null;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export async function POST(req: NextRequest) {
  const { url: rawUrl, name, email } = await req.json();

  if (!rawUrl || !name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Normalize URL
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const checks: AuditCheck[] = [];
  let html = '';
  let fetchError: string | undefined;
  let responseTimeMs = 0;
  let finalUrl = url;

  // ── HTTPS check (before any fetch) ──────────────────────────────────────
  const isHttps = url.startsWith('https://');
  checks.push({
    id: 'https',
    category: 'technical',
    name: 'HTTPS / SSL',
    status: isHttps ? 'pass' : 'fail',
    message: isHttps ? 'Site is served over HTTPS' : 'Site is not using HTTPS',
    detail: isHttps
      ? 'Your site uses a secure connection. Good for SEO and user trust.'
      : 'Switch to HTTPS. Most browsers warn visitors about non-HTTPS sites and Google uses it as a ranking signal.',
    points: isHttps ? 15 : 0,
    maxPoints: 15,
  });

  // ── Fetch page ───────────────────────────────────────────────────────────
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const t0 = Date.now();

    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'RayTurkAudit/1.0 (free-site-audit)',
        'Accept': 'text/html',
      },
    });

    clearTimeout(timeout);
    responseTimeMs = Date.now() - t0;
    finalUrl = res.url || url;
    html = await res.text();

    // Response time check
    checks.push({
      id: 'response_time',
      category: 'technical',
      name: 'Server Response Time',
      status: responseTimeMs < 1500 ? 'pass' : responseTimeMs < 3000 ? 'warning' : 'fail',
      message: `Server responded in ${responseTimeMs}ms`,
      detail:
        responseTimeMs < 1500
          ? 'Fast server response — great for SEO and user experience.'
          : responseTimeMs < 3000
          ? 'Response time is acceptable but could be faster. Consider a CDN or better hosting.'
          : 'Slow server response. Google recommends under 200ms TTFB. Consider upgrading hosting or enabling caching.',
      points: responseTimeMs < 1500 ? 5 : responseTimeMs < 3000 ? 3 : 0,
      maxPoints: 5,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error && err.name === 'AbortError'
      ? 'Request timed out after 12 seconds'
      : 'Could not reach the site — it may be down or blocking automated requests';
    fetchError = msg;

    checks.push({
      id: 'reachable',
      category: 'technical',
      name: 'Site Reachable',
      status: 'fail',
      message: 'Could not fetch the site',
      detail: msg,
      points: 0,
      maxPoints: 5,
    });
  }

  // ── HTML-based checks (only if we got HTML) ──────────────────────────────
  if (html) {

    // Title
    const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const titleDecoded = title ? decodeEntities(title) : null;
    const titleLen = titleDecoded?.length ?? 0;
    checks.push({
      id: 'title',
      category: 'seo',
      name: 'Page Title',
      status: !titleDecoded ? 'fail' : titleLen >= 30 && titleLen <= 65 ? 'pass' : 'warning',
      message: !titleDecoded
        ? 'No title tag found'
        : `Title is ${titleLen} characters: "${titleDecoded.substring(0, 60)}${titleLen > 60 ? '…' : ''}"`,
      detail: !titleDecoded
        ? 'Add a <title> tag. It appears in search results and browser tabs — it\'s one of the most important SEO elements.'
        : titleLen < 30
        ? 'Title is too short. Aim for 50–65 characters to make full use of search result space.'
        : titleLen > 65
        ? 'Title may be truncated in search results. Keep it under 65 characters.'
        : 'Title length is in the ideal range for search results.',
      points: !titleDecoded ? 0 : titleLen >= 30 && titleLen <= 65 ? 10 : 5,
      maxPoints: 10,
    });

    // Meta description
    const metaDesc = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
      || extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const descDecoded = metaDesc ? decodeEntities(metaDesc) : null;
    const descLen = descDecoded?.length ?? 0;
    checks.push({
      id: 'meta_description',
      category: 'seo',
      name: 'Meta Description',
      status: !descDecoded ? 'fail' : descLen >= 100 && descLen <= 165 ? 'pass' : 'warning',
      message: !descDecoded
        ? 'No meta description found'
        : `Description is ${descLen} characters`,
      detail: !descDecoded
        ? 'Add a meta description. It often appears as the snippet under your title in search results.'
        : descLen < 100
        ? 'Description is short. Aim for 120–160 characters for a compelling search snippet.'
        : descLen > 165
        ? 'Description may be truncated in search results. Keep it under 165 characters.'
        : 'Meta description length is ideal.',
      points: !descDecoded ? 0 : descLen >= 100 && descLen <= 165 ? 10 : 5,
      maxPoints: 10,
    });

    // H1 tag
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    const h1Count = h1Matches.length;
    const h1Text = h1Count > 0
      ? decodeEntities(h1Matches[0]!.replace(/<[^>]+>/g, '').trim()).substring(0, 60)
      : null;
    checks.push({
      id: 'h1',
      category: 'seo',
      name: 'H1 Heading',
      status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
      message: h1Count === 0
        ? 'No H1 tag found'
        : h1Count === 1
        ? `H1 found: "${h1Text}"`
        : `${h1Count} H1 tags found (should be exactly 1)`,
      detail: h1Count === 0
        ? 'Add one H1 tag per page. It tells search engines what your page is about.'
        : h1Count === 1
        ? 'One H1 tag found — exactly right.'
        : 'Multiple H1 tags can dilute your SEO signal. Stick to one per page.',
      points: h1Count === 1 ? 8 : h1Count === 0 ? 0 : 4,
      maxPoints: 8,
    });

    // Viewport meta
    const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
    checks.push({
      id: 'viewport',
      category: 'accessibility',
      name: 'Mobile Viewport',
      status: viewport ? 'pass' : 'fail',
      message: viewport ? 'Viewport meta tag is present' : 'No viewport meta tag found',
      detail: viewport
        ? 'Good — your site is set up to display correctly on mobile devices.'
        : 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> for proper mobile rendering. Google uses mobile-first indexing.',
      points: viewport ? 8 : 0,
      maxPoints: 8,
    });

    // Images without alt attributes
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const imgTotal = imgTags.length;
    const imgMissingAlt = imgTags.filter(
      (t) => !/alt=["'][^"']+["']/.test(t)
    ).length;
    if (imgTotal > 0) {
      checks.push({
        id: 'img_alt',
        category: 'accessibility',
        name: 'Image Alt Attributes',
        status: imgMissingAlt === 0 ? 'pass' : imgMissingAlt <= 2 ? 'warning' : 'fail',
        message: imgMissingAlt === 0
          ? `All ${imgTotal} images have alt attributes`
          : `${imgMissingAlt} of ${imgTotal} images are missing alt attributes`,
        detail: imgMissingAlt === 0
          ? 'All images have descriptive alt text — great for accessibility and image SEO.'
          : 'Add descriptive alt text to all images. This helps visually impaired users and lets search engines understand your images.',
        points: imgMissingAlt === 0 ? 8 : imgMissingAlt <= 2 ? 4 : 0,
        maxPoints: 8,
      });
    }

    // Canonical URL
    const canonical = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i.test(html)
      || /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i.test(html);
    checks.push({
      id: 'canonical',
      category: 'seo',
      name: 'Canonical URL',
      status: canonical ? 'pass' : 'warning',
      message: canonical ? 'Canonical URL is set' : 'No canonical URL found',
      detail: canonical
        ? 'Canonical tag helps prevent duplicate content issues.'
        : 'Consider adding a canonical URL (<link rel="canonical">) to prevent duplicate content penalties.',
      points: canonical ? 5 : 2,
      maxPoints: 5,
    });

    // JSON-LD / Structured data
    const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
    checks.push({
      id: 'structured_data',
      category: 'seo',
      name: 'Structured Data (JSON-LD)',
      status: hasJsonLd ? 'pass' : 'warning',
      message: hasJsonLd ? 'Structured data (JSON-LD) found' : 'No structured data found',
      detail: hasJsonLd
        ? 'Structured data helps Google display rich results (ratings, FAQs, events) in search.'
        : 'Adding JSON-LD structured data can earn rich snippets in Google Search.',
      points: hasJsonLd ? 5 : 0,
      maxPoints: 5,
    });

    // OG Title
    const ogTitle = extract(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)
      || extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
    checks.push({
      id: 'og_title',
      category: 'social',
      name: 'Open Graph Title',
      status: ogTitle ? 'pass' : 'warning',
      message: ogTitle ? `OG title: "${ogTitle.substring(0, 50)}"` : 'No og:title found',
      detail: ogTitle
        ? 'Open Graph title is set — your page will look good when shared on social media.'
        : 'Add <meta property="og:title"> to control how your page appears when shared on Facebook, LinkedIn, etc.',
      points: ogTitle ? 4 : 0,
      maxPoints: 4,
    });

    // OG Description
    const ogDesc = extract(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)
      || extract(html, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["']/i);
    checks.push({
      id: 'og_description',
      category: 'social',
      name: 'Open Graph Description',
      status: ogDesc ? 'pass' : 'warning',
      message: ogDesc ? 'OG description is set' : 'No og:description found',
      detail: ogDesc
        ? 'Social sharing description is configured.'
        : 'Add <meta property="og:description"> for a better social media preview.',
      points: ogDesc ? 3 : 0,
      maxPoints: 3,
    });

    // OG Image
    const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html)
      || /<meta[^>]+property=["']og:image[^"']*["']/i.test(html);
    checks.push({
      id: 'og_image',
      category: 'social',
      name: 'Open Graph Image',
      status: ogImage ? 'pass' : 'warning',
      message: ogImage ? 'OG image is set' : 'No og:image found',
      detail: ogImage
        ? 'Your page has a social sharing image. Links shared on social media will show a preview image.'
        : 'Add <meta property="og:image"> with a 1200×630px image for eye-catching social shares.',
      points: ogImage ? 4 : 0,
      maxPoints: 4,
    });

    // Favicon
    const hasFavicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(html);
    checks.push({
      id: 'favicon',
      category: 'technical',
      name: 'Favicon',
      status: hasFavicon ? 'pass' : 'warning',
      message: hasFavicon ? 'Favicon is set' : 'No favicon found in HTML',
      detail: hasFavicon
        ? 'Favicon is configured — your site displays a recognizable icon in browser tabs.'
        : 'Add a favicon (<link rel="icon">) so your site has a recognizable icon in browser tabs and bookmarks.',
      points: hasFavicon ? 3 : 0,
      maxPoints: 3,
    });
  }

  // ── Calculate score ──────────────────────────────────────────────────────
  const totalEarned = checks.reduce((sum, c) => sum + c.points, 0);
  const totalPossible = checks.reduce((sum, c) => sum + c.maxPoints, 0);
  const score = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  const result: AuditResult = {
    url: finalUrl,
    score,
    checks,
    fetchError,
  };

  return NextResponse.json(result);
}
