import { removeItem } from '../utils'
import { defaultEntriesState } from './constants'

describe('removeItem', () => {
  it('Can remove', () => {
    const result = removeItem(defaultEntriesState.users, user => user.id === 1)
    expect(result).toEqual([
      defaultEntriesState.users[0],
      defaultEntriesState.users[2],
    ])
  })

  it('Dont change lis if not found id', () => {
    const result = removeItem(
      defaultEntriesState.users,
      user => user.id === undefined,
    )
    expect(result).toEqual(defaultEntriesState.users)
  })
})
