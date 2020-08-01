import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { brotliCompressSync } from 'zlib'
import gzipPlugin from 'rollup-plugin-gzip'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/AnalyticsEventHelper.esm.js',
  output: {
    file: 'dist/AnalyticsEventHelper.min.js',
    format: 'iife',
    name: 'AnalyticsEventHelper',
    sourcemap: true,
  },
  plugins: [
    del({
      targets: 'dist/*',
    }),
    babel(),
    terser(),
    gzipPlugin(),
    gzipPlugin({
      customCompression: (content) => brotliCompressSync(Buffer.from(content)),
      fileName: '.br',
    }),
  ],
}
