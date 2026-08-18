// const mongoose = require('mongoose');

// const structureSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   size: { type: Number, required: true },
//   length: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
//   lastAccessed: { type: Date, default: Date.now },
//   lastEdited: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Structure', structureSchema);

// const mongoose = require('mongoose');

// const structureSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   type: { type: String, required: true },
//   size: { type: Number, required: true },
//   length: { type: Number, required: true },
//   // 🎯 AGREGAMOS LOS NODOS (Array de objetos o valores según tu visualizador)
//   nodes: { type: Array, default: [] }, 
//   createdAt: { type: Date, default: Date.now },
//   lastAccessed: { type: Date, default: Date.now },
//   lastEdited: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Structure', structureSchema);



const mongoose = require('mongoose');

const structureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  dataType: { type: String, default: 'number' },
  size: { type: Number, required: true, default: 0 },
  length: { type: Number, required: true, default: 0 },
  nodes: { type: Array, default: [] }, // 🎯 Campo clave para los valores de los nodos
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Structure', structureSchema);