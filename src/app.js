import App from './App.html';
setTimeout(() => {
	window.app = new App({
		target: document.querySelector('#app'),
		hydrate: true
	});
}, 1500);
