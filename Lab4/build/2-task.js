"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr = [1, 2, 3, 4, 5, 6,];
const arrayChangeDelete = (array, fn) => {
    const res = [];
    for (const [i, item] of array.entries()) {
        const isRemove = fn(item);
        if (isRemove) {
            array.splice(i, 1);
            res.push(item);
        }
    }
    return res;
};
const deletedElements = arrayChangeDelete(arr, (item) => item % 2 === 0);
console.log({
    deletedElements,
    arr
});
