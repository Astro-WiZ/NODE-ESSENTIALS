# Project Node

## Imports

### Default export
Module name: `module1.js`
```js
// arrow function
const add = (a, b) => {
    return a + b;
}

// or
// normal function
function add(a, b){
    return a + b
}

export default add;
```

Importing
```js
import add from 'module1';
```

### Multiple export
Module name: `module1.js`
```js
export const add = (a, b) => a + b
export function substract(a, b){
    return a - b
}
```

Importing
```js
import {add, substract} from 'module1';
```

### Multiple export with default export (NOT RECOMMENDED)
Module name: `module1.js`
```js
export const add = (a, b) => a + b;
export const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

// default export will always be at last
export default multiply;
```

Importing
```js
import multiply, {add, substract} from 'module1';
```

### Require to import

```js
const express = require('express');

// import alternative
import express from 'express';
```

```js
const express = require('express');
const router = express.Router();

// import alternative
import {Router} from 'express';
const router = Router();

```