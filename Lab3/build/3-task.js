"use strict";
const cloneIfObject = (value) => {
    if (typeof value === 'object') {
        value = clone(value);
    }
    return value;
};
const cloneArray = (arr) => arr.map(cloneIfObject);
const cloneObjectCollection = (obj) => {
    const clonedObj = {};
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        if (typeof value !== 'function') {
            clonedObj[key] = cloneIfObject(value);
        }
    });
    return clonedObj;
};
const clone = (obj) => {
    if (Array.isArray(obj)) {
        return cloneArray(obj);
    }
    return cloneObjectCollection(obj);
};
const person = {
    name: 'Anton',
    age: 10,
    isHasMoney: false,
    friends: [{ name: 'Anrew' }, { name: 'Fedor' }],
    a() {
        return 1;
    }
};
const newPerson = clone(person);
console.log({ person, newPerson });
console.log(person.friends === newPerson.friends);
console.log(person.friends[0] === newPerson.friends[0]);
console.log(clone(1));
// Internet solution(very fast)
// const cheatClone = (obj : object) => JSON.parse(JSON.stringify(obj));
