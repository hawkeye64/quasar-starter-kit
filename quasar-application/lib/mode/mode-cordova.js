const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-cordova'),
  warn = logger('app:mode-cordova', 'red'),
  spawn = require('../helpers/spawn')

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.cordovaDir)
  }

  add () {
    if (this.isInstalled) {
      warn(`Cordova support detected already. Aborting.`)
      return
    }

    const
      pkg = require(appPaths.resolve.app('package.json')),
      appName = pkg.productName || pkg.name || 'Quasar App'

    log('Creating Cordova source folder...')

    spawn.sync(
      'cordova',
      ['create', 'src-cordova', pkg.cordovaId || 'org.quasar.cordova.app', appName],
      appPaths.appDir,
      () => {
        warn(`There was an error trying to install Cordova support`)
        process.exit(1)
      }
    )

    log(`Cordova support was installed`)
    log(`App name was taken from package.json: "${appName}"`)
    log()
    warn(`If you want a different App name then remove Cordova support, edit productName field from package.json then add Cordova support again.`)
    log(`Please manually add Cordova platforms using Cordova CLI from the newly created "src-cordova" folder.`)
    log()
  }

  remove () {
    if (!this.isInstalled) {
      warn(`No Cordova support detected. Aborting.`)
      return
    }

    fse.removeSync(appPaths.cordovaDir)
    log(`Cordova support was removed`)
  }
}

module.exports = Mode
