import devConfig from './rollup.config.dev'
import prodConfig from './rollup.config.prod'

export default (cliArgs) => {
  if (process.env.build === 'all') return [prodConfig, devConfig]
  if (process.env.build === 'prod') return prodConfig
  return devConfig
}
