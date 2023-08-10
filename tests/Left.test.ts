import { Left } from '~/shared/either/either'

describe('Left', () => {
  it('should create a new instance of Left with a value and correctly assign the value', () => {
    const value = 'test'
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })

  it('should return true when calling isLeft()', () => {
    const left = new Left('test')
    expect(left.isLeft()).toBe(true)
  })

  it('should return false when calling isRight()', () => {
    const left = new Left('test')
    expect(left.isRight()).toBe(false)
  })

  it('should create a new instance of Left with a null value and correctly assign the value', () => {
    const value = null
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })

  it('should create a new instance of Left with an undefined value and correctly assign the value', () => {
    const value = undefined
    const left = new Left(value)
    expect(left.value).toEqual(value)
  })
})
