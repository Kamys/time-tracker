import { keepRadius } from '../index'

describe('keepRadius', () => {
  it('Returns to the beginning', () => {
    const result = keepRadius(6, 5, 1)

    expect(result).toEqual(1)
  })

  it('Returns to the end', () => {
    const result = keepRadius(0, 5, 1)

    expect(result).toEqual(5)
  })

  it('Does not affect within radius', () => {
    expect(keepRadius(1, 5, 1)).toEqual(1)
    expect(keepRadius(2, 5, 1)).toEqual(2)
    expect(keepRadius(3, 5, 1)).toEqual(3)
  })
})
