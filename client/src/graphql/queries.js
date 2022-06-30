import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      currency
      emoji
    }
  }
`;


export const GET_COUNTRY = gql`
  query GetCountryInfo($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      capital
      currency
      emoji
      emojiU
    }
  }
`;


export const GET_ANIMALS = gql`
  query GetAnimals {
    animals { 
  name
  animal_type
  habitat
  geo_range
  image_link
    }
  }
`;


//-----------------------------------------------------
export const CREATE_ANIMAL = gql`
mutation CreateAnimal($input: CreateAnimalInput!) {
  createAnimal(input: $input) {
    name
    animal_type
    image_link
  }
}
`;  
// {
//   "input": { 
//     "name" : "test animal",
//     "animal_type" : "test type",
//     "image_link" : "test image url"
//   }
// }
//-----------------------------------------------------
