/**
|--------------------------------------------------
|  CreateClassName
|--------------------------------------------------
*/

const getDefaultClassName = (defaultClassName, { className }) => {
  return `${defaultClassName.trim()} ${className ? className.trim() : ''}`;
}

const createClassName = (defaultClassName = '', mapping = [], removeProp = true) => {
  
  return ( props = {} ) => {

    const getClassName = (verifier, className) => {
      if(removeProp) delete props[verifier];
      return (typeof className === 'function') ? className(props) : className;
    }
  
    if(typeof defaultClassName != 'string' || typeof props != 'object' || !Array.isArray(mapping))
      throw new Error('TypeError: invalid arguments types');
  
    defaultClassName = getDefaultClassName(defaultClassName, props);
    return mapping.reduce((previous, current, index) => {
      if(typeof current.verifier === 'string' && props[current.verifier]){
        return `${previous} ${getClassName(current.verifier, current.className)}`;
      } else if(typeof current.verifier === 'function' && current.verifier(props) === true) {
        return `${previous} ${getClassName(current.verifier(props), current.className)}`;
      }
  
      return previous;
    }, defaultClassName);

  }

}

module.exports = {
  createClassName,
  getDefaultClassName
};