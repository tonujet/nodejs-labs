"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr = [1, 2, 3, 4, 5];
const runSequent = async (arr, cb) => {
    const res = [];
    for (const [index, element] of arr.entries()) {
        const callbackElement = await cb(element, index);
        res.push(callbackElement);
    }
    return res;
};
(async () => {
    const results = await runSequent(arr, (item, index) => {
        return Promise.resolve({
            item,
            index
        });
    });
    console.log(results);
})();
