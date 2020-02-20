import _ from 'lodash'
export function mergeWith(ags1, ags2, ags3) {
  return _.mergeWith(
    ags1,
    ags2,
    ags3,
    customizer
  )
}

function customizer(objValue, srcValue) {
  objValue = _.words(objValue)
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export function cloneDeep(v) {
  return _.cloneDeep(v)
}
