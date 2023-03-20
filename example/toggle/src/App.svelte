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