import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utilities/client";
import { searchQuery, feedQuery } from "../../utilities/data";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner/Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="h-screen">
        <Spinner message="We are loading the pins!" />
      </div>
    );
  }

  if (!pins?.length) {
    return (
      <h2 className="text-2xl w-full h-screen flex items-center justify-center">{`No pins here :(`}</h2>
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
