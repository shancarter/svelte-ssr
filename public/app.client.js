(function () {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function children (element) {
	return Array.from(element.childNodes);
}

function claimElement (nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText (nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

/* src/Child.html generated by Svelte v1.49.1 */
function data$1() {
  return {
    count: 0
  }
}

var methods = {
  change: function() {
    let c = this.get('count') + 1;
    this.set({count: c});
  }
};

function create_main_fragment$1(state, component) {
	var h2, text, text_1, table, text_3, button, text_4, text_5, span, text_6;

	var each_value = [0, 2, 4];

	var each_blocks = [];

	for (var i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(state, each_value, each_value[i], i, component);
	}

	function click_handler(event) {
		component.change();
	}

	return {
		c: function create() {
			h2 = createElement("h2");
			text = createText("Child Component");
			text_1 = createText("\n");
			table = createElement("table");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text_3 = createText("\n");
			button = createElement("button");
			text_4 = createText("+");
			text_5 = createText("\n");
			span = createElement("span");
			text_6 = createText(state.count);
			this.h();
		},

		l: function claim(nodes) {
			h2 = claimElement(nodes, "H2", {}, false);
			var h2_nodes = children(h2);

			text = claimText(h2_nodes, "Child Component");
			h2_nodes.forEach(detachNode);
			text_1 = claimText(nodes, "\n");

			table = claimElement(nodes, "TABLE", {}, false);
			var table_nodes = children(table);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(table_nodes);
			}

			table_nodes.forEach(detachNode);
			text_3 = claimText(nodes, "\n");

			button = claimElement(nodes, "BUTTON", {}, false);
			var button_nodes = children(button);

			text_4 = claimText(button_nodes, "+");
			button_nodes.forEach(detachNode);
			text_5 = claimText(nodes, "\n");

			span = claimElement(nodes, "SPAN", {}, false);
			var span_nodes = children(span);

			text_6 = claimText(span_nodes, state.count);
			span_nodes.forEach(detachNode);
			this.h();
		},

		h: function hydrate() {
			addListener(button, "click", click_handler);
		},

		m: function mount(target, anchor) {
			insertNode(h2, target, anchor);
			appendNode(text, h2);
			insertNode(text_1, target, anchor);
			insertNode(table, target, anchor);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(table, null);
			}

			insertNode(text_3, target, anchor);
			insertNode(button, target, anchor);
			appendNode(text_4, button);
			insertNode(text_5, target, anchor);
			insertNode(span, target, anchor);
			appendNode(text_6, span);
		},

		p: function update(changed, state) {
			if (changed.count) {
				text_6.data = state.count;
			}
		},

		u: function unmount() {
			detachNode(h2);
			detachNode(text_1);
			detachNode(table);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			detachNode(text_3);
			detachNode(button);
			detachNode(text_5);
			detachNode(span);
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);

			removeListener(button, "click", click_handler);
		}
	};
}

// (3:2) {{#each [0, 2, 4] as value}}
function create_each_block(state, each_value, value, value_index, component) {
	var tr, th, text, td, text_1_value = value, text_1;

	return {
		c: function create() {
			tr = createElement("tr");
			th = createElement("th");
			text = createText("Number: ");
			td = createElement("td");
			text_1 = createText(text_1_value);
		},

		l: function claim(nodes) {
			tr = claimElement(nodes, "TR", {}, false);
			var tr_nodes = children(tr);

			th = claimElement(tr_nodes, "TH", {}, false);
			var th_nodes = children(th);

			text = claimText(th_nodes, "Number: ");
			th_nodes.forEach(detachNode);

			td = claimElement(tr_nodes, "TD", {}, false);
			var td_nodes = children(td);

			text_1 = claimText(td_nodes, text_1_value);
			td_nodes.forEach(detachNode);
			tr_nodes.forEach(detachNode);
		},

		m: function mount(target, anchor) {
			insertNode(tr, target, anchor);
			appendNode(th, tr);
			appendNode(text, th);
			appendNode(td, tr);
			appendNode(text_1, td);
		},

		u: function unmount() {
			detachNode(tr);
		},

		d: noop
	};
}

function Child(options) {
	init(this, options);
	this._state = assign(data$1(), options.data);

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		var nodes = children(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(detachNode);
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Child.prototype, methods, proto);

/* src/App.html generated by Svelte v1.49.1 */
function data() {
	return {
		message: "SSR"
	}
}

function oncreate() {
	console.log("App.html");
}

function encapsulateStyles(node) {
	setAttribute(node, "svelte-617180641", "");
}

function create_main_fragment(state, component) {
	var h1, text, text_1, text_2, text_3, p, text_4, text_5, text_6, p_1, text_7, text_8, p_2, text_9, text_10, p_3, text_11, text_12, p_4, text_13, text_14, text_15, p_5, text_16, text_17, p_6, text_18, text_19, p_7, text_20, text_21, text_22, p_8, text_23, text_24, p_9, text_25, text_26, p_10, text_27;

	var child = new Child({
		root: component.root
	});

	var child_1 = new Child({
		root: component.root
	});

	var child_2 = new Child({
		root: component.root
	});

	return {
		c: function create() {
			h1 = createElement("h1");
			text = createText("Hello ");
			text_1 = createText(state.message);
			text_2 = createText("!");
			text_3 = createText("\n");
			p = createElement("p");
			text_4 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_5 = createText("\n");
			child._fragment.c();
			text_6 = createText("\n");
			p_1 = createElement("p");
			text_7 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_8 = createText("\n");
			p_2 = createElement("p");
			text_9 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_10 = createText("\n");
			p_3 = createElement("p");
			text_11 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_12 = createText("\n");
			p_4 = createElement("p");
			text_13 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_14 = createText("\n");
			child_1._fragment.c();
			text_15 = createText("\n");
			p_5 = createElement("p");
			text_16 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_17 = createText("\n");
			p_6 = createElement("p");
			text_18 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_19 = createText("\n");
			p_7 = createElement("p");
			text_20 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_21 = createText("\n");
			child_2._fragment.c();
			text_22 = createText("\n");
			p_8 = createElement("p");
			text_23 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_24 = createText("\n");
			p_9 = createElement("p");
			text_25 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			text_26 = createText("\n");
			p_10 = createElement("p");
			text_27 = createText("This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			this.h();
		},

		l: function claim(nodes) {
			h1 = claimElement(nodes, "H1", {}, false);
			var h1_nodes = children(h1);

			text = claimText(h1_nodes, "Hello ");
			text_1 = claimText(h1_nodes, state.message);
			text_2 = claimText(h1_nodes, "!");
			h1_nodes.forEach(detachNode);
			text_3 = claimText(nodes, "\n");

			p = claimElement(nodes, "P", {}, false);
			var p_nodes = children(p);

			text_4 = claimText(p_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_nodes.forEach(detachNode);
			text_5 = claimText(nodes, "\n");
			child._fragment.l(nodes);
			text_6 = claimText(nodes, "\n");

			p_1 = claimElement(nodes, "P", {}, false);
			var p_1_nodes = children(p_1);

			text_7 = claimText(p_1_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_1_nodes.forEach(detachNode);
			text_8 = claimText(nodes, "\n");

			p_2 = claimElement(nodes, "P", {}, false);
			var p_2_nodes = children(p_2);

			text_9 = claimText(p_2_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_2_nodes.forEach(detachNode);
			text_10 = claimText(nodes, "\n");

			p_3 = claimElement(nodes, "P", {}, false);
			var p_3_nodes = children(p_3);

			text_11 = claimText(p_3_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_3_nodes.forEach(detachNode);
			text_12 = claimText(nodes, "\n");

			p_4 = claimElement(nodes, "P", {}, false);
			var p_4_nodes = children(p_4);

			text_13 = claimText(p_4_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_4_nodes.forEach(detachNode);
			text_14 = claimText(nodes, "\n");
			child_1._fragment.l(nodes);
			text_15 = claimText(nodes, "\n");

			p_5 = claimElement(nodes, "P", {}, false);
			var p_5_nodes = children(p_5);

			text_16 = claimText(p_5_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_5_nodes.forEach(detachNode);
			text_17 = claimText(nodes, "\n");

			p_6 = claimElement(nodes, "P", {}, false);
			var p_6_nodes = children(p_6);

			text_18 = claimText(p_6_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_6_nodes.forEach(detachNode);
			text_19 = claimText(nodes, "\n");

			p_7 = claimElement(nodes, "P", {}, false);
			var p_7_nodes = children(p_7);

			text_20 = claimText(p_7_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_7_nodes.forEach(detachNode);
			text_21 = claimText(nodes, "\n");
			child_2._fragment.l(nodes);
			text_22 = claimText(nodes, "\n");

			p_8 = claimElement(nodes, "P", {}, false);
			var p_8_nodes = children(p_8);

			text_23 = claimText(p_8_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_8_nodes.forEach(detachNode);
			text_24 = claimText(nodes, "\n");

			p_9 = claimElement(nodes, "P", {}, false);
			var p_9_nodes = children(p_9);

			text_25 = claimText(p_9_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_9_nodes.forEach(detachNode);
			text_26 = claimText(nodes, "\n");

			p_10 = claimElement(nodes, "P", {}, false);
			var p_10_nodes = children(p_10);

			text_27 = claimText(p_10_nodes, "This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs. This could have long paragraphs.");
			p_10_nodes.forEach(detachNode);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(h1);
		},

		m: function mount(target, anchor) {
			insertNode(h1, target, anchor);
			appendNode(text, h1);
			appendNode(text_1, h1);
			appendNode(text_2, h1);
			insertNode(text_3, target, anchor);
			insertNode(p, target, anchor);
			appendNode(text_4, p);
			insertNode(text_5, target, anchor);
			child._mount(target, anchor);
			insertNode(text_6, target, anchor);
			insertNode(p_1, target, anchor);
			appendNode(text_7, p_1);
			insertNode(text_8, target, anchor);
			insertNode(p_2, target, anchor);
			appendNode(text_9, p_2);
			insertNode(text_10, target, anchor);
			insertNode(p_3, target, anchor);
			appendNode(text_11, p_3);
			insertNode(text_12, target, anchor);
			insertNode(p_4, target, anchor);
			appendNode(text_13, p_4);
			insertNode(text_14, target, anchor);
			child_1._mount(target, anchor);
			insertNode(text_15, target, anchor);
			insertNode(p_5, target, anchor);
			appendNode(text_16, p_5);
			insertNode(text_17, target, anchor);
			insertNode(p_6, target, anchor);
			appendNode(text_18, p_6);
			insertNode(text_19, target, anchor);
			insertNode(p_7, target, anchor);
			appendNode(text_20, p_7);
			insertNode(text_21, target, anchor);
			child_2._mount(target, anchor);
			insertNode(text_22, target, anchor);
			insertNode(p_8, target, anchor);
			appendNode(text_23, p_8);
			insertNode(text_24, target, anchor);
			insertNode(p_9, target, anchor);
			appendNode(text_25, p_9);
			insertNode(text_26, target, anchor);
			insertNode(p_10, target, anchor);
			appendNode(text_27, p_10);
		},

		p: function update(changed, state) {
			if (changed.message) {
				text_1.data = state.message;
			}
		},

		u: function unmount() {
			detachNode(h1);
			detachNode(text_3);
			detachNode(p);
			detachNode(text_5);
			child._unmount();
			detachNode(text_6);
			detachNode(p_1);
			detachNode(text_8);
			detachNode(p_2);
			detachNode(text_10);
			detachNode(p_3);
			detachNode(text_12);
			detachNode(p_4);
			detachNode(text_14);
			child_1._unmount();
			detachNode(text_15);
			detachNode(p_5);
			detachNode(text_17);
			detachNode(p_6);
			detachNode(text_19);
			detachNode(p_7);
			detachNode(text_21);
			child_2._unmount();
			detachNode(text_22);
			detachNode(p_8);
			detachNode(text_24);
			detachNode(p_9);
			detachNode(text_26);
			detachNode(p_10);
		},

		d: function destroy$$1() {
			child.destroy(false);
			child_1.destroy(false);
			child_2.destroy(false);
		}
	};
}

function App(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options.root) {
		this._oncreate = [_oncreate];
		this._beforecreate = [];
		this._aftercreate = [];
	} else {
	 	this.root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		var nodes = children(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(detachNode);
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(App.prototype, proto);

const button = document.getElementById('hydrate');
button.addEventListener('click', function() {
	window.app = new App({
		target: document.querySelector('#app'),
		hydrate: true,
		data: {
			message: 'Hydrated'
		}
	});
});

}());
//# sourceMappingURL=app.client.js.map
