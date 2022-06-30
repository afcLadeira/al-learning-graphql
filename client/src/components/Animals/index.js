import { useQuery } from "@apollo/client";
import { GET_ANIMALS } from "../../graphql/queries";

export default function Animals() {



    const { loading, error, data } = useQuery(GET_ANIMALS);


    return (
        <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
        {loading && <h1>loading</h1>}
        {error && <h1>{JSON.stringify(error)}</h1>}
        {data?.animals && data.animals.map(({name , animal_type , geo_range , image_link}) => (   
              
              <div>
              <div>Name: {name}</div>
              <div>Type: {animal_type}</div>
              <div>Geo range: {geo_range}</div>
              <img width="400" alt="animal" src={image_link}></img>
            </div>))
            }
          </div>
          
    )


}