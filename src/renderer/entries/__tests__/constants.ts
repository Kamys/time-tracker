export const defaultEntriesState = {
  users: [
    { id: 0, name: 'Jek', age: 23 },
    { id: 1, name: 'Smith', age: 15 },
    { id: 2, name: 'Isaac', age: 39 },
  ],
  products: [
    { id: 0, name: 'Product 0', cost: 1800 },
    { id: 1, name: 'Product 1', cost: 200 },
    { id: 2, name: 'Product 2', cost: 100 },
    { id: 3, name: 'Product 3', cost: 550 },
  ],
}

export const defaultRootState = {
  entries: defaultEntriesState,
}
