// 2. Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву.
// Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу.
// Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
//     const array = [1, 2, 3, 6, 7, 9];
// const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);
//
// IDE має розглядати змінні з прикладу так:
//     item: number
// deletedElements: Array
// результат виклику:
//     array = [1, 3, 7, 9]
// deletedElements = [2, 6]


const arr: number[] = [1, 2, 3, 4, 5, 6,];
const arrayChangeDelete = <T>(
    array: T[],
    fn: (item: T) => boolean
): T[] => {
    const res: T[] = [];
    for (const [i, item] of array.entries()) {
        const isRemove: boolean = fn(item);
        if (isRemove) {
            // змінює переданий масив
            array.splice(i, 1);
            res.push(item);
        }
    }
    return res;
};


const deletedElements = arrayChangeDelete(
    arr,
    (item) => item % 2 === 0
);
console.log({
    deletedElements,
    arr
});


export {};