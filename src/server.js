import express from 'express'
import 'dotenv/config'
import connectToDb from './config/db.js';
import authRoute from './routes/auth/auth.js';
import infoMiddleware from './middlewares/infoMiddleware.js';
import adminRoutes from './routes/auth/adminRoutes.js'
import userRoutes from './routes/auth/userRoutes.js'
import authUpdateRoutes from './routes/auth/update.js'
import urlRoutes from './routes/url_shortner/urlRoutes.js';

import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 8002

const app = express();
app.use(infoMiddleware);
connectToDb();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/health', (req, res) => {
    return res.status(304).json({
        success: true,
        message: 'SERVER IS LIVE and healhty'
    })
})

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/update', authUpdateRoutes);
app.use('/api/v1/url', urlRoutes);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING  ON  ${PORT}`)
})