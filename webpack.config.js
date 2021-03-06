const { commonConfig, isProduction } = require('./webpack.default')

const webpackElectron = {
  ...commonConfig,
  target: 'electron-main',
  entry: {
    main: './main/index.ts',
  },
}

const webpackReact = {
  ...commonConfig,
  target: 'electron-renderer',
  entry: {
    renderer: './renderer/index.tsx',
  },
}

console.log('isProduction = ' + isProduction)

module.exports = env => {
  const targets = []

  if (isProduction) {
    return [webpackElectron, webpackReact]
  }

  if (env.render) {
    targets.push(webpackReact)
  }

  if (env.main) {
    targets.push(webpackElectron)
  }

  return targets
}
