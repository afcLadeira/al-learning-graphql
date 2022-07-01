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
      return animalsDB.animals.sort((a,b) => a.id -b.id);
    },
  },
  Mutation: {
    createAnimal: async (parent, arg) => {
      const animal = arg.input;

      animalsDB.setAnimals([...animalsDB.animals, {...animal, id:animalsDB.animals.length ? animalsDB.animals.length + 1 : 1 }]);

      await fsPromises.writeFile(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify(animalsDB.animals)
      );
      return animal;
    },
    updateAnimal: async (parent, arg) => {
      const animal = arg.input;

      let findAnimal = animalsDB.animals.find((an) => an.id == animal.id);

    //   for(let key in animal) {
    //     findAnimal[key] = animal[key]
    //   }

      if (findAnimal) {

        findAnimal = { ...findAnimal, ...animal };

        let otherAnimals = animalsDB.animals.filter((an) => an.id != animal.id);
        animalsDB.setAnimals([...otherAnimals, findAnimal]);

        await fsPromises.writeFile(
          path.join(__dirname, "../data/animals.json"),
          JSON.stringify(animalsDB.animals)
        );
      }
      return findAnimal;
    },
    deleteAnimal: async (parent, arg) => {
        const animalId = arg.id;

        let otherAnimals = animalsDB.animals.filter((an) => an.id != animalId);
  
     
          animalsDB.setAnimals([...otherAnimals]);
  
          await fsPromises.writeFile(
            path.join(__dirname, "../data/animals.json"),
            JSON.stringify(animalsDB.animals)
          );
        
        return { id: animalId};
    }

  },

};

module.exports = { resolvers };
