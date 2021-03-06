export const dynamicSort = (property) => {
  let sortOrder = 1
  return function (a,b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
      return result * sortOrder
  }
}
