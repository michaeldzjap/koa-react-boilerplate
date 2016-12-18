class AssetConfig {
  
  constructor({developmentAssets, productionAssets, sharedAssets}: Object, mode = 'development': String) {
    this.developmentAssets = developmentAssets
    this.productionAssets = productionAssets
    this.sharedAssets = sharedAssets
    this.mode = mode
  }

  get assets() {
    switch (this.mode) {
      case 'development':
        return Object.assign({}, this.developmentAssets, this.sharedAssets)
      case 'production':
        return Object.assign({}, this.productionAssets, this.sharedAssets)
    }
  }

}

export default AssetConfig
