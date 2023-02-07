const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((categories) => {
      res.status(200).json({
        message: "Categories retrieved successfully!",
        data: categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving Categories!",
        error,
      });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  Category.findByPk(id, {
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((category) => {
      if (category) {
        res.status(200).json({
          message: "Category retrieved successfully!",
          data: category,
        });
      } else {
        res.status(404).json({
          message: "Category not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving Category!",
        error,
      });
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.status(201).json({
        message: "Category created successfully!",
        data: newCategory,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating Category!",
        error,
      });
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(([updatedRowsCount]) => {
      if (updatedRowsCount > 0) {
        res.status(200).json({
          message: "Category updated successfully!",
        });
      } else {
        res.status(404).json({
          message: "Category not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating Category!",
        error,
      });
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedRowsCount) => {
      if (deletedRowsCount > 0) {
        res.status(200).json({
          message: "Category deleted successfully!",
        });
      } else {
        res.status(404).json({
          message: "Category not found!",
        });
      }
    })
    .catch((error) => {
      res.status(400).send({
        message: "Error deleting Category!",
      });
    });
});

module.exports = router;
