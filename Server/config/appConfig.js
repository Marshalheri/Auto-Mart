import express from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import router from '../routes';
import swagRouter from '../docs/swagger';

const errorMsg = {
  success: false,
  meessage: 'Resource not found.',
  possibleCauses: [
    'Maybe you entered the url wrong',
  ],
  solution: [
    'use /api/v1 as the base path url for the APIs of this app.',
    'use /UI as the base path url for the UI of this app.',
    'Check that the address you entered is correct.',
  ],
};

const welcomeMsg ={
  success: true,
  message: [
    'Welcome to AutoMart server.',
    'use /api/v1 as the base path url for the APIs of this app.',
    'use /UI as the base path url for the UI of this app.',
  ]
}

export default class AppConfig {
  configure(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));

    app.all('/', (req, res) => {
      res.status(200).json(welcomeMsg);
    });

    // This is where i serve the APIs routes......
    app.use('/api/v1', router);
    app.use('/api/v1', swagRouter);

    // This is where i use express to serve my html files in the UI folder.....
    app.use(express.static(path.join(__dirname, '../../UI')));
    app.all('/UI', (req, res) => {
      res.sendFile(path.join(__dirname, '../../UI/index.html'));
    });

    app.use('*', (req, res) => {
      res.status(404).json(errorMsg);
    });


  }
}
