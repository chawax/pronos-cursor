'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

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
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-foreground">{email}</div>
        <Button onClick={handleSignOut} variant="destructive">
          Déconnexion
        </Button>
      </div>
    </header>
  )
}
