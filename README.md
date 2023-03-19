---
layout: page.njk
title: svelte-robot-factory
tags: integrations
permalink: integrations/svelte-robot-factory.html
---

[![Node.js Package](https://github.com/kayodebristol/svelte-robot-factory/actions/workflows/npm-publish.yml/badge.svg?branch=2.0.0)](https://github.com/kayodebristol/svelte-robot-factory/actions/workflows/npm-publish.yml)

# svelte-robot-factory

Table of Contents

- [svelte-robot-factory](#svelte-robot-factory)
  - [Installation](#installation)
  - [API](#api)
  - [Example](#example)
  - [Sveltekit](#sveltekit)
- [This workflow will run tests using node and then publish a package to GitHub Packages when a release is created](#this-workflow-will-run-tests-using-node-and-then-publish-a-package-to-github-packages-when-a-release-is-created)
- [For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages](#for-more-information-see-httpsdocsgithubcomenactionspublishing-packagespublishing-nodejs-packages)
  - [License](#license)

The svelte-robot-factory returns a svelte writable store which implements a robot machine service.

## Installation

npm:

```bash
npm install svelte-robot-factory robot3 --save
```

yarn:

```bash
yarn add svelte-robot-factory robot3
```

## API

```javascript
useMachine(machine, event);
```

Arguments:

- [machine](https://thisrobot.life/api/interpret.html#machine): Robot state machine
- [event](https://thisrobot.life/api/interpret.html#event): Object which will be passed to the [context function](https://thisrobot.life/api/createMachine.html#context)

Returns:

- [Writable svelte store](https://svelte.dev/docs#writable) which implements a robot [service](https://thisrobot.life/api/interpret.html#service) on subscribe

```javascript
function useMachine(machine, event)
    const {subscribe, set} = writable(
        interpret(machine, service => set(service), event)
    )
    return {subscribe}
}
```

Explaination:
This code exports a function named useMachine that takes in two arguments: machine and event. It uses the Machine and interpret functions imported from the robot3 library, and the writable function imported from the svelte/store library.
When useMachine is called, it creates a Svelte store by calling the writable function, passing in the result of invoking interpret on the machine and event arguments. interpret creates an instance of a state machine and provides a callback function that updates the Svelte store with the new state returned by the instance.
The function returns an object with a subscribe method that allows components to subscribe to changes in the store. Whenever a component subscribes to the store, it will be notified with the current state and any future state changes.

## Example

[View in REPL](https://svelte.dev/repl/a9904c210b474bd2ab71d9b7c26c4c38?version=3.12.1)

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
/// Child.svelte
<script>
  import service from './store.js';
  $: foo = $service.context.foo;
</script>

<div>Context value of foo property: {foo}</div>
```

```js
/// store
import { createMachine, state, transition, invoke, reduce } from 'robot3';
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
```
## Sveltekit

Due to a [known issue with vite handling of commonjs modules](https://github.com/sveltejs/kit/issues/928), when used with sveltekit, add prebundleSvelteLibraries: true, to your svelte.config.js.

For example, [svelte.config.js]

```javascript
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	experimental: {
		prebundleSvelteLibraries: true
	},
	kit: {
		adapter: adapter()
	}
};

export default config;
```
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages
name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Use Node.js ${{ matrix.node-version }}
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm run build
      - run: npm test


  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Use Node.js ${{ matrix.node-version }}
        with:
          node-version: ${{ matrix.node-version }}
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}

Or, reference the [sveltekit-toggle](https://github.com/kayodebristol/svelte-robot-factory/tree/master/example/sveltekit-toggle) example.
## License

**[MIT](https://opensource.org/licenses/MIT)**
