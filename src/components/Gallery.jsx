import { useEffect, useState } from "react";

const Gallery = () => {
  const [userImg, setUserImg] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=6`,
      );
      const data = await response.json();
      setUserImg(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  let printUserImg = `Loading...`;
  if (userImg.length > 0) {
    printUserImg = userImg.map((elem, idx) => {
      return (
        <div
          className="w-[30%]  min-w-[300px] my-2.5 bg-gray-800 rounded-lg"
          key={idx}
        >
          <div className="h-43 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={elem.download_url}
              alt=""
            />
          </div>
          <h2 className="text-xl p-2 font-semibold">{elem.author}</h2>
        </div>
      );
    });
  } else {
    return (
      <div className="text-5xl w-full h-[70vh] flex justify-center items-center">
        {printUserImg}
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        {printUserImg}
      </div>
      <div className="absolute top-[87%] left-[40%] flex items-center justify-center">
        <button
          onClick={() => {
            if (pageNo > 1) {
              setPageNo(pageNo - 1);
              setUserImg([]);
            }
          }}
          className="bg-amber-400 text-3xl p-2 m-2 active:scale-95 cursor-pointer"
        >
          Prev
        </button>
        <div className="text-3xl ">Page {pageNo}</div>
        <button
          onClick={() => {
            setPageNo(pageNo + 1);
            setUserImg([]);
          }}
          className="bg-amber-400 text-3xl p-2 m-2 active:scale-95 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
