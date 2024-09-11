'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || null)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>{email}</div>
        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          Déconnexion
        </button>
      </div>
    </header>
  )
}
