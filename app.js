// hello sanghun!
// const WebpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');

const express = require('express');
const cors = require('cors');
// const http = require('http');

const path = require('path');

// const config = require('./config/config');
const multer = require('multer');
const morgan = require('morgan'); // express 서버에서 발생하는 이벤트들을 기록

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');

const api = require('./routes/index');

// ---------------------LOAD THE CONFIG---------------------------
const config = require('./config/config')
const port = process.env.PORT || 4000;

// ---------------------express server---------------------------
const app = express();

app.use(cors());
// ------------- 서버 변수 설정 및 static으로 public 폴더 설정  ----------- //

// app.set('port', config.server_port);
app.use('../client/client-side/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --------------------print the request log on console---------------- //
app.use(morgan('dev'));

// --------------------set the secret key variable for jwt---------------- //
app.set('jwt-secret', config.secret);

// ---------------------mongodb connection----------------------------- //
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mogod server'); });

// ---------------------use session----------------------------- //
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
// }));

// ---------------------use imagme----------------------------- //
// app.use(multer({
//   dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
// }));


// ---------------------router setting----------------------------- //
app.use('/api', api);

// ---------------------server setting----------------------------- //
// const server = http.createServer(app).listen(process.env.PORT || app.get('port'), () => {
//   console.log('Express is listening on port', app.get('port'));
// });

// ---------------------handle error----------------------------- //
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ---------------------start server----------------------------- //
app.listen(port, () => {
  console.log('Express is listening on port', port);
});
