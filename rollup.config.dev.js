import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const plugins = [babel()]

process.env.serve &&
  plugins.push(
    livereload({
      watch: 'dist',
    }),
    serve({
      contentBase: ['dist', 'example'],
    })
  )

export default {
  input: 'src/analytics-events-helper.js',
  output: [
    {
      file: 'dist/analytics-events-helper.esm.dev.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/analytics-events-helper.umd.dev.js',
      format: 'umd',
      name: 'AnalyticsEventsHelper',
      sourcemap: true,
    },
  ],
  plugins,
}
