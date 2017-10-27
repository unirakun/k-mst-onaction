/* eslint-env jest */
import runFunction from './runFunction'

describe('function runner', () => {
  it('should run a simple function', () => {
    const dispatch = jest.fn(() => 'dispatch function')

    runFunction(dispatch, { ho: 'i am an action' }, { this: 'is the tree :)' })

    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  it('should run a simple function that returns nothing', () => {
    const dispatch = jest.fn()

    runFunction(dispatch, { ho: 'i am an action' }, { this: 'is the tree :)' })

    expect(dispatch.mock.calls).toMatchSnapshot()
  })

  it('should run a function that returns an array', () => {
    const first = jest.fn(() => 'first')
    const second = jest.fn(() => 'second')
    const dispatch = jest.fn(() => [first, second])

    runFunction(dispatch, { ho: 'i am an action' }, { this: 'is the tree :)' })

    expect(dispatch.mock.calls).toMatchSnapshot()
    expect(first.mock.calls).toMatchSnapshot()
    expect(second.mock.calls).toMatchSnapshot()
  })
})
