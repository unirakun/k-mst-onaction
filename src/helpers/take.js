import { isRegExp, isString, isFunction } from 'lodash'

const take = (action, tree) => (match, callback) => {
  const isMatching = false
    || (isString(match) && match === action.fullpath)
    || (isFunction(match) && match(action, tree))
    || (isRegExp(match) && action.fullpath.match(match))

  if (isMatching) return callback(action, tree)
  return false
}

const ended = takeImpl => (action, tree) => {
  if (action.ended) return takeImpl(action, tree)
  return () => false
}

take.ended = ended(take)

export default take
