/*
PROYECTO: GESTION INDUSTRIAL DE INVENTARIOS Y PRODUCCION
ESTUDIANTE: DIANA PATRICIA MARTINEZ MUNOZ
BASE DE DATOS: Gestion_Industrial
HERRAMIENTA: MongoDB
*/

// Seleccionar base de datos
use("Gestion_Industrial");

// 1. CONSULTA DE DOCUMENTOS
db["Materias_Primas"].find();

// 2. CONSULTA DE SELECCION LIMITADA
db["Materias_Primas"].find().limit(5);

// 3. FILTRO POR CATEGORIA
db["Materias_Primas"].find({
  categoria: "Metal"
});

// 4. FILTRO POR CANTIDAD MAYOR A 100
db["Materias_Primas"].find({
  cantidad_disponible: { $gt: 100 }
});

// 5. ACTUALIZAR STOCK MINIMO
db["Materias_Primas"].updateOne(
  { codigo: "MP005" },
  { $set: { stock_minimo: 35 } }
);

// Verificar actualizacion
db["Materias_Primas"].find({
  codigo: "MP005"
});

// 6. INSERTAR REGISTRO TEMPORAL
db["Materias_Primas"].insertOne({
  codigo: "PRUEBA_DELETE",
  nombre: "Registro temporal",
  cantidad_disponible: 1
});

// 7. ELIMINAR REGISTRO TEMPORAL
db["Materias_Primas"].deleteOne({
  codigo: "PRUEBA_DELETE"
});

// Verificar eliminacion
db["Materias_Primas"].countDocuments({
  codigo: "PRUEBA_DELETE"
});

// 8. UNION DE COLECCIONES CON $LOOKUP
db["Materias_Primas"].aggregate([
  {
    $lookup: {
      from: "Proveedores",
      localField: "nombre",
      foreignField: "tipo_insumo",
      as: "proveedores"
    }
  }
]);

// 9. CONTAR DOCUMENTOS
db["Materias_Primas"].countDocuments();

// 10. SUMA DEL INVENTARIO
db["Materias_Primas"].aggregate([
  {
    $group: {
      _id: null,
      total_inventario: {
        $sum: "$cantidad_disponible"
      }
    }
  }
]);

// 11. PROMEDIO DEL INVENTARIO
db["Materias_Primas"].aggregate([
  {
    $group: {
      _id: null,
      promedio_inventario: {
        $avg: "$cantidad_disponible"
      }
    }
  }
]);
