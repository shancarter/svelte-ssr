import App from './App.html';

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
