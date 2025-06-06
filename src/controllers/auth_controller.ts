import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";



export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario por username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Comparar contraseñas encriptadas
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar token
        const userId = user._id.toString();
        const accessToken = generateAccessToken(userId);

        // Guardar en caché
        cache.set(userId, accessToken, 60 * 15);

        return res.json({
            message: "Login exitoso",
            accessToken,
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ message: "Error en login", error });
    }
};


export const getTimeToken = (req:Request, res: Response) => {
    //const userId = "123456789";
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if(!ttl) {
        return res.status(404).json({ message: "Token no encontrado" })
    }
    const now=Date.now();
    const timeToLifeSeconds = Math.floor((ttl-now)/1000);

    const expTime = dayjs(ttl).format('HH:mm:ss');
    
    return res.json({
        timeToLifeSeconds,
        expTime
    })
}

export const updateToken = (req: Request, res : Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if(!ttl) {
        return res.status(404).json({ message: "Token no encontrado" })
    }
    const newTime:number=60 * 15;
    cache.ttl (userId, newTime); //Actualizar ttl del token
    return res.json({message:"Actualizacion con exito"})
}
export const getAllUsers = async (req: Request, res: Response) => {
    const userList = await User.find();
    return res.json({ userList });
};



export const getUserByUsername =async (req:Request, res:Response) => {
    const { userName } =req.params;
    const userByUsername = await User.find({username:userName});
    if (!userByUsername){
        return res.status(404).json({message:"Usuario no existe"})
    }
    return res.json({userByUsername});
}

export const saveUser = async (req:Request, res:Response) => {
    try {
        const {fullName, userName, email, phone, password, role, status} = req.body;
        let newUser = new User({
            name: fullName,
            username:userName,
            email,
            phone,
            password, role,
            status
        });
        const user = await newUser.save();
        return res.json({ user })
    } catch(error){
        console.log("Error ocurrio en SAVEUSER", error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 salt rounds
        const newUserData = {
            ...req.body,
            password: hashedPassword
        };

        const newUser = await User.create(newUserData);

        res.status(201).json({ message: "Usuario creado", user: newUser });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear usuario", error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ user });
    } catch (error) {
        console.error("Error al buscar usuario:", error);
        res.status(500).json({ message: "Error al buscar usuario", error });
    }
};



export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }

    try {
        // Validar si el nuevo email ya está en uso por otro usuario
        if (req.body.email) {
            const emailExists = await User.findOne({
                email: req.body.email,
                _id: { $ne: id }
            });

            if (emailExists) {
                return res.status(400).json({ message: "Ese correo ya está en uso por otro usuario" });
            }
        }

        
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10); // salt rounds
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};





export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID no válido" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                status: false,
                deleteDate: new Date()
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado", user: updatedUser });
    } catch (error) {
        console.error("Error al desactivar usuario:", error);
        res.status(500).json({ message: "Error al desactivar usuario", error });
    }
};


