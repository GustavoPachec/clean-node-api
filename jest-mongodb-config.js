module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbaname: 'jest'
    },
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false
  }
}
