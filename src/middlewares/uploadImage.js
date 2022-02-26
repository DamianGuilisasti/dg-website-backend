import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage,
  limits: {
    fieldSize: 30 * 2048 * 2048,
  },
}).single("image");

export default uploadImage;
