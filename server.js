'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('dogmeetdog:server');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const errors = require('./lib/error-middleware.js');

const authRouter = require('./route/auth-router.js');
const profileRouter = require('./route/profile-router.js');

dotenv.load();

const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(authRouter);
app.use(profileRouter);
app.use(errors);

app.listen((process.env.PORT || 8000), () => debug('sever up'));