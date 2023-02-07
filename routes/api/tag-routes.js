const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tags) => {
      res.status(200).json({
        message: "Tags retrieved successfully!",
        tags,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Tags retrieval failed!",
        error,
      });
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  Tag.findByPk(id, {
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({
          message: "Tag not found!",
        });
      }

      res.status(200).json({
        message: "Tag retrieved successfully!",
        tag,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Tag retrieval failed!",
        error,
      });
    });
});

router.post("/", (req, res) => {
  // create a new tag
  const { tag_name } = req.body;

  Tag.create({
    tag_name,
  })
    .then((tag) => {
      res.status(201).json({
        message: "Tag created successfully!",
        tag,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Tag creation failed!",
        error,
      });
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const { tag_name } = req.body;

  Tag.update({ tag_name }, { where: { id } })
    .then((rowsAffected) => {
      if (rowsAffected[0] === 0) {
        return res.status(404).json({
          message: "Tag not found!",
        });
      }

      res.status(200).json({
        message: "Tag updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Tag update failed!",
        error,
      });
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;

  Tag.destroy({ where: { id } })
    .then((rowsAffected) => {
      if (rowsAffected === 0) {
        return res.status(404).json({
          message: "Tag not found!",
        });
      }

      res.status(200).json({
        message: "Tag deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Tag deletion failed!",
        error,
      });
    });
});

module.exports = router;
