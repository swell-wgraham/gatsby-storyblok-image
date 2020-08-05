import { resolve } from 'path'
import { CACHE_DIR } from '../defaults'

export default function cacheImageInfo({ imageName, src, srcWebp, srcSets }) {
  if (typeof window === 'undefined') {
    // importing fs cause issues with gatsby-image
    const fs = require('fs-extra')

    const filePath = resolve(CACHE_DIR + '/' + imageName)
    fs.pathExists(filePath + '.json').then(exists => {
      if (!exists) {
        fs.writeJsonSync(filePath + '.json', {
          name: imageName,
          src,
          srcSet: srcSets.base,
          srcWebp,
          srcSetWebp: srcSets.webp,
        })
      }
    })
  }
}
