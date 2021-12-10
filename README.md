You have several options:

```typescript
const sum = Eazy.from([1, 2, 3, 4, 5, 6])
  .map(n => n * 3)
  .filter(n => n % 2 === 0)
  .sum();

console.log(sum); // 36
```
- or you can import each function separately and use them without chaining:
```typescript

// Without chaining:
const easy = toEazy([1, 2, 3, 4, 5, 6]);
const transformed = map(easy, n => n * 3);
const filtered = filter(transformed, n => n % 2 === 0);
const result = sum(filtered);

console.log(result); // 36
```
```typescript

// Nested:
const result = sum(
    filter(
        map(toEazy([1, 2, 3, 4, 5, 6]), (n) => n * 3),
        (n) => n % 2 === 0
    )
);
console.log(result); // 36
```

- or you can combine them:
```typescript
const iterator = Eazy.from([1, 2, 3, 4, 5, 6])
  .map(n => n * 3)
  .toIterator();

const result = sum(filter(iterator, n => n % 2 === 0));

console.log(result); // 36
```
As you can see we can achieve the same thing with three different approaches.

## Introduction

What is easy? What does this mean?

Let's see one simple example to illustrate what easy is and why it's so useful and powerful.
In a traditional JavaScript this logic will look like this:

```typescript
const source = [1, 2, 3, 4];
const result = source
    .map(n => n * 3)
    .filter(n => n % 2 === 0)
    .reduce((prev, next) => prev + next, 0);

console.log(result); // 18
```

With this it will look like this:

```typescript

const source = [1, 2, 3, 4];
const result = Eazy.from(source)
    .map(n => n * 3)
    .filter(n => n % 2 === 0)
    .sum();

console.log(result); // 18
```

So what is the difference?

In the first example each function (map, filter and reduce) produces a new array or value, which means that we will iterate through each array. In this case we have the initial array and two newly created arrays (one from the 'map' function and one from the 'filter' function) and finally we will produce a new value with the 'reduce' function. This is very expensive! Don't do this! You can do it better!

With the this example we will iterate only once through the initial array and we will apply all operations for each value.

So let's rewrite these two examples with 'for' loops to see what happens under the hood:

```typescript
// The first example will execute something like this
const source = [1, 2, 3, 4];

const resultAfterMap = [];                            // map
for (let i = 0; i < source.length; i++) {
    resultAfterMap.push(source[i] * 3);
}

const resultAfterFilter = [];                         // filter
for (let i = 0; i < resultAfterMap.length; i++) {
    if (resultAfterMap[i] % 2 === 0) {
        resultAfterFilter.push(resultAfterMap[i]);
    }
}

let result = 0;                                       // sum
for (let i = 0; i < resultAfterFilter.length; i++) {
    result += resultAfterFilter[i];
}

console.log(result); // 18
```

So we have two newly created arrays and three 'for' loops.

```typescript
// The second example will execute something like this
const source = [1, 2, 3, 4];

let result = 0;
for (let i = 0; i < source.length; i++) {
    const newValue = source[i] * 3;       // map
    if (newValue % 2 === 0) {             // filter
        result += newValue;               // sum
    }
}

console.log(result); // 18
```

In this case we will iterate only once through the initial array and we will produce only the final result, without using any extra memory. It is much much better!
