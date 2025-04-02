module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  configureWebpack: {
    // Ignora avisos específicos
    stats: {
      warningsFilter: [/fsevents/]
    }
  }
}