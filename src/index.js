/**
|--------------------------------------------------
|  CreateClassName
|--------------------------------------------------
*/

const createClassName = (defaultClassName = '', props = {}, mapping = []) => {
  const getClassName = (className) => {
    return (typeof className === 'function') ? className(props) : className;
  }

  if(typeof defaultClassName != 'string' || typeof props != 'object' || !Array.isArray(mapping))
    throw new Error('TypeError: invalid arguments types');

  defaultClassName = defaultClassName.trim();
  return mapping.reduce((previous, current, index) => {
    if(typeof current.verifier === 'string' && props[current.verifier]){
      return `${previous} ${getClassName(current.className)}`;
    } else if(typeof current.verifier === 'function' && current.verifier(props) === true) {
      return `${previous} ${getClassName(current.className)}`;
    }

    return previous;
  }, defaultClassName);
}

export default createClassName;