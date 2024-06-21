
import { connection } from '../../database/database.js';
import { hashPass } from '../../utils/passwords.js';
import { config } from 'dotenv';

export class UserModel {
  static getByGmail = async ({ gmail }) => {
    try {
      const [result] = await connection.query(
        'SELECT * FROM users WHERE gmail = ?',
        [gmail]
      );
      return result;
    } catch (error) {
      console.error('Error fetching user by Gmail:', error);
      throw error;
    }
  };

  static verifyUser = async ({ pass, gmail }) => {
    try {
      const [user] = await connection.query(
        'SELECT * FROM users WHERE gmail = ?',
        [gmail]
      );
      if (user.length > 0) {
        const hashedPassword = hashPass(pass, config.SALT);
        if (hashedPassword === user[0].password) {
          return user[0];
        } else {
          return 0;
        }
      } else return 1;
    } catch (error) {
      console.error('Error in verification User:', error.message);
      throw new Error('Error in verification User');
    }
  };

  static newUser = async ({ input }) => {
    const {
      name,
      gmail,
      password
    } = input;
    const hashedPassword = hashPass(password);
    const dateCreated = new Date().toLocaleString();
    console.log(dateCreated);
    try {
      await connection.query(
        `INSERT INTO users (name, gmail, password, created_date, is_admin) 
        VALUES (?, ?, ?, ?, ?);`,
        [name, gmail, hashedPassword, dateCreated, 0]
      );
      return true;
    } catch (error) {
      console.error('Error in creating new User:', error.message);
      throw new Error('Error in creating new User');
    }
  };

  static delete = async ({ id }) => {
    try {
      await connection.query(
        'DELETE FROM users WHERE id = ?;',
        [id]
      );
      return true;
    } catch (error) {
      throw new console.Error(error.message, 'error in delete user');
    }
  };

  static update = async ({ input }) => {
    const {
      name,
      gmail,
      password
    } = input;
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }
    if (gmail !== undefined) {
      fields.push('gmail = ?');
      values.push(gmail);
    }
    if (password !== undefined) {
      fields.push('password = ?');
      values.push(password);
    }

    values.push(gmail);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE gmail = ?;`;
    try {
      await connection.query(sql, values);
      return this.getByGmail(gmail);
    } catch (error) {
      throw new Error('Error in update item');
    }
  };
}
