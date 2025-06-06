import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth_routes';
import connectMongoDB from './config/db';


const app = express(); //Creando un objeto del servidor express

const PORT = 3000; //Número de puerto

app.use(express.json()); //Request es de tipo JSON
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);

connectMongoDB().then(()=> {
    app.listen(PORT, () => {
    console.log(`El servidor está en el puerto: ${PORT}`);
    console.log("El servidor está en el puerto", PORT);
    })
})

