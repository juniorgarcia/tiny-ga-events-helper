import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

const plugins = [
  babel({
    babelHelpers: 'bundled',
  }),
  terser(),
]

process.env.build === 'all' && plugins.push(del({ targets: 'dist/*' }))

export default {
  input: 'src/tiny-ga-events-helper.js',
  output: [
    {
      file: 'dist/tiny-ga-events-helper.esm.prod.js',
      format: 'es',
    },
    {
      file: 'dist/tiny-ga-events-helper.umd.prod.js',
      format: 'umd',
      name: 'TinyGaEventsHelper',
    },
  ],
  plugins,
}
