import multer from "multer";
const storage = multer.diskStorage({
  //for the destination of the file
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  //for the name of the file
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage, });
