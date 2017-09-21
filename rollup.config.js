import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

const input   = 'src/index.js';
const output  = 'dist/bundle.js';

//
export default {
  input: input,
  output: {
    file: output,
    format: 'cjs'
  },
  plugins: [
     babel() 
  ]
};
