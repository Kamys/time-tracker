import {STORAGE_KEY} from 'main/moduleStorage/constant';

export interface IStorage {
    set(key: STORAGE_KEY, data: object): void;
    get(key: STORAGE_KEY): object;
}