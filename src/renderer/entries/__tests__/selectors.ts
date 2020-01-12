import { getEntries, getEntity } from '../selectors'
import { defaultRootState } from './constants'

describe('Get entries', () => {
  it('Get all user', () => {
    // @ts-ignore
    let result = getEntries(defaultRootState, 'users')
    // @ts-ignore
    expect(result).toEqual(defaultRootState.entries.users)
  })

  it('Get product by id', () => {
    // @ts-ignore
    let result = getEntity(defaultRootState, 'products', 2)
    // @ts-ignore
    expect(result).toEqual(defaultRootState.entries.products[2])
  })
})
