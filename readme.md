# svelte robot factory 

## example

[view in REPL](https://svelte.dev/repl/a9904c210b474bd2ab71d9b7c26c4c38?version=3.12.1)
```js
<!--
  example integration with https://thisrobot.life
	supports send, context, and machine (to include machine.current & machine.state)
-->

<script>
	import service from './store.js';
	import Child from './Child.svelte'
	const send = $service.send;
	$: current = $service.machine.current
</script>

<div>Current state value: {current}</div>
<Child/>

<button on:click={() => send('toggle')}>
	Toggle
</button>
```

```js
/// store
import { createMachine, state, transition, invoke, reduce } from 'robot3';
import { useMachine } from '@kayodebristol/svelte-robot-factory';
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

const service = useMachine(machine, event);
export default service;
```

```js
/// Child.svelte
<script>
import service from './store.js';
$: foo = $service.context.foo;
</script>

<div>Context value of foo property: {foo}</div>
```

