const fsPromises = require("fs").promises;
const path = require("path");

const countriesDB = {
  countries: require("../data/filteredCountries.json"),
  setCountries: function (data) {
    this.countries = data;
  },
};
const animalsDB = {
  animals: require("../data/animals.json"),
  setAnimals: function (data) {
    this.animals = data;
  },
};

const resolvers = {
  Query: {
    countries() {
      return countriesDB.countries;
    },
    country(parent, args, context, info) {
      return countriesDB.countries.find(
        (country) => country.code === args.code
      );
    },
    animals() {
      return animalsDB.animals;
    },
  },
  Mutation: {
    createAnimal: async (parent, arg) => {
      const animal = arg.input;

      animalsDB.setAnimals([...animalsDB.animals, animal]);
      await fsPromises.writeFile(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify(animalsDB.animals)
      );
      return animal;
    },
  },
};

module.exports = { resolvers };
