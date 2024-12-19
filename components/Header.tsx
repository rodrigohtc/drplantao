'use client';

import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Dr Plantão
        </a>
        <nav>
          <button
            onClick={handleLogout}
            className="hover:text-primary-light cursor-pointer"
          >
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
