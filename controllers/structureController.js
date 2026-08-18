
// const Structure = require('../models/Structure');

// exports.createStructure = async (req, res) => {
//   const { name, type, size, length } = req.body;
//   try {
// const newStructure = await Structure.create({
//       // 2. Si hay usuario autenticado lo usa, sino le clava null temporalmente para que no explote
//       userId: req.user ? req.user.id : null, 
//       name,
//       type,
//       // 3. Mapeamos los datos al formato de tu base de datos
//       size: dataType,          // Guardamos el tipo de dato (string, number, etc.)
//       length: values.length,   // Guardamos la cantidad de nodos
//       // Nota: Si tu modelo 'Structure' tiene una columna para los valores reales (ej: values), agregala acá abajo.
//     });
//     res.status(201).json(newStructure);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Other structure operations (read, update, delete) would go here









// const Structure = require('../models/Structure');

// exports.createStructure = async (req, res) => {
//   // 1. Recibimos 'dataType' y 'values' que vienen desde el frontend
//   const { name, type, dataType, values } = req.body;
  
//   try {
//     const newStructure = await Structure.create({
//       // 2. Si hay usuario autenticado lo usa, sino le clava null temporalmente para que no explote
//       userId: req.user ? req.user.id : null, 
//       name,
//       type,
//       // 3. Mapeamos los datos al formato de tu base de datos
//       size: dataType,          // Guardamos el tipo de dato (string, number, etc.)
//       length: values.length,   // Guardamos la cantidad de nodos
//       // Nota: Si tu modelo 'Structure' tiene una columna para los valores reales (ej: values), agregala acá abajo.
//     });
    
//     res.status(201).json(newStructure);
//   } catch (error) {
//     console.error("Error real en la base de datos:", error); // Esto te va a cantar en la terminal si falta alguna columna
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };




// const Structure = require('../models/Structure');

// exports.createStructure = async (req, res) => {
//   const { name, type, size, length } = req.body;
//   try {
//     const newStructure = await Structure.create({
//       userId: req.user.id, // 🎯 Recupera el ID real del usuario gracias al middleware
//       name,
//       type,
//       size,
//       length,
//     });
//     res.status(201).json(newStructure);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// exports.createStructure = async (req, res) => {
//   const { name, type, size, length, nodes } = req.body;
//   try {
//     const newStructure = await Structure.create({
//       userId: req.user.id,
//       name,
//       type,
//       size,
//       length,
//       nodes: nodes || [] // Guardamos los nodos que vienen del front
//     });
//     res.status(201).json(newStructure);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const mongoose = require('mongoose');
const Structure = require('../models/Structure');

exports.createStructure = async (req, res) => {
  const { name, type, dataType, size, length, nodes } = req.body;
  
  try {
    const newStructure = await Structure.create({
      userId: req.user.id || req.user._id,
      name,
      type,
      dataType,
      size: size || 0,
      length: length || 0,
      nodes: nodes || [] // Se guardan en MongoDB
    });
    
    res.status(201).json(newStructure);
  } catch (error) {
    console.error("Error al crear estructura en Mongo:", error);
    res.status(500).json({ message: 'Server error al guardar la estructura' });
  }
};

// exports.getUserStructures = async (req, res) => {
//   try {
//     const structures = await Structure.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.json(structures);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };



exports.getUserStructures = async (req, res) => {
  try {
    // Busca las estructuras pertenecientes al usuario logueado
    const structures = await Structure.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(structures);
  } catch (error) {
    console.error("Error al obtener estructuras:", error);
    res.status(500).json({ message: 'Server error al obtener las estructuras' });
  }
};




// exports.deleteStructure = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Structure.findOneAndDelete({
//       _id: id,
//       userId: req.user.id || req.user._id
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: "Estructura no encontrada." });
//     }

//     return res.json({ message: "Estructura eliminada con éxito." });
//   } catch (error) {
//     console.error("Error al eliminar la estructura:", error);
//     return res.status(500).json({ message: "Error del servidor al eliminar." });
//   }
// };


// exports.deleteStructure = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Validar que el id sea un ObjectId válido de Mongoose
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "ID de estructura inválido" });
//     }

//     const userId = req.user.id || req.user._id;

//     const deletedStructure = await Structure.findOneAndDelete({
//       _id: id,
//       userId: userId
//     });

//     if (!deletedStructure) {
//       return res.status(404).json({ message: "Estructura no encontrada o no pertenece al usuario" });
//     }

//     return res.status(200).json({ message: "Estructura eliminada correctamente" });
//   } catch (error) {
//     console.error("Error en deleteStructure:", error);
//     return res.status(500).json({ message: "Error interno del servidor" });
//   }
// };


exports.deleteStructure = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de estructura no válido" });
    }

    // 2. Buscar y eliminar la estructura
    const deletedStructure = await Structure.findByIdAndDelete(id);

    if (!deletedStructure) {
      return res.status(404).json({ message: "La estructura no existe en la base de datos" });
    }

    return res.status(200).json({ message: "Estructura eliminada con éxito", id });
  } catch (error) {
    console.error("Error al eliminar estructura:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};