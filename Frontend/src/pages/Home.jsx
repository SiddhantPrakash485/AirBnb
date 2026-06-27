import React, { useContext } from "react";
import Nav from "../Components/Nav";
import { listingDataContext } from "../Context/ListingContext";
import Card from "../Components/Card.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

function Home() {
  let { userData } = useContext(userDataContext);
  let { listingData, setListingData, newListData } =
    useContext(listingDataContext);
  return (
    <div className="text-[30px]">
      <Nav />
      <div className="w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]">
        {newListData.map((list) => (
          <Card
            key={list._id}
            id={list._id}
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
