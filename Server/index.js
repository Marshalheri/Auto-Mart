import express from 'express';
import AppConfig from './config/appConfig';

const app = express();
const PORT = process.env.PORT || 3000;
const appConfig = new AppConfig();
appConfig.configure(app);

app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });


export default app;
