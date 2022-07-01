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

const COUNTRY_FRAGMENT_NAME = gql`
  fragment NameParts on Country {
    name
    code
  }
`;

export const GET_COUNTRY = gql`
  ${COUNTRY_FRAGMENT_NAME}
  query GetCountryInfo($code: ID!) {
    country(code: $code) {
      ...NameParts
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
      id
      name
      animal_type
      habitat
      geo_range
      image_link
    }
  }
`;

export const GET_ANIMALS_FILTERED = gql`
query GetAnimalsFiltered($input : AnimalsFilterInput) {
  animals(filter: $input) {name}
}

`


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

export const DELETE_ANIMAL = gql`
  mutation DeleteAnimal($deleteAnimalId: ID!) {
    deleteAnimal(id: $deleteAnimalId) {
      id
    }
  }
`;

// {
//   "deleteAnimalId": 5
// }

export const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($input: UpdateAnimalInput) {
    updateAnimal(input: $input) {
      id
      animal_type
      geo_range
      name
      image_link
    }
  }
`;

// {
//   "input": {
//     "id" : 1,
//     "animal_type": "update test"
//   }
// }
