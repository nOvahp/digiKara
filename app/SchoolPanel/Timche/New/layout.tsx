'use client';

import { NewTimcheProvider } from './NewTimcheContext';

export default function NewTimcheLayout({ children }: { children: React.ReactNode }) {
  return <NewTimcheProvider>{children}</NewTimcheProvider>;
}
