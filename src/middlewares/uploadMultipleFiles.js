import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/img/uploads"),
  
  filename: (req, files, cb) => {
    cb(null, new Date().getTime() + path.extname(files.originalname));
  },
});

const upload = multer({
  storage,
}).array("images", 10);

export default upload;
