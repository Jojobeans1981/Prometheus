import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
      <AuthForm mode="login" />
    </div>
  );
}