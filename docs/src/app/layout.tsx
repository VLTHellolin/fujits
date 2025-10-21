import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextProvider } from 'fumadocs-core/framework/next';
import { RootProvider } from 'fumadocs-ui/provider/next';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Fuji.ts',
    default: 'Fuji.ts',
  },
  description: 'The fast, modern TypeScript utility collection that includes everything you love.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <NextProvider>
          <RootProvider>{children}</RootProvider>
        </NextProvider>
      </body>
    </html>
  );
}
