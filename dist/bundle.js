(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.createClassName = {})));
}(this, (function (exports) { 'use strict';

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
};
// { className = '', props = [], keepComponentProps = false }

const createClassName = (foo = '', foo2 = [], foo3 = false) => {
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
    };

    const destructingString = (n) => {
      const [name, className, overrideDefault] = n.split(':');
      if(!name) throw new Error('TypeError: format props invalid');  
      console.log(overrideDefault == 'override');
      return  { name, className: className ? className : name, overrideDefault: (overrideDefault == 'override') };
    };
  
    if(typeof className != 'string' || typeof componentProps != 'object' || !Array.isArray(props))
      throw new Error('TypeError: invalid arguments types');
  
    let classN = props.reduce((previous, current, index) => {
      if(typeof current === 'string') 
        current = destructingString(current);
      
      if(!overrideDefault) {
        console.log('if',current.overrideDefault);
        overrideDefault = (current.overrideDefault === true);
        console.log('if 2',overrideDefault);
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

};

exports.createClassName = createClassName;

Object.defineProperty(exports, '__esModule', { value: true });

})));
