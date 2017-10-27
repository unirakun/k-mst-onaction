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

  it('should map an asynchronous action that ends [mst<=1.0.0]', () => {
    const call = {
      name: 'actionName',
      type: 'process_return', // MST version <= 1.0.0
      context: { $treenode: { path: '/this/is/a/path' } },
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })


  it('should map an asynchronous action that ends [mst>1.0.0]', () => {
    const call = {
      name: 'actionName',
      type: 'flow_return', // MST version > 1.0.0
      context: { $treenode: { path: '/this/is/a/path' } },
      args: ['first', { second: 'argument' }],
    }

    const res = getAction(call)

    expect(res).toMatchSnapshot()
  })
})
