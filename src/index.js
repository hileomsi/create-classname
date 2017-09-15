/**
|--------------------------------------------------
|  CreateClassName
|--------------------------------------------------
*/

const getDefaultClassName = (defaultClassName, componentProps) => {
  let className = '';
  if(componentProps.className){
    className = componentProps.className;
    delete componentProps.className;
  }

  return `${defaultClassName.trim()} ${className}`;
}
// { className = '', props = [], keepComponentProps = false }
const createClassName = (foo, foo2, foo3) => {
  let className = '', props = [], keepComponentProps = false;
  if(typeof foo === 'string'){
    className = foo;
    props = foo2;
    keepComponentProps = foo3;
  } else {
    className = foo.className;
    props = foo.props;
    keepComponentProps = foo.keepComponentProps;
  }
  
  return ( componentProps = {} ) => {

    const getClassName = (name, className) => {
      if(!className) className = name;
      if(!keepComponentProps) delete componentProps[name];

      return (typeof className === 'function') ? className(componentProps) : className;
    }

    const destructingString = (n) => {
      const [name, className] = n.split(':');
      if(!name) throw new Error('TypeError: format props invalid');  

      return  { name, className: className ? className : name };
    }
  
    if(typeof className != 'string' || typeof componentProps != 'object' || !Array.isArray(props))
      throw new Error('TypeError: invalid arguments types');
  
    className = props.reduce((previous, current, index) => {
      if(typeof current === 'string'){
        current = destructingString(current);
        return `${previous} ${getClassName(current.name, current.className)}`;
      } else if(typeof current.name === 'string' && componentProps[current.name]){
        return `${previous} ${getClassName(current.name, current.className)}`;
      } else if(typeof current.name === 'function' && current.name(componentProps) === true) {
        return `${previous} ${getClassName(current.name(componentProps), current.className)}`;
      }
  
      return previous;
    }, className);

    return getDefaultClassName(className, componentProps);
  }

}

module.exports = {
  createClassName
};