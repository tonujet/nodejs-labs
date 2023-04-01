// Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром

// My solution (work but slow compare to internet solution)
const clone = obj => {
    const clonedObj = {};
    if (Array.isArray(obj)) {
        return obj.map(cloneIfObject);
    } else {
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            if (!(typeof value === 'function')) {
                clonedObj[key] = cloneIfObject(value);
            }
        });
    }
    return clonedObj;
};

const cloneIfObject = value => {
    if (typeof value === 'object') {
        value = clone(value);
    }
    return value;
};

const person = {
    name: 'Anton',
    age: 10,
    isHasMoney: false,
    friends: [{name: 'Anrew'}, {name: 'Fedor'}],
    a() {
        return 1;
    }
};

const newPerson = clone(person);

console.log({person, newPerson});
console.log(person.friends === newPerson.friends);
console.log(person.friends[0] === newPerson.friends[0]);

// Internet solution(very fast)
const cheatClone = obj => JSON.parse(JSON.stringify(obj));


