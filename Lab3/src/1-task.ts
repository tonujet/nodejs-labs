// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37


// This interface fix callable problem
interface Adder {
    (n: number): Adder;
    (): number;
}

type Add = ((n?: number) => Add) | number;

const add = ((
    initial: number
): (n?: number) => Add => (
    n?: number
): Add => {
    if (!n) return initial;
    return add(initial + n);
}) as Adder ;

console.log(add(2)(5)(7)(1)(6)(5)(11)());
console.log(add(2)(8)())



