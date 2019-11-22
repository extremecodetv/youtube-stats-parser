/* eslint-disable */
Object.defineProperty(Array.prototype, 'chunk', {
  value: function (chunkSize) {
    const chunks = []
    for (let i = 0; i < this.length; i += chunkSize) {
      chunks.push(this.slice(i, i + chunkSize))
    }

    return chunks
  }
})
/* eslint-enable */
