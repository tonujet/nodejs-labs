"use strict";
// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
const add = ((initial) => (n) => {
    if (!n)
        return initial;
    return add(initial + n);
});
console.log(add(2)(5)(7)(1)(6)(5)(11)());
console.log(add(2)(8)());
//
//
// const add = (initial: number): (n?: number) => number => {
//     return (n?: number): number=> {
//         if (!n) return initial;
//         return add(initial + n);
//     }
// };
//
// const add = (initial) =>{
//     let sum = initial;
//     const adder = n => {
//         sum += n;
//         return adder
//     }
//     return adder;
// }
// type Adder = (n: number) => number | Adder;
