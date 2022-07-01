import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import {
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_LOCATIONS,
} from "../../graphql/queries";
import Animals from "../Animals";
import { CountryDetails } from "../CountryDetails";
import Table from "../Table";

export default function Sandbox() {
  const [countryCode, setCountryCode] = useState(null);

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  const handleClickEmoji = (code) => {
    setCountryCode(code);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Animals
      </h1>
      <Animals></Animals>
      <hr></hr>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Countries
      </h1>
      {countryCode && <CountryDetails code={countryCode}></CountryDetails>}

      {data && <Table data={data} handleClickEmoji={handleClickEmoji}></Table>}
    </div>
  );
}
