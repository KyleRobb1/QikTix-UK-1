import Header from '@/components/Header';
import SignupForm from '../../src/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <SignupForm />
      </div>
    </>
  );
}
