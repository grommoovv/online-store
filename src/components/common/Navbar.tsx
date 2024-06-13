import Link from 'next/link'
import { FC } from 'react'

const navLinks = [
  { id: 1, text: 'Home', href: '/' },
  { id: 2, text: 'Catalog', href: '/catalog' },
  { id: 3, text: 'Cart', href: '/cart' },
]

const Navbar: FC = () => {
  return (
    <>
      <nav className='flex gap-5 items-center'>
        {navLinks.map((l) => (
          <Link href={l.href} key={l.id}>
            <span>{l.text}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}

export { Navbar }
