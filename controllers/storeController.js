import { verifyItem, verifyParcialItem } from '../schemas/items.js';
export class StoreController {
  constructor ({ storeModel }) {
    this.storeModel = storeModel;
  }

  getAllSchemes = async (req, res) => {
    const items = await this.storeModel.getAllSchemes();
    res.json(items);
  };

  getAll = async (req, res) => {
    const { userId } = req.params;
    const items = await this.storeModel.getAll({ userId });
    res.json(items);
  };

  getByID = async (req, res) => {
    const { userId, id } = req.params;
    const item = await this.storeModel.getByID({ id, userId });
    if (item === 0) {
      return res.status(400).json({ message: 'error' });
    }
    return item[0];
  };

  create = async (req, res) => {
    const result = verifyItem(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newItem = await this.storeModel.create({ input: result.data });
    console.log(newItem);
    if (newItem === 0) {
      return res.status(400).json(newItem);
    } else {
      return res.json(newItem);
    }
  };

  update = async (req, res) => {
    const result = verifyParcialItem(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    console.log(result);
    const edited = await this.storeModel.update({ id, input: result.data });
    if (edited > 0) {
      return res.json(edited);
    } else {
      return res.status(400).json(edited);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const deleted = await this.storeModel.delete({ id });
    if (deleted === true) {
      return res.json('Deleted');
    } else {
      return res.status(400).json('error');
    }
  };
}
