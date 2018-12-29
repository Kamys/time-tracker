import reduce from '../reduce';
import { ActionsEntries } from '../actions';

const defaultState = {
    users: [
        {id: 0, name: 'Jek', age: 23},
        {id: 1, name: 'Smith', age: 15},
        {id: 2, name: 'Isaac', age: 39}
    ],
    products: [
        {id: 0, name: 'Product 0', cost: 1800},
        {id: 1, name: 'Product 1', cost: 200},
        {id: 2, name: 'Product 2', cost: 100},
        {id: 3, name: 'Product 3', cost: 550},
    ]
}

describe('Update entity', () => {
    it('Dont change state if not new parameters', () => {
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 0, entityName: 'users'})
        // @ts-ignore
        expect(reduce(defaultState, action)).toEqual(defaultState)
    })

    it('Update product move in start list', () => {
        const newCost = 780;
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 3, entityName: 'products', cost: newCost})
        // @ts-ignore
        expect(reduce(defaultState, action).products[0].cost).toEqual(newCost)
    })

    it('Can change user age', () => {
        const newAge = 11;
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 1, entityName: 'users', age: newAge})
        // @ts-ignore
        expect(reduce(defaultState, action).users[0].age).toEqual(newAge)
    })

    it('Can change product name', () => {
        const newName = 'New for product';
        // @ts-ignore
        const action = ActionsEntries.change.REQUEST({id: 3, entityName: 'products', name: newName})
        // @ts-ignore
        expect(reduce(defaultState, action).products[0].name).toEqual(newName)
    })
})
