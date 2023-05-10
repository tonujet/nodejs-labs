// 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек,
// який викликається для кожного елемента масиву послідовно.
// Результатом виклику має бути масив результатів колбеку.
// Усі типи мають застосовуватися автоматично (функція шаблону).
// Приклад виклику:
//
// const array: Array<string> = ["one", "two", "three"];
// const results = await runSequent(array, (item, index) =>
//     Promise.resolve({
//         item,
//         index,
//     })
// );
//
// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

const arr: number[] = [1, 2, 3, 4, 5];

const runSequent = async <T, R>(
    arr: T[],
    cb: (item: T, index?: number) => Promise<R>
): Promise<R[]> => {
    const res: R[] = [];
    for (const [index, element] of arr.entries()) {
        const callbackElement: R = await cb(element, index);
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

export {};