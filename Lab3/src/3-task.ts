type Primitive = string | number | boolean;
type PossibleTypes = Record<string, unknown> | Array<unknown> | Primitive;

const cloneIfObject = (value: PossibleTypes): PossibleTypes => {
    if (typeof value === 'object') {
        value = clone(value);
    }
    return value;
};

const cloneArray = <
    T extends Array<PossibleTypes>
>(arr: T): T => arr.map(cloneIfObject) as T;

const cloneObjectCollection = <
    K extends keyof T,
    T extends Record<K, PossibleTypes>
>(obj: T): T => {
    const clonedObj: T = {} as T;
    Object.keys(obj).forEach(key => {
        let value: PossibleTypes = obj[key as K];
        if (typeof value !== 'function') {
            clonedObj[key as K] = cloneIfObject(value) as T[K];
        }
    });
    return clonedObj;
};


const clone = <
    T extends Array<unknown> | Record<string, unknown>
>(obj: T): T => {
    if (Array.isArray(obj)) {
        return cloneArray(obj);
    }
    return cloneObjectCollection(obj);


};

// Internet solution(very fast)
const cheatClone = <
    T extends Record<string, unknown> | Array<unknown>
>(obj: T): T => JSON.parse(JSON.stringify(obj));


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





