import MainLayout from '../../components/layout/MainLayout';
import SignupForm from '../../components/auth/SignupForm';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-gray-600 mt-2">Join QikTix UK and discover amazing events</p>
          </div>
          
          <SignupForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
