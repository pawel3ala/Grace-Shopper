export const getUrlString = (params, keys = [], isArray = false) => {
  const p = Object.keys(params)
    .map(key => {
      let val = params[key]

      if (
        '[object Object]' === Object.prototype.toString.call(val) ||
        Array.isArray(val)
      ) {
        if (Array.isArray(params)) keys.push('')
        else keys.push(key)
        return getUrlString(val, keys, Array.isArray(val))
      } else {
        let tKey = key

        if (keys.length > 0) {
          const tKeys = isArray ? keys : [...keys, key]
          tKey = tKeys.reduce((str, k) => ('' === str ? k : `${str}[${k}]`), '')
        }
        if (isArray) return `${tKey}[]=${val}`
        else return `${tKey}=${val}`
      }
    })
    .join('&')

  keys.pop()
  return p
}

export const getAverageRating = reviews => {
  if (reviews.length === 0) {
    return 0
  }
  let total = reviews.reduce((tot, review) => {
    tot += review.stars
    return tot
  }, 0)
  return Math.round(total / reviews.length)
}

export const priceFormat = price => {
  const stringPrice = String(price)
  return `$${stringPrice.slice(0, stringPrice.length - 2)}.${stringPrice.slice(
    stringPrice.length - 2
  )}`
}
