import {Request, Response} from 'express';

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

    else {
        return res.json({message:"Login exitoso"})}
}