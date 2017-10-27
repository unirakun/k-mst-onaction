/* eslint-env jest */
jest.mock('./runners', () => ({
  runArray: jest.fn(),
  runFunction: jest.fn(),
}))
jest.mock('./getAction', () => call => (call.type === 'unknown' ? undefined : ({
  mocked: 'getAction',
  call,
})))

/* eslint-disable import/first */
import middleware from './middleware'
import { runArray, runFunction } from './runners'

describe('middleware', () => {
  let next
  beforeEach(() => {
    next = jest.fn(() => 'i am next')
    runArray.mockReset()
    runFunction.mockReset()
  })

  it('should not call runner (no action)', () => {
    const dispatch = jest.fn()
    const res = middleware(dispatch)({ type: 'unknown', tree: { this: 'is tree' } }, next)

    expect(res).toMatchSnapshot()
    expect(runArray.mock.calls).toMatchSnapshot()
    expect(runFunction.mock.calls).toMatchSnapshot()
  })

  it('should call runFunction', () => {
    const res = middleware(() => {})({ type: 'action', tree: { this: 'is tree' } }, next)

    expect(res).toMatchSnapshot()
    expect(runArray.mock.calls).toMatchSnapshot()
    expect(runFunction.mock.calls).toMatchSnapshot()
  })

  it('should call runArray', () => {
    const res = middleware([])({ type: 'action', tree: { this: 'is tree' } }, next)

    expect(res).toMatchSnapshot()
    expect(runArray.mock.calls).toMatchSnapshot()
    expect(runFunction.mock.calls).toMatchSnapshot()
  })

  it('should throw an error (unknown dispatch type)', () => {
    let fail = false

    try {
      middleware('dispatch string')({ type: 'action', tree: { this: 'is tree' } }, next)
    } catch (ex) {
      fail = true
      expect(ex).toMatchSnapshot()
    }

    expect(fail).toBe(true)
  })
})
