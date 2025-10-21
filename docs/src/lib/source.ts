import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { docs } from '@/../.source';

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  icon: name => {
    if (name && name in icons) {
      return createElement(icons[name as keyof typeof icons]);
    }
    return null;
  },
});
