/**
|--------------------------------------------------
|  CreateClassName
|--------------------------------------------------
*/

const getDefaultClassName = (defaultClassName, { className }) => {
  return `${defaultClassName.trim()} ${className ? className.trim() : ''}`;
}

const createClassName = ({ className = '', props = [], keepComponentProps = false }) => {
  
  return ( componentProps = {} ) => {

    const getClassName = (name, className) => {
      if(!keepComponentProps) delete componentProps[name];
      return (typeof className === 'function') ? className(componentProps) : className;
    }
  
    if(typeof className != 'string' || typeof componentProps != 'object' || !Array.isArray(props))
      throw new Error('TypeError: invalid arguments types');
  
    className = getDefaultClassName(className, componentProps);
    return props.reduce((previous, current, index) => {
      if(typeof current.name === 'string' && componentProps[current.name]){
        return `${previous} ${getClassName(current.name, current.className)}`;
      } else if(typeof current.name === 'function' && current.name(componentProps) === true) {
        return `${previous} ${getClassName(current.name(componentProps), current.className)}`;
      }
  
      return previous;
    }, className);

  }

}

module.exports = {
  createClassName,
  getDefaultClassName
};