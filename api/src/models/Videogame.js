const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para videogames
  sequelize.define('videogame', {
    //Id
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    // Nombre
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Descripcion del Juego
    description:{
      type:DataTypes.TEXT,
      allowNull: false,
    },
    //Fecha de Lanzamiento
    released:{
      type:DataTypes.STRING,
      allowNull:true
    },
    // Rating
    rating:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
    // Plataforma
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    //Imagen
    background_image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    // Cuando quedramos llamar a lo que esta en la Base de datos
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
