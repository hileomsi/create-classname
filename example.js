const { createClassName } = require('./src');

const c = createClassName({
  props: [
    { name: 'big', className: 'button-big' }
  ],
  className: 'button'
});

const props = {
  big: true
};

console.log(c(props));
console.log(props);