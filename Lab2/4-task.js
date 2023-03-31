// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів. Приклад (псевдокод):
// const calc = (a, b, c) => a+b+c;
// const wrapper = (args) => {
//     // код вашої функції
// };
// const cachedCalc = wrapper(add);
// cachedCalc(2,2,3); // 7 calculated
// cachedCalc(5,8,1); // 14 calculated
// cachedCalc(2,2,3); // 7 from cache


const mul = (args) => {
    return args.reduce((acc, value) => acc * value);
};

const wrapper = fn => {
    const cache = {};

    return (...args) => {
        const cachedResult = cache[args];
        if (cachedResult) return cachedResult;
        const result = fn(args);
        cache[args] = result;
        return result;
    };
};


const cachedMul = wrapper(mul);
console.log(cachedMul(1, 2, 3)); // save to cache
console.log(cachedMul(3, 2, 1));// save to cache
console.log(cachedMul(1, 2, 3));// read from cache
console.log(cachedMul(1, 2, 3)); // read from cache