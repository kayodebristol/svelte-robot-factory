<script>
import service from './store.js';
$: foo = $service.context.foo;
</script>

<div>Context value of foo property: {foo}</div>