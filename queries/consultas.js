import pool from "../config/db.js";

const argumento = process.argv.slice(2);
const opcion = argumento[0];
const rut = argumento[1];
const datos = JSON.parse(argumento.slice(2).join(' '));

// Función para agregar un estudiante
const agregarEstudiante = async (datos) => {
    try {
        const consulta = {
            text: "INSERT INTO \"Always\" (rut, nombre, curso, fecha_nacimiento) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [datos.rut, datos.nombre, datos.curso, datos.fecha_nacimiento],
        };

        const res = await pool.query(consulta);
        console.log('El estudiante ha sido agregado', res.rows[0]);
    } catch (error) {
        console.log(error.code, error.message);
    }
}

// Función para consultar los estudiantes registrados
const consultarEstudiantes = async () => {
    try {
        const consulta = {
            text: "SELECT * FROM \"Always\"",
            rowMode: "array",
        };

        const res = await pool.query(consulta);
        console.log("Lista de estudiantes registrados:", res.rows);
    } catch (error) {
        console.log(error.code, error.message);
    }
}

// Función para consultar estudiante por rut
const consultarEstudiantePorRut = async (rut) => {
    try {
        const consulta = {
            text: "SELECT * FROM \"Always\" WHERE rut = $1",
            values: [rut],
        };

        const res = await pool.query(consulta);
        console.log(`El estudiante con rut ${rut} es:`, res.rows[0]);
    } catch (error) {
        console.log(error.code, error.message);
    }
}

// Función para actualizar la información de un estudiante
const actualizarEstudiante = async (rut, datos) => {
    try {
        const consulta = {
            text: "UPDATE \"Always\" SET nombre = $1, curso = $2, fecha_nacimiento = $3 WHERE rut = $4 RETURNING *",
            values: [datos.nombre, datos.curso, datos.fecha_nacimiento, rut],
        };

        const res = await pool.query(consulta);
        console.log('La información del estudiante ha sido actualizada', res.rows[0]);
    } catch (error) {
        console.log(error.code, error.message);
    }
}

// Función para eliminar el registro de un estudiante
const eliminarEstudiante = async (rut) => {
    try {
        const consulta = {
            text: "DELETE FROM \"Always\" WHERE rut = $1 RETURNING *",
            values: [rut],
        };

        const res = await pool.query(consulta);
        console.log('El registro del estudiante ha sido eliminado', res.rows[0]);
    } catch (error) {
        console.log(error.code, error.message);
    }
}

if(opcion === "agregarEstudiante"){
    agregarEstudiante(datos);
}
if(opcion === "consultarEstudiantes"){
    consultarEstudiantes();
}
if(opcion === "consultarEstudiantePorRut"){
    consultarEstudiantePorRut(rut);
}
if(opcion === "actualizarEstudiante"){
    actualizarEstudiante(rut, datos);
}
if(opcion === "eliminarEstudiante"){
    eliminarEstudiante(rut);
}
