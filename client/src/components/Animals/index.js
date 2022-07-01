import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  CREATE_ANIMAL,
  DELETE_ANIMAL,
  GET_ANIMALS,
  GET_ANIMALS_FILTERED,
  UPDATE_ANIMAL,
} from "../../graphql/queries";

const initialState = { name: "", animal_type: "", geo_range: "", id: null };

export default function Animals() {
  let [form, setForm] = useState(initialState);
  let [isEditing, setIsEditing] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ANIMALS);

  const {data : mammals } = useQuery(GET_ANIMALS_FILTERED , {
    variables: { input: { animal_type : {eq : "Mammal"} }},
  });


  const refetchAnimals = {
    refetchQueries: [{ query: GET_ANIMALS }, "GetAnimals"],
  };

  const [deleteAnimal] = useMutation(DELETE_ANIMAL, refetchAnimals);
  const [updateAnimal] = useMutation(UPDATE_ANIMAL, refetchAnimals);

  const [createAnimal] = useMutation(CREATE_ANIMAL , {
    update(cache, result) {
    console.log("🚀 ~ file: index.js ~ line 27 ~ update ~ result", result)
    console.log("🚀 ~ file: index.js ~ line 27 ~ update ~ cache", cache)

        // Update the cache as an approximation of server-side mutation effects
    
      }
  });

  const handleCreateAnimal = async () => {
    createAnimal({
      variables: {
        input: {
          name: form.name,
          animal_type: form.animal_type,
          geo_range: form.geo_range,
        },
      },
    });
    clearForm();
    refetch();
  };

  const onClickEdit = ({ name, animal_type, geo_range, image_link, id }) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    setForm((prevState) => ({ name, animal_type, geo_range, id }));
    setIsEditing(true);
  };

  const clearForm = () => {
    setForm(initialState);
  };

  const handleEditAnimal = () => {
    updateAnimal({
      variables: {
        input: {
          id: form.id,
          name: form.name,
          animal_type: form.animal_type,
          geo_range: form.geo_range,
        },
      },
    });
    clearForm();
    setIsEditing(false);
  };

  const handleDeleteAnimal = async (id) => {
    await deleteAnimal({
      variables: {
        deleteAnimalId: id,
      },
    });
  };

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            name
          </label>
          <input
            value={form.name}
            name="name"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            animal type
          </label>
          <input
            value={form.animal_type}
            name="animal_type"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          ></input>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            geo range
          </label>
          <input
            value={form.geo_range}
            name="geo_range"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          ></input>
        </div>
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-10"
        onClick={() => (isEditing ? handleEditAnimal() : handleCreateAnimal())}
      >
        {isEditing ? "Edit Animal" : "Add Animal"}
      </button>
      {loading && <h1>loading</h1>}
      {error && <h1>{JSON.stringify(error)}</h1>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:'space-between', alignContent:'flex-start', alignItems: "center" }}>
        {data?.animals &&
          data.animals.map(
            ({ name, animal_type, geo_range, image_link, id }) => (
              <div
                key={id}
                className="flex justify-center items-center my-10 px-5"
              >
                <div className="min-w-[300px] p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold text-gray-700">
                      {name} ({animal_type})
                    </h1>
                    <p className="text-sm mt-2 text-gray-700">{geo_range}</p>
                    <img width="400" alt="animal" src={image_link}></img>
                    <div className="mt-4 mb-2 flex justify-between pl-4 pr-2">
                      <button
                        onClick={() =>
                          onClickEdit({
                            name,
                            animal_type,
                            geo_range,
                            image_link,
                            id,
                          })
                        }
                        className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-blue-400 rounded-lg shadow hover:shadow-md transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnimal(id)}
                        className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-red-400 rounded-lg shadow hover:shadow-md transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
