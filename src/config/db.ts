import mongoose from "mongoose";

const connectMongoDB = async(): Promise<void> => {
    const mongoUri = "mongodb://127.0.0.1:27017/proyecto";


    try {
        await mongoose.connect(mongoUri);
        console.log("Conexión con mongo")
    } catch (error) {
        console.log("Error al conectarse a la base de datos", error)
    }
}

export default connectMongoDB;