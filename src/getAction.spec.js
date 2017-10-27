/* eslint-env jest */
import getAction from './getAction'

describe('getAction maper', () => {
  it('should map a simple mobx-state-tree action', () => {
    const call = {
      name: 'actionName',
      type: 'action', // simple mobx-state-tree action
      context: { $treenode: { path: '/this/is/a/path' } },
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })

  it('should map an undefined type', () => {
    const call = {
      name: 'actionName',
      type: 'undefined type',
      context: { $treenode: { path: '/this/is/a/path' } },
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })

  it('should map an asynchronous action that ends', () => {
    const call = {
      name: 'actionName',
      type: 'process_return', // asynchronous that ends action
      context: { $treenode: { path: '/this/is/a/path' } },
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })
})
