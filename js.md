## types

String      : "Any text"
Number      : 1234.45
Boolean     : true or false
Null        : null
Undifined   : undefained
Symbol      : Symbol('something')
Object      : { key: 'value' }
  Array     : [ 1, "text", false ]
  Funcrtion : fnction name() {}


## Strings

```js
let city = "Montreal";
city = city.toLowerCase(); // "montreal"

let city = "Montreal";
city = city.toUpperCase(); // "MONTREAL"

```

## Operate

```js
2 > 3 // false 
2 < 3 // true 
2 <= 2 // true
3 >= 2 // true
2 === 5 // false 
2 !== 3 // true 
1 + 2 === 4 // false
```

## Numbers

```js
Math.round(4.7) // 5
Math.floor(4.7) // 4
Math.ceil(4.7) // 5

Math.min(2, 5, 1) // 1
Math.max(2, 5, 1); // 5
Math.random(); // 0.47231881595639025

// 2 つの値の間の乱数を得る Getting a random number between two values
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// 2 つの値の間のランダムな整数を得る Getting a random integer between two values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
  // The maximum is exclusive and the minimum is inclusive
}

// 包括的に 2 つの値の間のランダムな整数を得る Getting a random integer between two values, inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  //The maximum is inclusive and the minimum is inclusive
}
```

## Dates

```js
let now = new Date();
let date = Date.parse("01 Jan 2025 00:00:00 GMT");
now.getMinutes(); // 0,1,2, 12
now.getHours(); //1, 2, 3, 4
now.getDate(); //1, 2, 3, 4
now.getDay(); // 0, 1, 2
now.getMonth(); // 0, 1, 2
now.getFullYear(); // 2021
```

## Arrays

```js
let myList = [];
myList = ['banana', 3, go, ['John', 'Doe'], {'firstName': 'John', 'lastName': 'Smith'}]

for (let i = 0; i < myList.length; i++) {
  alert("I have " + myList[i] + " in my shopping bag");
}
```

### length

```js
const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];
console.log(clothing.length); // 4
```

### push(element)
### push(element, element, /* … ,*/)

```js
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count); // 4
console.log(animals); // ['pigs', 'goats', 'sheep', 'cows']
```

### pop()

```js
const animals = ['pigs', 'goats', 'sheep'];

const animal = animals.push('cows');
console.log(animal); // 'sheep'
console.log(animals); // ['pigs', 'goats']
```

### unshift(element)
### unshift(element, element, /* … ,*/)

```js
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.unshift('cows');
console.log(count); // 4
console.log(animals); // ['cows', 'pigs', 'goats', 'sheep']
```

### shift()

```js
const animals = ['pigs', 'goats', 'sheep'];

const animal = animals.shift();
console.log(animal); // 'pigs'
console.log(animals); // ['goats', 'sheep']
```

### splice(start, deleteCount = null, itemN = null)

**start**: 配列を変更する先頭の位置
**deleteCount**: `start`の位置から取り除く要素の個数
**itemN**: 配列に追加する要素

```js
const animals = ['pigs', 'goats', 'sheep'];

// 2 の位置の手前から 0 個の要素を削除して "cows" を挿入
const removed = animals.splice(2, 0, 'horse');
console.log(removed); // []
console.log(animals); // ['pigs', 'goats', 'horse', 'sheep']

// 2 の位置の手前から 0 個の要素を削除して、"cows" と "bull" を挿入
const removed = animals.splice(2, 0, 'cows', 'bull');
console.log(removed); // []
console.log(animals); //  ['pigs', 'goats', 'cows', 'bull', 'horse', 'sheep']

// 3 の位置から 1 つ取り除く
const removed = animals.splice(2, 1);
console.log(removed); // ['cows']
console.log(animals); // ['pigs', 'goats', 'bull', 'horse', 'sheep']

// 2 の位置から 1 つ取り除いて "cows" を挿入
const removed = animals.splice(2, 1, 'cows');
console.log(removed); // ['bull']
console.log(animals); // ['pigs', 'goats', 'cows', 'horse', 'sheep']

// 0 の位置から 2 つ取り除き、そこへ "rabbit1" と "rabbit2" と "rabbit3" を挿入
const removed = animals.splice(0, 2, 'rabbit1', 'rabbit2', 'rabbit3');
console.log(removed); // ['pigs', 'goats']
console.log(animals); // ['rabbit1', 'rabbit2', 'rabbit3', 'cows', 'horse', 'sheep']

// 2 の位置から 2 つ取り除く
const removed = animals.splice(2, 2);
console.log(removed); // ['rabbit3', 'cows']
console.log(animals); // ['rabbit1', 'rabbit2', 'horse', 'sheep']

// -2 の位置から 1 つ取り除く
const removed = animals.splice(-2, 1);
console.log(removed); // ['horse']
console.log(animals); // ['rabbit1', 'rabbit2', 'sheep']

// 2 の位置からすべての要素を取り除く
const removed = animals.splice(2);
console.log(removed); // ['sheep']
console.log(animals); //  ['rabbit1', 'rabbit2']
```

