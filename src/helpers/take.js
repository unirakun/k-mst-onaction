import { isRegExp, isString, isFunction } from 'lodash'

const take = (match, callback) => (action, tree) => {
  const isMatching = false
    || (isString(match) && match === action.fullpath)
    || (isFunction(match) && match(action, tree))
    || (isRegExp(match) && action.fullpath.match(match))

  if (isMatching) return callback(action, tree)
  return false
}

const ended = (match, callback) => (action, tree) => {
  if (action.ended) return take(match, callback)(action, tree)
  return false
}

take.ended = ended

export default take
