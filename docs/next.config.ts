import { createMDX } from 'fumadocs-mdx/next';

const isProduction = process.env.NODE_ENV === 'production';

const withMDX = createMDX({
  configPath: './source.config.ts',
});

export default withMDX({
  compress: isProduction,
  reactStrictMode: true,
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
    reactCompiler: true,
    serverMinification: true,
    serverSourceMaps: false,
  },
  htmlLimitedBots: /.*/,
});
