class AssetLoader {

  static loaded = {};

  constructor (resources) {
    this.loading = this.load(resources);
  }

  load (resources) {
    return Promise.all(
      _.map(resources, (asset, name) => this.makeImage($.Deferred(), asset, name))
    );
  }

  makeImage (promise, asset, name) {
    const image = new Image();
    image.src = asset;

    image.onload = () => {
      image.width /= 2;
      image.height /= 2;
      AssetLoader.loaded[name] = image;
      promise.resolve();
    };

    return promise.promise();
  }
}

export { AssetLoader }