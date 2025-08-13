import app from './app.js';
import { PORT } from './config.js';

/*** START SERVER ***/
app.listen(PORT);
console.log('Server is running on port', PORT);
