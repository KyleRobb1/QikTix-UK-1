import LoginForm from '../../src/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </>
  );
}
