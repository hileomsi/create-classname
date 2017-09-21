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

  return `${defaultClassName.trim()} ${className}`.trim();
}

const hasProps = (name, props) => {
  let attribute = name;
  if(typeof name == 'function')
    attribute = name();
  
  if(typeof attribute == 'boolean')
    return attribute;
  
  return props[attribute];
}
// { className = '', props = [], keepComponentProps = false }

export const createClassName = (foo = '', foo2 = [], foo3 = false) => {
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
    const immutableProps = Object.assign({}, componentProps);
    let overrideDefault = false;

    const getClassName = (name, className) => {
      if(!componentProps[name]) return '';
      if(!className) className = name;
      if(!keepComponentProps) delete componentProps[name];

      return (typeof className === 'function') ? className(immutableProps) : className;
    }

    const destructingString = (n) => {
      const [name, className, overrideDefault] = n.split(':');
      if(!name) throw new Error('TypeError: format props invalid');  
      
      return  { name, className: className ? className : name, overrideDefault: (overrideDefault == 'override') };
    }
  
    if(typeof className != 'string' || typeof componentProps != 'object' || !Array.isArray(props))
      throw new Error('TypeError: invalid arguments types');
  
    let classN = props.reduce((previous, current, index) => {
      if(typeof current === 'string') 
        current = destructingString(current);
      
      if(!overrideDefault && hasProps(current.name, immutableProps)) {
        overrideDefault = (current.overrideDefault === true);
      }

      if(typeof current.name === 'string' && componentProps[current.name]) {
        return `${previous} ${getClassName(current.name, current.className)}`;
      } else if(typeof current.name === 'function' && current.name(immutableProps) === true) {
        return `${previous} ${getClassName(current.name(immutableProps), current.className)}`;
      }
  
      return previous;
    }, '');

    if(!overrideDefault) classN = `${className} ${classN}`;

    return getDefaultClassName(classN, componentProps);
  }

}

export default createClassName;
