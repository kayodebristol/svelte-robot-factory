
<!--
  example integration with https://thisrobot.life
	supports send, context, and machine (to include machine.current & machine.state)
-->

<script>
	import service from '../store';
	import Child from '../Child.svelte';
	const send = $service.send;
	$: current = $service.machine.current
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<div>Current state value: {current}</div>
<Child/>

<button on:click={() => send('toggle')}>
	Toggle
</button>