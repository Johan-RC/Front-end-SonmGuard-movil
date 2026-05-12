import { AuthUser, LoginForm, RegisterForm } from '@/features/auth/types/auth.types';

type MockUser = AuthUser & { password: string };

const MOCK_USERS: MockUser[] = [
  { id: '1', name: 'Admin SomnGuard', email: 'admin@somnguard.com', password: '1234' },
  { id: '2', name: 'Usuario de prueba', email: 'prueba@test.com', password: 'abcd' },
];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toAuthUser(user: MockUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email };
}

export const authService = {
  async login(credentials: LoginForm): Promise<AuthUser> {
    const email = normalizeEmail(credentials.email);
    const user = MOCK_USERS.find((item) => item.email === email && item.password === credentials.password);
    if (!user) throw new Error('Correo o contrasena incorrectos.');
    return toAuthUser(user);
  },

  async register(form: RegisterForm): Promise<AuthUser> {
    const email = normalizeEmail(form.email);
    const existingUser = MOCK_USERS.find((item) => item.email === email);
    if (existingUser) throw new Error('Este correo ya esta registrado.');

    const user: MockUser = {
      id: String(Date.now()),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      email,
      password: form.password,
    };
    MOCK_USERS.push(user);
    return toAuthUser(user);
  },

  async requestPasswordReset(email: string): Promise<AuthUser> {
    const normalizedEmail = normalizeEmail(email);
    const user = MOCK_USERS.find((item) => item.email === normalizedEmail);
    if (!user) throw new Error('Ese correo no esta registrado en SomnGuard.');
    return toAuthUser(user);
  },

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email);
    const user = MOCK_USERS.find((item) => item.email === normalizedEmail);
    if (!user) throw new Error('No se pudo actualizar la contrasena. Solicita el codigo de nuevo.');
    user.password = newPassword;
  },

  isRegisteredEmail(email: string): boolean {
    const normalizedEmail = normalizeEmail(email);
    return MOCK_USERS.some((item) => item.email === normalizedEmail);
  },

  async logout(): Promise<void> {
    // In a real app, this would clear stored tokens, user data, etc.
    // For this mock implementation, we just simulate the logout process
    console.log('User logged out successfully');
  },
};