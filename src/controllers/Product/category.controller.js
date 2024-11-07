const catchError = require('../../utils/catchError');
const Category = require("../../models/Product/Category");

const getAll = catchError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const offset = (page - 1) * pageSize;
    const results = await Category.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });
    const response = {
      totalRecords: results.count,
      totalPages: Math.ceil(results.count / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: results.rows,
    };
    return res.json(response);
  });

const create = catchError(async(req, res) => {
  const { category } = req.body;
  try {
    const categrory = await Category.create({ ...category });
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({message: "Error al crear la categoría", error });
  }
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  try {
    const categrory = await Category.findByPk(id);
    return res.json(categrory);
  } catch (error) {
    return res.status(404).json({message: "Error al consultar la categoría", error });
  }
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { name, description, urlImg } = req.body;
    try {
        const categrory = await Category.update(
        { name, description, urlImg },
        { where: { id }, returning: true }
        );
        return res.json(categrory);
    } catch (error) {
        return res.status(404).json({message: "Error al actualizar la categoría", error });
    }
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    try {
        const categrory = await Category.destroy({ where: { id } });
        return res.json(categrory);
    } catch (error) {
        return res.status(404).json({message: "Error al eliminar la categoría", error });
    }
});

module.exports = { getAll, create, getOne, update, remove };
