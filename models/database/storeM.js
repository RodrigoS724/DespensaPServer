/* eslint-disable camelcase */
import { connection } from '../../database/database.js';
import crypto from 'node:crypto';

export class StoreModel {
  static getAll = async ({ userId }) => {
    if (userId) {
      const [items] = await connection.query(
        'SELECT * FROM items_store WHERE user_id = ?;',
        [userId]
      );
      return items;
    } else {
      const [items] = await connection.query(
        'SELECT * FROM items_store;'
      );
      return items;
    }
  };

  static getAllSchemes = async () => {
    const [items] = await connection.query(
      'SELECT id, name, brand, type, photo_url, price FROM items_store;'
    );
    return items;
  };

  static getByID = async ({ id, userId }) => {
    try {
      const [item] = await connection.query(
        'SELECT * FROM items_store WHERE id = ?;',
        [id]
      );
      return item[0];
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  };

  static create = async ({ input }) => {
    const {
      userId,
      name,
      photo_url,
      price,
      type,
      brand,
      stock
    } = input;
    const brandLow = brand.toLowerCase();
    const nameLow = name.toLowerCase();
    const id = crypto.randomUUID();

    try {
      await connection.query(
        'INSERT INTO items_store (id, user_id, name, brand, type, photo_url, price, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [id, userId, nameLow, brandLow, type, photo_url, price, stock]
      );
      try {
        const [item] = await connection.query(
          'SELECT * FROM items_store WHERE id = ?;',
          [id]
        );
        return item[0];
      } catch (error) {
        console.error('Error getting item in create:', error);
        return 0;
      }
    } catch (error) {
      console.error('Error Crating item:', error);
      return 0;
    }
  };

  static update = async ({ id, input }) => {
    const {
      name,
      photo_url,
      price,
      brand,
      stock
    } = input;

    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }
    if (brand !== undefined) {
      fields.push('brand = ?');
      values.push(brand);
    }
    if (photo_url !== undefined) {
      fields.push('photo_url = ?');
      values.push(photo_url);
    }
    if (price !== undefined) {
      fields.push('price = ?');
      values.push(price);
    }
    if (stock !== undefined) {
      fields.push('stock = ?');
      values.push(stock);
    }
    values.push(id);
    const sql = `UPDATE items_store SET ${fields.join(', ')} WHERE id = ?;`;
    try {
      await connection.query(sql, values);
      return this.getByID(id);
    } catch (error) {
      console.error('Error getting item in update:', error);
      throw error;
    }
  };

  static delete = async ({ id }) => {
    try {
      await connection.query(
        'DELETE FROM items_store WHERE id = ?;',
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error deletting item:', error);
      throw error;
    }
  };
}
