import {Request, Response} from 'express';
import { generateAccessToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';

//Endpoint recibe un request, responde un response

export const login = (req:Request, res:Response) =>{
    //Asignar tipo de dato :
    //Inicializar variable después del =
    let number:number=1;
    //Dentro del body del request buscar las variables de username y password
    const {username, password} = req.body;
    if (username !=="admin" || password !== "12345") {
        return res.status(401)
        .json({message:"Credenciales incorrectas"});
    }
    const userId = "123456789"
    const accessToken = generateAccessToken(userId);
    cache.set(userId, accessToken, 60*15)

    
    return res.json({
        message:"Login exitoso",
        accessToken
    })
}

export const getTimeToken=(req:Request, res:Response) => {
    const userId="123456789";
    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({message:"Token no encontrado"});
    }
    const now = Date.now();
    const timeToLifeSeconds = Math.floor((ttl-now)) / 1000;
    const expTime = dayjs(ttl).format('HH:mm:ss');
    return res.json({
        timeToLifeSeconds,
        expTime
    })
}