// const http = require('http');

import axios from "axios";
import fs from "fs";
import mime from "mime-types";

async function SlugPost(slug, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.ITC_GOV_SERVICE_URL}/${slug}`, data, {
        headers: {
          Accept: "application/json",
          ContentType: "application/json",
          // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMzc1MzQ3LCJleHAiOjE2NDM5NjczNDd9.lJd-Xx-b2kHPsBxatVfxqSRBC4Isw8_oV5jViuhsthw",
        },
      })
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
          console.log(error);
        }
      );
  });
}

export default async function handler(req, res) {
  const { slug } = req.query;
  //энд session - user duudna
  // /api/v1/getImage?file=asdf
  if (
    slug.join("/").indexOf("getFile") !== -1 &&
    req.query.file !== undefined
  ) {
    // const imagePath = process.env.UPLOAD_PATH_MAC + "/i/" + req.query.file;
    const imagePath = process.env.UPLOAD_PATH + "/files/" + req.query.file;

    fs.readFile(imagePath, function (err, content) {
      if (err) {
        fs.readFile("public/images/no-image.jpg", (err, image) => {
          if (err) {
            res.end("no image");
          }
          res.writeHead(200, { "Content-type": "image/jpg" });
          res.end(image);
        });
      } else {
        const mimeType = mime.lookup(imagePath);
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": mimeType });

        res.end(content);
      }
    });
  } else if (
    slug.join("/").indexOf("getVideo") !== -1 &&
    req.query.file !== undefined
  ) {
    // const imagePath = process.env.UPLOAD_PATH_MAC + "/i/" + req.query.file;
    const videoPath = process.env.UPLOAD_PATH + "/v/" + req.query.file;

    fs.readFile(videoPath, function (err, content) {
      if (err) {
        fs.readFile(process.env.UPLOAD_PATH + "/no_image.png", (err, video) => {
          if (err) {
            res.end("no video");
            console.log(err);
          }
          res.writeHead(200, { "Content-type": "video/mp4" });
          res.end(video);
        });
      } else {
        const mimeType = mime.lookup(videoPath);
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": mimeType });

        res.end(content);
      }
    });
  } else if (
    slug.join("/").indexOf("getPdf") !== -1 &&
    req.query.file !== undefined
  ) {
    // const imagePath = process.env.UPLOAD_PATH_MAC + "/i/" + req.query.file;
    const pdfPath = process.env.UPLOAD_PATH + "/files/" + req.query.file;

    fs.readFile(pdfPath, function (err, content) {
      if (err) {
        fs.readFile(process.env.UPLOAD_PATH + "/no_image.png", (err, pdf) => {
          if (err) {
            res.end("no pdf");
          }
          res.writeHead(200, { "Content-type": "application/pdf" });
          res.end(pdf);
        });
      } else {
        const mimeType = mime.lookup(pdfPath);
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": mimeType });

        res.end(content);
      }
    });
  } else {
    // await SlugPost(slug.join("/"), req.body, session.accessToken).then(

    await SlugPost(slug.join("/"), req.body).then(
      function (response) {
        res.status(200).json(response.data);
      },
      function (error) {
        console.log(error);
      }
    );
  }
}
