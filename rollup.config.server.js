import svelte from 'rollup-plugin-svelte';

export default {
  input: 'src/App.html',
  output: {
    file: 'public/app.server.js',
    format: 'cjs'
  },
	plugins: [
		svelte({
      generate: 'ssr',
      cascade: false
		})
	]
};