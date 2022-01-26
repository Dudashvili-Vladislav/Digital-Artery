import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import requests from "../../../api/requests";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Tape } from "@/components/ui/tape/tape";

export const ImgArray = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getImages = async () => {
    if (loading) {
      try {
        const res = await requests.feed.get(page);
        setImages([...images, ...res.data]);
        setPage((prevState) => prevState + 1);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  let lastDate = 0;
  const scrollHandler = (e) => {
    let nowDate = Date.now();
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      lastDate + 500 < nowDate
    ) {
      lastDate = Date.now();
      setLoading(true);
    }
  };

  useEffect(() => {
    getImages();
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return function () {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div>
      <Tape images={images} />
      {loading ? <Spinner /> : ""}
    </div>
  );
};

export default withRouter(ImgArray);
