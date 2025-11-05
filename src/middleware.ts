import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('redime-auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas públicas
  const publicPaths = ['/', '/live', '/messages', '/events', '/about', '/ministries', '/prayer-room', '/blog', '/podcast', '/courses'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path)) && !pathname.startsWith('/admin');

  // Se é rota pública, permite acesso
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Rotas de autenticação
  if (pathname.startsWith('/auth/login')) {
    // Se já está autenticado, redireciona para dashboard
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
    return NextResponse.next();
  }

  // Rotas protegidas do admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verifica permissões específicas
    if (pathname.startsWith('/admin/departments') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    if (pathname.startsWith('/admin/members')) {
      if (!['ADMIN', 'LEADER'].includes(payload.role)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|Imagens).*)',
  ],
};
