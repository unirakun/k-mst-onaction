import { isArray } from 'lodash'

export default (dispatch, action, tree) => {
  const dispatchCall = dispatch(action, tree)
  if (!dispatchCall) return
  if (isArray(dispatchCall)) dispatchCall.forEach(runner => runner(action, tree))
}
