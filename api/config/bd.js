import mongoose from "mongoose";

const conectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL)
      console.log(`Conectado a " ${con.connection.host}`);
      
    
  } catch (error) {
    console.log("Error de conexión a MongoDB: ", error);
    process.exit(1);
  }
};

export {conectDB};