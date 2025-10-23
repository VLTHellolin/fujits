import type { MDXComponents } from 'mdx/types';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Fuji } from '@/components/fuji';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Fuji,
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
  };
}
