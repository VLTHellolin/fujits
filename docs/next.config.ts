import { createMDX } from 'fumadocs-mdx/next';

const isProduction = process.env.NODE_ENV === 'production';

const withMDX = createMDX({
  configPath: './source.config.ts',
});

export default withMDX({
  compress: isProduction,
  reactStrictMode: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  productionBrowserSourceMaps: false,
  experimental: {
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
    serverMinification: true,
    serverSourceMaps: false,
  },
  htmlLimitedBots: /.*/,
});
