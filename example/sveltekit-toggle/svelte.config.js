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
