import { isArray, isFunction } from 'lodash'
import { runArray, runFunction } from './runners'
import getAction from './getAction'

const run = dispatch => (action, tree) => {
  if (isFunction(dispatch)) return runFunction(dispatch, action, tree)
  if (isArray(dispatch)) return runArray(dispatch, action, tree)

  throw new Error('[trampss-mst-onaction] unknow dispatch type')
}

export default (dispatch) => {
  const runDispatch = run(dispatch)

  return (call, next) => {
    const action = getAction(call)

    if (action) runDispatch(action, call.tree)

    return next(call)
  }
}
