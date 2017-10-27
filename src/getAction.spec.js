/* eslint-env jest */
import getAction from './getAction'

describe('getAction maper', () => {
  it('should map a simple mobx-state-tree action', () => {
    const call = {
      name: 'actionName',
      type: 'action', // simple mobx-state-tree action
      context: {}, // FIXME : HELP ME HOW TO THIS IS WELL ?
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })
})
