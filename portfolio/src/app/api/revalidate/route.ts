import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Validate secret
    const { secret, slug, type } = await request.json();

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Validate inputs
    if (!slug || !type) {
      return NextResponse.json(
        { error: 'Missing slug or type' },
        { status: 400 }
      );
    }

    // Revalidate the appropriate path based on type
    let path = '';

    switch (type) {
      case 'project':
        path = `/projects/${slug}`;
        revalidatePath('/projects'); // Also revalidate projects listing
        break;
      case 'post':
        path = `/blog/${slug}`;
        revalidatePath('/blog'); // Also revalidate blog listing
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type. Must be "project" or "post"' },
          { status: 400 }
        );
    }

    revalidatePath(path);

    return NextResponse.json(
      {
        success: true,
        message: `Revalidated ${path}`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add GET handler for health check
export async function GET() {
  return NextResponse.json(
    { message: 'Revalidation endpoint is running' },
    { status: 200 }
  );
}
