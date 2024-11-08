import db from '../database/database.js';

export const getMotoboys = async () => {
    const [rows] = await db.query('SELECT * FROM motoboys');
    return rows;
};

export const getMotoboyById = async (id) => {
    const [rows] = await db.query('SELECT * FROM motoboys WHERE id = ?', [id]);
    return rows[0];
};

export const createMotoboy = async (motoboy) => {
    const { nome, cpf, telefone, status } = motoboy;
    await db.query('INSERT INTO motoboys (nome, cpf, telefone, status) VALUES (?, ?, ?, ?)', [nome, cpf, telefone, status]);
};

export const updateMotoboy = async (id, motoboy) => {
    const { nome, cpf, telefone, status } = motoboy;
    await db.query('UPDATE motoboys SET nome = ?, cpf = ?, telefone = ?, status = ? WHERE id = ?', [nome, cpf, telefone, status, id]);
};

export const deleteMotoboy = async (id) => {
    await db.query('DELETE FROM motoboys WHERE id = ?', [id]);
};
