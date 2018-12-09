import {isObject, isArray} from 'lodash';

export const mergeArray = (baseArray, newArray) => {
    if (isArray(newArray)) {
        return [
            ...baseArray,
            ...newArray,
        ];
    }

    if(isObject(newArray)) {
        return [
            ...baseArray,
            newArray,
        ]
    }

    throw new Error(`Failed mergeArray. Merge value must be object or array. Value type ${typeof newArray}`)
}

