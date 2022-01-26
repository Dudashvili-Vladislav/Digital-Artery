import React, { useState } from "react";

// Import Swiper React components
import { Users } from "@components/ui/users/users";

import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules

import { useEffect } from "react";
import requests from "../../../api/requests";
import { Spinner } from "../../ui/spinner/spinner";

function SwiperArtist() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const usersData = await requests.usersDefault.get();
        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return <>{users.length > 0 ? <Users users={users} /> : <Spinner />}</>;
}

export default SwiperArtist;
