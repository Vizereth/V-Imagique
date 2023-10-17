import React, { useState, useEffect } from "react";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import { client } from "../../utilities/client";
import { feedQuery, searchQuery } from "../../utilities/data";
import Spinner from "../Spinner/Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

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
  }, [searchTerm]);

  if (loading) {
    return <Spinner message="Searching for pins" />;
  }

  return (
    <div>
      {pins?.length && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="text-center text-xl">No pins found</div>
      )}
    </div>
  );
};

export default Search;
