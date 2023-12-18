import axios from "axios";

async function SlugPost(slug, data, headers) {
  return new Promise((resolve, reject) => {
    // var q = ''
    // for(const k in query){
    //   if(q.length > 0) q+='&'
    //   q += k+'='+query[k]
    // }
    // https://merchant.qpay.mn/v2/payment/check
    axios
      .post(`${process.env.ITC_GOV_SERVICE_URL}/${slug}`, data, {
        headers: { "Content-Type": headers.contenttype },
      })
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}
export default async function handler(req, res) {
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body, req.headers).then(
    function (response) {
      res.status(200).json(response.data);
      // res.header("Access-Control-Allow-Origin", "*");
    },
    function (error) {
      res.status(400).json(error);
    }
  );
}
