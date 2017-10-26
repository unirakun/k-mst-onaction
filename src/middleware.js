import { getPath } from 'mobx-state-tree'

const getAction = (call) => {
  const {
    name,
    type,
    context,
    args,
  } = call

  const path = getPath(context)
  const fullpath = `${path}/${name}`

  const action = {
    fullpath,
    path,
    name,
    args,
  }

  switch (type) {
    case 'process_return': return { ...action, ended: true }
    case 'action': return action
    default: return undefined
  }
}

export default dispatch => (call, next) => {
  const action = getAction(call)

  if (action) {
    const runner = dispatch()
    let step = { done: false }

    while (!step.done) {
      step = runner.next()
      if (!step.done) step.value(action, call.tree)
    }
  }

  return next(call)
}
