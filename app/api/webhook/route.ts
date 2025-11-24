import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Log the webhook event for debugging
    console.log('Farcaster webhook event:', JSON.stringify(body, null, 2));

    // Handle different webhook event types
    const { type } = body;

    switch (type) {
      case 'frame_added':
        console.log('Frame was added by user:', body.data?.fid);
        break;
      case 'frame_removed':
        console.log('Frame was removed by user:', body.data?.fid);
        break;
      case 'notifications_enabled':
        console.log('Notifications enabled by user:', body.data?.fid);
        break;
      case 'notifications_disabled':
        console.log('Notifications disabled by user:', body.data?.fid);
        break;
      default:
        console.log('Unknown webhook event type:', type);
    }

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
