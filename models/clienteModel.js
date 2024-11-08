// models/clientModel.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export const createClient = async (client) => {
    const connection = await mysql.createConnection(dbConfig);
    const { nome, cpf, endereco_coleta, email } = client;
    const query = 'INSERT INTO clientes (nome, cpf, endereco_coleta, email) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(query, [nome, cpf, endereco_coleta, email]);
    await connection.end();
    return result;
};

export const getClients = async () => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM clientes');
    await connection.end();
    return rows;
};

export const updateClient = async (id, client) => {
    const connection = await mysql.createConnection(dbConfig);
    const { nome, cpf, endereco_coleta, email } = client;
    const query = 'UPDATE clientes SET nome = ?, cpf = ?, endereco_coleta = ?, email = ? WHERE id = ?';
    const [result] = await connection.execute(query, [nome, cpf, endereco_coleta, email, id]);
    await connection.end();
    return result;
};

export const deleteClient = async (id) => {
    const connection = await mysql.createConnection(dbConfig);
    const query = 'DELETE FROM clientes WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    await connection.end();
    return result;
};
