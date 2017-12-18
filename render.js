const path = require('path');
const fs = require('fs');

const app = require('./public/app.server.js');
const template = fs.readFileSync(path.join(__dirname, 'src/index.html'), 'utf8');

const rendered = app.render({});
console.log(rendered);
const {html, css} = rendered;
const output = template.replace('/* CSS */', css.code).replace('<!-- HTML -->', html);

fs.writeFileSync(path.join(__dirname, 'public/index.html'), output, 'utf8')