### at(index)

```js 
const arr = [5, 12, 8, 130, 44];

console.log(arr.at(0)); // 5
console.log(arr.at(2)); // 8

console.log(arr.at(-2)); // 130
console.log(arr.at(-1)); // 44
```

### concat(array, array, /* … ,*/)

```js 
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers = num1.concat(num2, num3);
```

### join(separator)

```js 
const a = ['風', '水', '火'];
a.join();      // '風,水,火'
a.join(', ');  // '風, 水, 火'
a.join(' + '); // '風 + 水 + 火'
a.join('');    // '風水火'
```

### reverse()

```js 
const arr = ['one', 'two', 'three'];
const reversed = arr.reverse(); // ["three", "two", "one"]
```

### toString()

```js 
const arr = [1, 2, 'a', '1a'];
console.log(arr.toString()); // "1,2,a,1a"
```

### copyWithin(target, start = null, end = null)

配列の一部を同じ配列内の別の場所にシャローコピー

**target**: ペーストの開始位置
**start**: コピーしたい部分の開始位置
**end**: コピーしたい部分の終了位置

```js 
console.log([1, 2, 3, 4, 5].copyWithin(-2));
// [1, 2, 3, 1, 2]

console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
// [4, 5, 3, 4, 5]

console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
// [4, 2, 3, 4, 5]

console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1));
// [1, 2, 3, 3, 4]

```

### keys()
```js
const arr = ['a', 'b', 'c'];

const iterator = arr.keys(); // Array Iterator {}
for (const key of iterator) {
  console.log(key);
}
// 0
// 1
// 2

const arr1 = ['a', , 'c'];

// Object keys([array])
const sparseKeys = Object.keys(arr1);
console.log(sparseKeys); // ['0', '2']

// [array].keys()
const denseKeys = [...arr1.keys()];
console.log(denseKeys);  // [0, 1, 2]
```

### values()

```js
const arr = ['a', 'b', 'c'];

const iterator = arr.values();
for (const letter of iterator) {
  console.log(letter);
}
// "a"
// "b" 
// "c"

const iterator = arr.values();
console.log(iterator.next()); // { value: "a", done: false }
console.log(iterator.next()); // { value: "b", done: false }
console.log(iterator.next()); // { value: "c", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
console.log(iterator.next().value); // undefined
```

### entries()

```js
const arr = ['a', 'b', 'c'];

for (const [index, element] of arr.entries()) {
  console.log(index, element);
}
// 0 'a'
// 1 'b'
// 2 'c'

const iterator1 = arr.entries();
console.log(iterator1.next().value); // [0, "a"]
console.log(iterator1.next().value); // [1, "b"]

const arrayEntries = array.entries();
for (const element of arrayEntries) {
  console.log(element);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

### filter(element, index = null, array = null)
### filter(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);
console.log(result); // ["exuberant", "destruction", "present"]
```

### map(element, index = null, array = null)
### map(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const arr = [1, 4, 9, 16];
// Pass a function to map
const result = arr.map(x => x * 2);

console.log(result); // [2, 8, 18, 32]
```

### reduce(previousValue, currentValue, currentIndex = null, array = null)
### reduce(callbackFn, initialValue)

```js
const arr = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
console.log(sumWithInitial); //  10
```

### reduceRight(previousValue, currentValue, currentIndex = null, array = null)
### reduceRight(callbackFn, initialValue)

```js
const arr = [[0, 1], [2, 3], [4, 5]];

