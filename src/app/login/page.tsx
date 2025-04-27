import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Log In to QikTix UK</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please enter your details.</p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
