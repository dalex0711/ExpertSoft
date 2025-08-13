import express from 'express';
import cors from 'cors';
import loadCvs from './routes/uploadCsc.routes.js'
import customerRoutes from './routes/customer.routes.js'
import advances_queries from './routes/advanced_queries.routes.js'

const app = express();


app.use(cors());
app.use(express.json());
// Middleware to accept plain text CSV
app.use(express.text({ type: 'text/csv' }));


/**METODO */
app.use(customerRoutes)
app.use(advances_queries)
app.use(loadCvs)
app.use((req,res,next) => {
    res.status(404).json({
        message : 'enpoint not found'
    })
})

export default app;
