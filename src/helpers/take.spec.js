/* eslint-env jest */
import take from './take'

describe('take helper', () => {
  describe('simple version', () => {
    it('should not match (wrong type)', () => {
      const callback = jest.fn(() => 'callback returns')

      const res = take(['do', 'not', 'match', 'this', 'please'], callback)({}, {})

      expect(res).toMatchSnapshot()
      expect(callback.mock.calls).toMatchSnapshot()
    })

    it('should match -string-', () => {
      const callback = jest.fn(() => 'callback returns')
      const fullpath = '/some/full/path'

      const res = take(fullpath, callback)({ fullpath }, { this: 'is tree' })

      expect(res).toMatchSnapshot()
      expect(callback.mock.calls).toMatchSnapshot()
    })
    it('should **not** match -string-', () => {
      const callback = jest.fn(() => 'callback returns')
      const fullpath = '/some/full/path'

      const res = take('oups', callback)({ fullpath }, { this: 'is tree' })

      expect(res).toMatchSnapshot()
      expect(callback.mock.calls).toMatchSnapshot()
    })

    // ==========
    // from now tests are simpler because both returns type are tested
    // ==========

    it('should match -regexp as string-', () => {
      const res = take('/user/:id/setName', () => 'match !')({ fullpath: '/user/302/setName' }, {})
      expect(res).toMatchSnapshot()
    })
    it('should **not** match -regexp as string-', () => {
      const res = take('/user/id/setName', () => 'match !')({ fullpath: '/user/302/setName' }, {})
      expect(res).toMatchSnapshot()
    })

    it('should match -function-', () => {
      const res = take(() => true, () => 'match !')({}, {})
      expect(res).toMatchSnapshot()
    })
    it('should **not** match -function-', () => {
      const res = take(() => false, () => 'match !')({}, {})
      expect(res).toMatchSnapshot()
    })

    it('should match -regexp-', () => {
      const res = take(/setText/, () => 'match !')({ fullpath: '/yeah/path/to/setText' }, {})
      expect(res).toMatchSnapshot()
    })
    it('should **not** match -regexp-', () => {
      const res = take(/settext/, () => 'match !')({ fullpath: '/yeah/path/to/setText' }, {})
      expect(res).toMatchSnapshot()
    })
  })

  describe('ended version', () => {
    // here we test only one type because other are tested before
    it('should match -ended: true-', () => {
      const callback = jest.fn(() => 'callback returns !')
      const fullpath = 'match please'
      const res = take.ended(fullpath, callback)({ fullpath, ended: true }, { this: 'is tree :)' })

      expect(res).toMatchSnapshot()
      expect(callback.mock.calls).toMatchSnapshot()
    })

    it('should not match -ended: false-', () => {
      const callback = jest.fn(() => 'callback returns !')
      const fullpath = 'match please'
      const res = take.ended(fullpath, callback)({ fullpath }, { this: 'is tree :)' })

      expect(res).toMatchSnapshot()
      expect(callback.mock.calls).toMatchSnapshot()
    })
  })
})
