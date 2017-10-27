import { getPath } from 'mobx-state-tree'

export default (call) => {
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
    case 'process_return': // mobx-state-tree v1.0.0 and older
    case 'flow_return': return { ...action, ended: true }
    case 'action': return action
    default: return undefined
  }
}
