import { connection } from '../../database/database.js';

export class BrandModel {
  static getAll = async () => {
    const [result] = await connection.query(
      'SELECT * FROM brand;'
    );
    if (result.length > 0) {
      return result;
    } else {
      return 0;
    }
  };

  static create = async ({ input }) => {
    const {
      names
    } = input;
    const name = names.toLowerCase();
    try {
      await connection.query(
        'INSERT INTO brand (name, validated) VALUES (?, ?);',
        [name, 0]
      );
    } catch (error) {
      console.error('Create new brand error', error);
      return 0;
    }
    const [result] = await connection.query(
      'SELECT * FROM brand WHERE name = ?;',
      [name]
    );
    if (result.length > 0) {
      return result;
    } else {
      return 0;
    }
  };

  static update = async ({ name, validate }) => {
    try {
      await connection.query(
        'UPDATE brand SET validated = ? WHERE name = ?;',
        [validate, name]
      );
      return 'deleted';
    } catch (error) {
      console.error('Create updating error', error);
      return 0;
    }
  };

  static delete = async ({ name }) => {
    try {
      await connection.query(
        'DELETE FROM brand WHERE name = ?;',
        [name]
      );
      return 'deleted';
    } catch (error) {
      throw console.error(error, 'From delete function');
    }
  };
}
