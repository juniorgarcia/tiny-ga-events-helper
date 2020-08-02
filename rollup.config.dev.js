import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const plugins = [
  babel({
    babelHelpers: 'bundled',
  }),
]

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
  input: 'src/tiny-ga-events-helper.js',
  output: [
    {
      file: 'dist/tiny-ga-events-helper.esm.dev.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/tiny-ga-events-helper.umd.dev.js',
      format: 'umd',
      name: 'AnalyticsEventsHelper',
      sourcemap: true,
    },
  ],
  plugins,
}
