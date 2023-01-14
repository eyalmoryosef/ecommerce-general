import express from "express";
import multer from "multer";
import path from "path";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400);
  }
  next(err); //redirect to custom error handler
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    const err = new Error("Only Images upload is allowed!");
    return cb(err, false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  errorHandler,
  (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error("Please select file");
    }

    res.send(`/${req.file.path}`);
  }
);

export default router;
