import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { callbackUrl, gatewayUrl, token } = body;

  console.log('\n========== [PAYMENT DEBUG] ==========');
  console.log('Callback URL :', callbackUrl);
  console.log('Token present:', !!token);
  if (token) {
    console.log('Token preview:', String(token).slice(0, 40) + '...');
    console.log('Gateway URL  :', gatewayUrl);
  } else {
    console.log('⚠️  TOKEN IS MISSING — redirect blocked, showing error to user');
  }
  console.log('=====================================\n');

  return NextResponse.json({ ok: true });
}
