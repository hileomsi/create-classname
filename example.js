const { createClassName } = require('./src');

// const c = createClassName({
//   props: [
//     'big:button-big'
//   ],
//   className: 'button'
// });
const c = createClassName('button', ['big:button-big']);
const props = {
  big: true,
  className: 'col'
};

const props2 = {
  big: true,
  className: 'col'
};

const props3 = {
  big: true,
  className: 'col'
};
console.log(c(props));
console.log(c(props2));
console.log(c(props3));




// name == className
// OK - props [string(name || name:className), object]
// removeClassNameProps
