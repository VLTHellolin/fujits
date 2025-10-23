import type { MDXComponents } from 'mdx/types';
import * as FilesComponents from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Fuji } from '@/components/fuji';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Fuji,
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    ...components,
  };
}
