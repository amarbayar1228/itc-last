import fs from "fs";
import Busboy from "busboy";
import moment from "moment";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const { upload } = req.query;
  const busboy = Busboy({ headers: req.headers });
  const dateName = moment().format("YYYYMMDDhhmmssmmmm");
  let dateFileName = "";
  // ------------------------------------------------------- upload image -------------------------------------------------------
  if (upload == "upload") {
    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      let dir = `${process.env.UPLOAD_PATH}/${"files"}/`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      dateFileName = dateName + "." + filename.mimeType.slice(-3);
      file.pipe(fs.createWriteStream(dir + dateFileName));
    });
    busboy.on("finish", function () {
      res.writeHead(200, { Connection: "close" });
      res.end(dateFileName.toString());
    });

    return req.pipe(busboy);
  }
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? // test(req, res)
      console.log("GET")
    : res.status(404).send("");
};
