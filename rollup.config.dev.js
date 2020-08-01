import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/AnalyticsEventHelper.esm.js',
  output: {
    file: 'dist/AnalyticsEventHelper.min.js',
    format: 'iife',
    name: 'AnalyticsEventHelper',
    sourcemap: true,
  },
  plugins: [
    babel(),
    serve({
      contentBase: ['dist', 'example'],
    }),
    livereload({
      watch: 'dist',
    }),
  ],
}
