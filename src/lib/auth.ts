import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || '@plpsc2025Redime#');
const TOKEN_NAME = 'redime-auth-token';

export interface JWTPayload {
  userId: string;
  email?: string;
  role: string;
  name: string;
}

// Criar token JWT
export async function createToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expira em 7 dias
    .sign(secret);
}

// Verificar token JWT
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Get current user from cookie
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

// Login function
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      memberProfile: {
        include: {
          department: true,
        },
      },
    },
  });

  if (!user || !user.password) {
    throw new Error('Credenciais inválidas');
  }

  if (!user.active) {
    throw new Error('Usuário inativo');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Credenciais inválidas');
  }

  const payload: JWTPayload = {
    userId: user.id.toString(), // Converte BigInt para string
    email: user.email || undefined,
    role: user.role,
    name: user.name,
  };

  const token = await createToken(payload);

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      memberProfile: user.memberProfile,
    },
    token,
  };
}

// Logout function
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Verify permission levels
export function hasPermission(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export function isAdmin(userRole: string): boolean {
  return userRole === 'ADMIN';
}

export function isLeader(userRole: string): boolean {
  return userRole === 'LEADER' || userRole === 'ADMIN';
}

export function isMember(userRole: string): boolean {
  return ['MEMBER', 'LEADER', 'ADMIN'].includes(userRole);
}
