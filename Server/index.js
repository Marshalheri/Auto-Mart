import express from 'express';
import path from 'path';
// import loginApi from './Controller/apiv1/loginApi';
// import signupApi from './Controller/apiv1/signupApi';
// import dashboardApi from './Controller/apiv1/dashboardApi';

const app = express();

const PORT = process.env.PORT || 3000;

// This is where i use express to serve my html files in the UI folder.....
app.use(express.static(path.join(__dirname, 'UI')));

// app.use('/api/v1', loginApi);
// app.use('/api/v1', signupApi);
// app.use('/api/v1', dashboardApi);


app.listen(3000, () => { console.log(`listening on port: ${PORT}`); });


export default app;
