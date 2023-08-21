import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  console.log('running ---', pathname);
  if (pathname === '/' || pathname === '/dashboard') {
    const url = req.nextUrl.clone();
    const cookie = req.cookies.get('user')?.value;

    //    ==== already authenticated, redirect from /auth
    if (pathname === '/' && cookie) {
      console.log('Redirect to dashboard');
      url.pathname = `/dashboard`;

      return NextResponse.redirect(url);
    }

    // ==== not authenticated, redirect to /
    if (!cookie && pathname.startsWith('/dashboard')) {
      console.log('Redirect to auth page');
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }

    console.log('nothing has happed');
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard', '/'],
};