const result = arr.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));
console.log(result); // [4, 5, 2, 3, 0, 1]
```

```js
const arr = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
console.log(sumWithInitial); //  10
```

### some(element, index = null, array = null)
### some(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

配列の中の少なくとも1つの要素が`true`を返す場合は`true`を返し、そうでない場合は`false`を返す

```js
const arr = [1, 2, 3, 4, 5];

const even = (element) => element % 2 === 0;
console.log(arr.some(even)); // true
```

### sort()
### sort(compareFn)

```js

// UTF-16 コード単位の値の並びとして比較
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort(); // ["Dec", "Feb", "Jan", "March"]

const arr = [1, 30, 4, 21, 100000];
arr.sort(); // [1, 100000, 21, 30, 4]

// 数値の場合
const arr2 = [4, 2, 5, 1, 3];
arr2.sort((a, b) => a - b);
console.log(arr2);　// [1, 2, 3, 4, 5]

// Objectの場合
const items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 }
];

// value 順にソート
items.sort((a, b) => a.value - b.value); 

// name 順にソート
items.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // 大文字と小文字を無視する
  const nameB = b.name.toUpperCase(); // 大文字と小文字を無視する
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // 名前が等しい
  return 0;
});
```

### includes(searchElement, fromIndex = null)

```js
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat')); // true
console.log(pets.includes('at'));  // false

[1, 2, 3].includes(2)         // true
[1, 2, 3].includes(4)         // false
[1, 2, 3].includes(3, 3)      // false
[1, 2, 3].includes(3, -1)     // true
[1, 2, NaN].includes(NaN)     // true
["1", "2", "3"].includes(3)   // false


// 配列の長さは 3
// fromIndex は -100
// 補正されたインデックスは 3 + (-100) = -97
const arr = ['a', 'b', 'c'];

