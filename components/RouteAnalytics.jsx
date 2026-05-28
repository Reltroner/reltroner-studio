'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { pageview } from '@/lib/gtag'

export default function RouteAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    pageview(pathname)
  }, [pathname])

  return null
}
