import { json, urlencoded } from 'body-parser';
import logger from 'morgan';
import router from '../routes';
import swagRouter from '../docs/swagger';

const baseUrl = (req) => {
  let newUrl = `${req.protocol}://${req.get('host')}/api/v1`;
  return newUrl;
}

export default class AppConfig {
  configure(app) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));
    //app.use(express.static(path.join(__dirname, 'UI')));
    // app.use( (res, req, next) => {
    //   baseUrl(req);
    //   next();
    // });
    app.use('/api/v1', router);
    app.use('/api/v1', swagRouter);
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        meessage: 'Resource not found.',
        possibleCauses: [
          'Maybe you entered the url wrong',
        ],
        solution: [
          'use /api/v1 as the base path url for this app.',
          'Check that the address you entered is correct.',
        ],
      });
    });
  }
}
