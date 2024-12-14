import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Dr Plantão
        </Link>
        <nav>
          <Link href="/logout" className="hover:text-primary-light">
            Sair
          </Link>
        </nav>
      </div>
    </header>
  )
}

