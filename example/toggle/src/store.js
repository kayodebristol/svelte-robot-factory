import { createMachine, state, transition, reduce } from 'robot3';
import { useMachine } from 'svelte-robot-factory';
const context = event => ({
	foo: event.foo
});
const event = {
	foo: 'initial'
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