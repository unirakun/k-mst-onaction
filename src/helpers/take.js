import { isRegExp, isString, isFunction } from 'lodash'
import pathToRegexp from 'path-to-regexp'

const take = (match, callback) => (action, tree) => {
  const isMatching = ( // test matching
    // to a string converted to regexp
    (
      isString(match) &&
      pathToRegexp(match, [], { sensitive: true }).exec(action.fullpath) !== null
    )
    // to a function
    || (
      isFunction(match) &&
      match(action, tree)
    )
    // to a regexp
    || (
      isRegExp(match) &&
      action.fullpath.match(match)
    )
  )

  if (isMatching) return callback(action, tree)
  return false
}

const ended = (match, callback) => (action, tree) => {
  if (action.ended) return take(match, callback)(action, tree)
  return false
}

take.ended = ended

export default take
