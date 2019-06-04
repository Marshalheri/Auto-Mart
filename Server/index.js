import express from 'express';
import AppConfig from './config/appConfig';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const appConfig = new AppConfig();
appConfig.configure(app);

// This is where i use express to serve my html files in the UI folder.....
app.use(express.static(path.join(__dirname, 'UI')));


app.listen(3000, () => { console.log(`listening on port: ${PORT}`); });


export default app;