arr.includes('a', -100) // true
arr.includes('b', -100) // true
arr.includes('c', -100) // true
arr.includes('a', -2)   // false
```

### indexOf(searchElement)
### indexOf(searchElement, fromIndex)

### lastIndexOf(searchElement)
### lastIndexOf(searchElement, fromIndex)

```js
const array = [2, 9, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0

const numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3
numbers.lastIndexOf(7);     // -1
numbers.lastIndexOf(2, 3);  // 3
numbers.lastIndexOf(2, 2);  // 0
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3
```

### find(element, index = null, array = null)
### find(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

### findLast(element, index = null, array = null)
### findLast(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const arr = [5, 12, 8, 130, 44];

const found = arr.find(element => element > 10);
console.log(found); // 12

const found = arr.findLast(element => element > 10);
console.log(found); // 44

// アロー関数と分割代入の使用
const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'cherries', quantity: 5}
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 2}
];

const result = inventory.find(({ name }) => name === 'cherries');
console.log(result) // { name: 'cherries', quantity: 5 }

const result = inventory.findLast(({ name }) => name === 'cherries');
console.log(result) // { name: 'cherries', quantity:  2}
```

### findIndex(element, index = null, array = null)
### findIndex(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

### findLastIndex(element, index = null, array = null)
### findLastIndex(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const arr = [5, 14, 8, 130, 44];

const isLargeNumber = element => element > 20;

console.log(arr.findIndex(isLargeNumber)); // 3

console.log(arr.findLastIndex(isLargeNumber)); // 3
```

### flat(depth)

```js
const arr = [1, 2, [3, 4]];

// 単一レベルの配列にする
arr.flat();
const arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### flatMap(element, index = null, array = null)
### flatMap(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const arr1 = [1, 2, [3], [4, 5], 6, []];

const flattened = arr1.flatMap(num => num);

console.log(flattened); // [1, 2, 3, 4, 5, 6]
```

### forEach(element, index = null, array = null)
### forEach(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const arr = ['a', 'b', 'c'];

arr.forEach(element => console.log(element));
// "a"
// "b"
// "c"
```

### group(element, index = null, array = null)
### group(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値

```js
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas',  type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
  { name: 'fish', type: 'meat', quantity: 22 }
];

const result = inventory.group(({ type }) => type);
// {
//   vegetables: [
//     { name: 'asparagus', type: 'vegetables', quantity: 5 },
//   ],
//   fruit: [
//     { name: "bananas", type: "fruit", quantity: 0 },
//     { name: "cherries", type: "fruit", quantity: 5 }
//   ],
//   meat: [
//     { name: "goat", type: "meat", quantity: 23 },
//     { name: "fish", type: "meat", quantity: 22 }
//   ]
// }
```

### every(element, index = null, array = null)
### every(callbackFn, thisArg = null) // thisArg 省略可 callbackFn 内で this として使用する値
列内のすべての要素が指定された関数で実装されたテストに合格するかどうかをテスト
論理値を返えす

```js
const isUnder40 = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold)); // true
```

## Objects

### key

```js
const key = 'name';

const param = {
  [key]: 'aaa',
}

console.log(param) // {name: 'aaa'}
```

### in

```js
const arr = [1, 2, 3];
3 in arr // false
2 in arr // true
```

### forof

```js
const menbers = {
  a: {name: 'aaa', age: 10},
  b: {name: 'bbb', age: 20},
  c: {name: 'ccc', age: 30},
};

for (const [key, value] of Object.entries(menbers)) {
  console.log(key)
  console.log(value)
}
// a
// {name: 'aaa', age: 10}
// b
// {name: 'bbb', age: 20}
// c
// {name: 'ccc', age: 30}


for (const [key, value] of Object.entries(menbers.a)) {
  console.log(key)
  console.log(value)
}
// name
// aaa
// age
// 10
```

### Object.keys(obj)

### Object.values(obj)

### Object.entries(obj)

### Object.assign(target, ...sources)

### Object.create(proto)
### Object.create(proto, propertiesObject)

### hasOwn(instance, prop)

### assign()

## Symbols

シンボル(Symbol)は、ES2015(ES6) で追加された新たなプリミティブ型
シンボルは重複しない
プロパティキーとして使用、[ ]でアクセス


```js
const sym = Symbol("デバッグ用の説明");

console.log(sym) // undefined
alert(sym) // Cannot convert a Symbol value to a string
console.log(sym.toString()) // Symbol(デバッグ用の説明)

Symbol() === Symbol(); // false
Symbol("abc") === Symbol("abc"); // false 
```

使用目的
- プロパティ名の重複を避ける
- 外部からアクセスできないプロパティを作成する
- 定数としての利用

```js
let obj = {};
const sym = Symbol("obj のキー");
obj[sym] = "xyz";

console.log(obj[sym]); // "xyz"
```

### Array.from()

### Array.isArray()

### Array.of()


## dom

### document.querySelector(selectors)

```html
<div id="foo">foo</div>
<div class="bars">
  <div>
    <span class="bar">1</span>
    <span class="bar">2</span>
  </div>
  <span class="bar">3</span>
</div>

<script>
  const foo = document.querySelector('#foo');    // <div id="foo">foo</div>
  const bars = document.querySelector('.bars');    // <div class="bars">...</div>
  const selected = bars.querySelector(':scope > .bar'); // <span class="bar">3</span>
</script>
```

### targetElement.insertAdjacentHTML(position, text)

### targetElement.insertAdjacentElement(position, element)

### targetElement.insertAdjacentText(position, element);

### Window.getComputedStyle(element)

### element.setAttribute(name,value)
### element.getAttribute(name)
### element.removeAttribute(attrName)
### element.hasAttribute(attrName)
### element.toggleAttribute()

### document.createDocumentFragment()
### document.createElement('div')
### document.createTextNode('Hello')

### element.getBoundingClientRect()

```html
<p>Hello</p>

<style>
  p {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  font: 2rem/2 sans-serif;
  text-align: center;
  background: purple;
  color: white;
}
</style>

<script>
  const para = document.querySelector('p');
  const compStyles = window.getComputedStyle(para);
  console.log(compStyles.getPropertyValue('font-size'));
  console.log(compStyles.getPropertyValue('line-height'));
</script>
```

### Image

```js
var image = new Image();
var width;
var height;

image.onload = function(){
  width = image.width;
  height = image.height;
};
image.src = 'hogehoge.jpg';
```

