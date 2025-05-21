import express from 'express'
import morgan from 'morgan'

const app = express(); //Creando un onjeto del servidor express

const PORT = 3000; //Número de puerto

app.use(express.json()); //Request es de tipo JSON
app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`El servidor está en el puerto: ${PORT}`);
    console.log("El servidor está en el puerto", PORT);
})