import { verifyBrand } from '../schemas/items.js';

export class BrandController {
  constructor ({ brandModel }) {
    this.brandModel = brandModel;
  }

  getAll = async (req, res) => {
    const brands = await this.brandModel.getAll();
    if (brands === 0) return res.status(400).json({ error: JSON.parse(brands.error.message) });
    res.json(brands);
  };

  create = async (req, res) => {
    const brand = verifyBrand(req.body);
    const newBrand = await this.brandModel.create({ input: brand.data });
    console.log(newBrand);
    if (newBrand === 0) {
      return res.status(400).json(newBrand);
    } else {
      return res.json(newBrand);
    }
  };

  update = async (req, res) => {
    const result = verifyBrand(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { validate } = req.params;
    const edited = await this.brandModel.update({ input: result.data, validate });
    if (edited > 0) {
      return res.json(edited);
    } else {
      return res.status(400).json(edited);
    }
  };

  delete = async (req, res) => {
    const { name } = req.params;
    const deleted = await this.brandModel.delete({ name });
    if (deleted === true) {
      return res.json('Deleted');
    } else {
      return res.status(400).json('error');
    }
  };
}
