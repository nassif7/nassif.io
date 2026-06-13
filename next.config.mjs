import { withPayload } from '@payloadcms/next/withPayload'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
const require = createRequire(import.meta.url)
const webpack = require('webpack')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://eu-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/array/:path*', destination: 'https://eu-assets.i.posthog.com/array/:path*' },
      { source: '/ingest/:path*', destination: 'https://eu.i.posthog.com/:path*' },
    ]
  },
  skipTrailingSlashRedirect: true,
  serverExternalPackages: ['pino', 'pino-pretty', 'pino-abstract-transport'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'payload/internal': path.resolve(__dirname, 'src/stubs/payload-internal.js'),
      }
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^pino-abstract-transport$/ }),
        new webpack.IgnorePlugin({ resourceRegExp: /^pino-pretty$/ }),
        new webpack.IgnorePlugin({ resourceRegExp: /^thread-stream$/ }),
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '')
        })
      )
      config.resolve.fallback = {
        ...config.resolve.fallback,
        assert: false,
        async_hooks: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
        worker_threads: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
        util: false,
        events: false,
        process: false,
        querystring: false,
      }
    }
    return config
  },
}

export default withPayload(nextConfig)
