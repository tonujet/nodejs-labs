"use strict";
// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів. Приклад (псевдокод):
// const calc = (a, b, c) => a+b+c;
// const wrapper = (args) => {
//     // код вашої функції
// };
// const cachedCalc = wrapper(add);
// cachedCalc(2,2,3); // 7 calculated
// cachedCalc(5,8,1); // 14 calculated
// cachedCalc(2,2,3); // 7 from cache
const mul = (...args) => {
    return args.reduce((acc, value) => acc * value);
};
// !!! Оскільки параметри тільки числа(Умова завдання), дженерики для аргументів функції можна не використовувати
const wrapper = (fn) => {
    const cache = {};
    return (...args) => {
        const cachedResult = cache[args.toString()];
        if (cachedResult)
            return cachedResult;
        const result = fn(...args);
        cache[args.toString()] = result;
        return result;
    };
};
const cachedMul = wrapper(mul);
console.log(cachedMul(1, 2, 3)); // save to cache
console.log(cachedMul(3, 2, 1)); // save to cache
console.log(cachedMul(1, 2, 3)); // read from cache
console.log(cachedMul(1, 2, 3)); // read from cache
