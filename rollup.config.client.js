import svelte from 'rollup-plugin-svelte';

export default {
	input: 'src/app.js',
	output: {
    file: 'public/app.client.js',
		format: 'iife',
		name: 'App',
		sourcemap: true
  },
	plugins: [
		svelte({
			hydratable: true,
			css: false,
			cascade: false
		})
	]
};