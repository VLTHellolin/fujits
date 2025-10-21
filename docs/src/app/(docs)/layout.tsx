import type React from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { nav, ...base } = baseOptions();

  return (
    <DocsLayout tree={source.pageTree} tabMode='navbar' nav={{ ...nav, mode: 'top' }} {...base}>
      {children}
    </DocsLayout>
  );
}
