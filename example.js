const { createClassName } = require('./src');

// const c = createClassName({
//   props: [
//     'big:button-big'
//   ],
//   className: 'button'
// });
const c = createClassName('button', ['big:button-big'])
const props = {
  big: true,
  className: 'col'
};

console.log(c(props));
console.log(props);

// name == className
// OK - props [string(name || name:className), object]
// removeClassNameProps
