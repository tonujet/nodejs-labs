// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37


const add = initial => n => {
    if (!n) return initial;
    return add(initial + n);
};


console.log(add(2)(5)(7)(1)(6)(5)(11)());