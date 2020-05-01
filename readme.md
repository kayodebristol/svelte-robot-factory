# svelte robot factory 

## example

[view in REPL](https://svelte.dev/repl/a9904c210b474bd2ab71d9b7c26c4c38?version=3.12.1)
```js
<!--
	App.svelte
  example integration with https://thisrobot.life
	supports send, context, and machine (to include machine.current & machine.state)
-->

<script>
	import { createMachine, state, transition, invoke, reduce } from 'robot3';
	import { useMachine } from './svelte-robot.js';
	const context = event => ({
  	foo: event.foo
	});
	const event = {
  	foo: 'foo'
	};
	const machine = createMachine({
		inactive: state(
				transition('toggle', 'active', 
					reduce((ctx, ev)=>({ ...ctx, foo: 'bar'}))
				)
		),
		active: state(
				transition('toggle', 'inactive', 
					reduce((ctx, ev)=>({ ...ctx, foo: 'foo'}))
				)
		)
	}, context);
	
	const [service] = useMachine(machine, event);
	
	
</script>

<div>Current state value: {$service.machine.current}</div>
<div>Context value of foo property: {$service.context.foo}</div>

<button on:click={() => $service.send('toggle')}>
	Toggle
</button>
```

```js
<!--
	svelte-robot-factory.js
-->
import { writable } from 'svelte/store';
import { interpret } from 'robot3';

export function useMachine(machine, event) {
    
    const {subscribe, set} = writable(
        interpret(machine, service => set(service), event)
    )
    return [{subscribe}]
}
```


