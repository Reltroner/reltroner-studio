'use client'
import { useEffect, useState } from 'react';

export default function HydrationSafe({ children }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated ? <>{children}</> : null;
}