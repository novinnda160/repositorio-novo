import db from '../database/database.js';

class Usuario {
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0]; // Retorna o primeiro usuário encontrado ou undefined
  }

  static async create(userData) {
    const { name, email, senha } = userData;
    await db.execute('INSERT INTO usuarios (name, email, senha) VALUES (?, ?, ?)', [name, email, senha]);
  }
}

export default Usuario;
