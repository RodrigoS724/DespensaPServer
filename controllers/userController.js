import { verifyUser, verifyParcialUser } from '../schemas/userSchemes.js';
import { verifiQuery } from '../utils/verifyFunction.js';
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel;
  }

  getByGmail = async (req, res) => {
    const { gmail } = req.params;
    const result = await this.userModel.getByGmail({ gmail });
    return verifiQuery('getByGmail', result);
  };

  verifyUser = async (req, res) => {
    const { gmail, pass } = req.body;
    console.log(gmail, pass);
    const result = await this.userModel.verifyUser({ gmail, pass });
    console.log(result);
    if (result === 0) return res.status(400).json({ message: 'invalid password' });
    if (result === 1) return res.status(400).json({ message: 'user not found' });
    else {
      // Almacena los datos del usuario en la sesión
      req.session.user = {
        id: result.id,
        gmail: result.gmail,
        isAdmin: result.is_admin // Ajusta según tu estructura de datos
      };
      return res.json({ message: 'Login successful', data: result.data });
    }
  };

  newUser = async (req, res) => {
    const result = verifyUser(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newUser = await this.userModel.newUser({ input: result.data });
    if (newUser === true) {
      return res.json({ message: 'Usuario creado con exito' });
    }
  };

  delete = async (req, res) => {
    const id = req.params;
    return await this.userModel.delete({ id });
  };

  update = async (req, res) => {
    const data = verifyParcialUser(req.body);
    if (data.error) return res.status(400).json({ error: JSON.parse(data.error.message) });
    const updated = await this.userModel.update({ input: data.data });
    return updated;
  };
}
