import type { RollupOptions } from 'rollup';
import { mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fdir } from 'fdir';
import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import { swc } from 'rollup-plugin-swc3';

const getInputEntries = () => {
  const crawler = new fdir()
    .withRelativePaths()
    .glob(
      './**/*.?([cm])[jt]s?(x)',
      '!**/*.test.*',
      '!**/*.d.ts',
    );

  return Object.fromEntries(
    crawler.crawl('./src').sync().map(file => [
      file.slice(0, file.lastIndexOf('.')),
      join('./src', file),
    ]),
  );
};

export default defineConfig(() => {
  rmSync('./dist', { recursive: true, force: true });
  mkdirSync('./dist', { recursive: true });

  const input = getInputEntries();

  return [
    {
      input,
      output: {
        format: 'esm',
        dir: './dist',
        entryFileNames: '[name].js',
        compact: true,
        hoistTransitiveImports: false,
        generatedCode: {
          constBindings: true,
        },
      },
      plugins: [
        swc({
          isModule: true,
          minify: true,
          jsc: {
            target: 'es2020',
            parser: {
              syntax: 'typescript',
              decorators: true,
            },
            loose: false,
            externalHelpers: false,
            minify: {
              module: true,
              compress: {
                passes: 2,
                const_to_let: false,
              },
              mangle: true,
            },
          },
          module: {
            type: 'es6',
            strict: false,
            strictMode: true,
            lazy: false,
          },
        }),
      ],
    },
    {
      input,
      output: {
        format: 'esm',
        dir: './dist',
        entryFileNames: '[name].d.ts',
      },
      plugins: [dts()],
    },
  ] as RollupOptions[];
});
