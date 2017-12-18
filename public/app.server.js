'use strict';

function data$1() {
  return {
    count: 0
  }
}

var Child = {};

Child.filename = "/Users/shancarter/experiments/svelte-ssr/src/Child.html";

Child.data = function() {
	return data$1();
};

Child.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Child._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
};

Child._render = function(__result, state, options) {
	__result.addComponent(Child);

	state = Object.assign(data$1(), state);

	return `<h2>Child Component</h2>
<table>
  ${ [0, 2, 4].map(value => `<tr><th>Number: </th><td>${__escape$1(value)}</td></tr>`).join("")}
</table>
<button>+</button>
<span>${__escape$1(state.count)}</span>`;
};

Child.css = {
	code: '',
	map: null
};

var warned$1 = false;
Child.renderCss = function() {
	if (!warned$1) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned$1 = true;
	}

	var components = [];

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped$1 = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape$1(html) {
	return String(html).replace(/["'&<>]/g, match => escaped$1[match]);
}

function data() {
	return {
		message: "SSR"
	}
}

var App = {};

App.filename = "/Users/shancarter/experiments/svelte-ssr/src/App.html";

App.data = function() {
	return data();
};

App.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = App._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return result.html;
		}
	};
};

App._render = function(__result, state, options) {
	__result.addComponent(App);

	state = Object.assign(data(), state);

	return `<h1 svelte-617180641>Hello ${__escape(state.message)}!</h1>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
${Child._render(__result, {})}
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
${Child._render(__result, {})}
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
${Child._render(__result, {})}
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>
<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>`;
};

App.css = {
	code: "h1[svelte-617180641]{color:purple}",
	map: "{\"version\":3,\"file\":\"App.html\",\"sources\":[\"App.html\"],\"sourcesContent\":[\"<h1>Hello {{message}}!</h1>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<Child/>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<Child/>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<Child/>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n<p>This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. </p>\\n\\n<script>\\n\\timport Child from './Child.html';\\n\\n\\texport default {\\n\\t\\tcomponents: {\\n\\t\\t\\tChild\\n\\t\\t},\\n\\t\\tdata() {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tmessage: \\\"SSR\\\"\\n\\t\\t\\t}\\n\\t\\t},\\n\\t\\toncreate() {\\n\\t\\t\\tconsole.log(\\\"App.html\\\")\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<style>\\n\\th1 {\\n\\t\\tcolor: purple;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAmCC,EAAE,kBAAC,CAAC,AACH,KAAK,CAAE,MAAM,AACd,CAAC\"}"
};

var warned = false;
App.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: App.filename,
		css: App.css && App.css.code,
		map: App.css && App.css.map
	});

	var seen = {};

	function addComponent(component) {
		var result = component.renderCss();
		result.components.forEach(x => {
			if (seen[x.filename]) return;
			seen[x.filename] = true;
			components.push(x);
		});
	}

	addComponent(Child);

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}

module.exports = App;
