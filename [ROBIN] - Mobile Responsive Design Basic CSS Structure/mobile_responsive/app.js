const express = require('express');
const app = express();
const path = require('path');
const port = 9000;

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index', { title: 'Mobile Responsive'});
});

app.listen(port, () => {
	console.log('listening to port '+port);		
});