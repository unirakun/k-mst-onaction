/* eslint-env jest */
import runArray from './runArray'


describe('array runner', () => {
  it('should run all function from the array', () => {
    const first = jest.fn(() => 'first')
    const second = jest.fn(() => 'second')

    runArray([first, second], { ho: 'an action' }, { this: 'is tree !' })

    expect(first.mock.calls).toMatchSnapshot()
    expect(second.mock.calls).toMatchSnapshot()
  })

  it('should works with empty array', () => {
    runArray([], { ho: 'an action' }, { this: 'is tree !' })
  })
})
