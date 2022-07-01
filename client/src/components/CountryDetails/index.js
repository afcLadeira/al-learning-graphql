import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_COUNTRY } from "../../graphql/queries";

export function CountryDetails({ code }) {
  const [getCountry, { loading, error, data }] = useLazyQuery(GET_COUNTRY, {
    variables: { code },
  });

  useEffect(() => {
    if (code) {
      getCountry({ variables: { code: code } });
    }
  }, [code, getCountry]);

  if (loading) return null;

  if (error) return `Error! ${error}`;

  return (
    <div>
      {" "}
      {data && (
        <div className="flex justify-center items-center my-20 px-5">
          <div className="min-w-[300px] p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-700">
                {data.country.name} ({data.country.code})
              </h1>
              <p className="text-sm mt-2 text-gray-700">
                {data.country.capital} (+{data.country.phone})
              </p>

              <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
                <button className="block text-xl font-semibold text-gray-700 cursor-auto">
                  {data.country.currency}
                </button>
                <button className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300">
                  {data.country.emoji}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
