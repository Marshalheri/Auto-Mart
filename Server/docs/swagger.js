import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerDoc from '../../swagger.json';

const swagRouter = Router();

swagRouter.use('/api-docs', serve, setup(swaggerDoc));

export default swagRouter;
