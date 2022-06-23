const session = require('express-session')
const MongoStore = require('connect-mongo');

module.exports = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/admin' })
})
