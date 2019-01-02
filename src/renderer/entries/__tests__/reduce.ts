import reduce from '../reduce';
import { ActionsEntries } from '../actions';
import { defaultEntriesState } from './constants';



describe('Update entity', () => {
    it('Dont change state if not new parameters', () => {
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 0, entityName: 'users'})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action)).toEqual(defaultEntriesState)
    })

    it('Update product move in start list', () => {
        const newCost = 780;
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 3, entityName: 'products', cost: newCost})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action).products[0].cost).toEqual(newCost)
    })

    it('Can change user age', () => {
        const newAge = 11;
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 1, entityName: 'users', age: newAge})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action).users[0].age).toEqual(newAge)
    })

    it('Can change product name', () => {
        const newName = 'New for product';
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 3, entityName: 'products', name: newName})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action).products[0].name).toEqual(newName)
    })
})

describe('Delete entity', () => {
    it('Can delete user', () => {
        // @ts-ignore
        const action = ActionsEntries.remove.REQUEST({entityId: 1, entityName: 'users'})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action)).toEqual({
            ...defaultEntriesState,
            users: [
                defaultEntriesState.users[0],
                defaultEntriesState.users[2],
            ]
        })
    })

    it('Dont change state if not found id', () => {
        // @ts-ignore
        const action = ActionsEntries.remove.REQUEST({entityId: undefined, entityName: 'users'})
        // @ts-ignore
        expect(reduce(defaultEntriesState, action)).toEqual(defaultEntriesState)
    })
})
