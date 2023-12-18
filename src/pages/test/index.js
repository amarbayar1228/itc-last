import { Spin } from "antd";
import axios from "axios";

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

const { useEffect, useState } = require("react");
const Test = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getFunc();
  }, []);

  const getFunc = () => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        setList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div className="flex items-center">
      <div className="mt-52">dasd asdasd</div>
      <div className="flex justify-between w-full m-20 gap-10  font-sans">
        <div className="bg-gray-100 w-2/4 p-10">
          <div className="text-2xl font-medium mb-3">Server side render</div>
          {props.posts.map((e) => (
            <ul
              className="list-image-[url('/images/news/checkmarker.svg')] "
              key={e.id}
            >
              <li>
                {e.id}: {e.title}{" "}
              </li>
            </ul>
          ))}
        </div>
        <div className="bg-gray-100 w-2/4 p-10">
          <div className="text-2xl font-medium mb-3">Client side render</div>
          <div>
            {loading ? (
              <Spin size="large" className="w-full flex justify-center mt-10" />
            ) : (
              list.map((e) => (
                <ul
                  className="list-image-[url('/images/news/checkmarker.svg')] "
                  key={e.id}
                >
                  <li>
                    {e.id}: {e.title}{" "}
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
