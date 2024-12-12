const debug = require('debug')('app:start')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
const logger = require('./middleware/logging')
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express');
const app = express();


//view engine or templating engine
app.set('view engine', 'pug');
app.set('views', './views')
app.use('/api/courses', courses)
app.use('/', home)
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
app.use(helmet())

//configuraton
console.log('application Name: ' + config.get('name'))
console.log('mail Name: ' + config.get('mail.host'))
console.log('password: ' + config.get('mail.password')) // we use script to se a password, paste this on terminal  ( $env:app_password="12345")
  
if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    debug("morgan enabled..")
}

app.use(logger)




// Port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
