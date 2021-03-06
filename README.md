# createClassName 
🎈 - Create className based on an object's conditions. 

[![NPM version](https://badge.fury.io/js/create-classname.png)](http://badge.fury.io/js/create-classname)

[![Npm Downloads](https://nodei.co/npm/create-classname.png?downloads=true&stars=true)](https://nodei.co/npm/create-classname.png?downloads=true&stars=true)

### Installation

Install the dependencies.

```sh
$ npm i --save create-classname
ou
$ yarn add create-classname
```

### Definition

```js
    createClassName(defaultClassName, data | props, mapping);
```

- defaultClassName: *string*
- data | props: *object*
- mapping: *array*
    -  verifier: *string* | *function*
    -  className: *string* | *function*

### Example

```js
//App.jsx
	ReactDOM.render(
		<MyButton 
			active
			color='blue'
			icon={<Icon name="facebook"/>}
			outline
			raised={false}
		>
			Click Me!
		</MyButton>,
		document.getElementById('root')
	);
```

```js
//MyButton.jsx
import { createClassName } from 'create-classname';

export default class MyButton extends Component {
	constructor(props) {
		super();
		
		const mapping = [
			{ verifier: 'active', className: 'active' },
			{ verifier: 'color' , className: (p) => `color-${p.color}` },
			{ verifier: (p) =>  p.icon && p.outline, className: 'button-icon-outline' },
			{ verifier: (p) => p.raised, className: 'button-raised' },
			{ verifier: 'round', className: 'button-round' }
		];
		
		const className = createClassName('button', props, mapping);
		//className => "button active color-blue button-icon-outline"

		this.state = { className: className };
	}
	
	render() {
		return (<button className={this.state.className}></button>)
	}
}
```

License
----
ISC
