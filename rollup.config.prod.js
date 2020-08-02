import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

const plugins = [babel(), terser()]

process.env.build === 'all' && plugins.push(del({ targets: 'dist/*' }))

export default {
  input: 'src/analytics-events-helper.js',
  output: [
    {
      file: 'dist/analytics-events-helper.esm.prod.js',
      format: 'es',
    },
    {
      file: 'dist/analytics-events-helper.umd.prod.js',
      format: 'umd',
      name: 'AnalyticsEventsHelper',
    },
  ],
  plugins,
}
