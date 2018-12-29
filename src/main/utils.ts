import { identity } from 'lodash';

export const findReplace = (list: object[], predicate, replacement, notFound = identity) => {
    const index = list.findIndex(predicate);
    const foundItem = list[index];
    if (!foundItem) {
        return notFound(list)
    }

    return [
        replacement(foundItem),
        ...list.filter((item, i) => {
            return i !== index;
        }),
    ]
}
