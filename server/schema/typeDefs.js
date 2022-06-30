const { gql } = require("apollo-server");

const typeDefs = gql`

type Animal {
  id: ID!
  name: String!
  latin_name: String
  animal_type: String!
  active_time: String
  length_min: String
  length_max: String
  weight_min: String
  weight_max: String
  lifespan: String
  habitat: String
  diet: String
  geo_range: String
  image_link: String!
  }



type Country {
  code: ID!
  name: String!
  native: String!
  phone: String!
  capital: String
  currency: String
  emoji: String!
  emojiU: String!
  }


 type Query {
    countries: [Country!]!
    country(code: ID!): Country
    animals: [Animal]!
 }


 input CreateAnimalInput {
  name: String!
  animal_type: String!
  geo_range: String = "Unknown"
  image_link: String!
 }

type Mutation {
    createAnimal(input: CreateAnimalInput!) : Animal!
}
 
`;

module.exports = { typeDefs };
