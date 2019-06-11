import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import router from '../routes';
import swagRouter from '../docs/swagger';

export default class AppConfig {
  configure(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.use('/api/v1', router);
    app.use('/api/v1', swagRouter)
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        meessage: 'Resource not found.',
        possibleCauses: [
          'Maybe you entered the url wrong',
        ],
        solution: [
          'use /api/v1 as the base url for this app.',
          'Check that the address you entered is correct.'
        ],
      });
    });
  }
}
