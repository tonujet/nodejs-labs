// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
const SEPARATOR: string = '';
const isAnagrams = (a: string, b: string): boolean => {
    const charsA: string[] = a.toLowerCase().split(SEPARATOR);
    const charsB: string[] = b.toLowerCase().split(SEPARATOR);

    for (const charA of charsA) {
        const index: number = charsB.indexOf(charA);
        if (index >= 0) {
            delete charsB[index];
        } else return false;
    }

    const emptyArr: string[] = charsB.filter(el => el);
    return emptyArr.length <= 0;
};


console.log(isAnagrams('listen', 'silten'));
console.log(isAnagrams('listen', 'siltten'));
console.log(isAnagrams('listen', 'netsil'));
console.log(isAnagrams('listenn', 'nsilten'));
