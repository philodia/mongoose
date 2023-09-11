const mongoose = require('mongoose');

// Définir un schéma pour le modèle "Person"
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Créer un modèle Mongoose à partir du schéma
const Person = mongoose.model('Person', personSchema);

// Exporter le modèle pour l'utiliser dans d'autres fichiers
module.exports = Person;

// **Création et enregistrement d'un enregistrement d'un modèle**

const newPerson = new Person({
  nom: 'John Doe',
  âge: 30,
  favoriteFoods: ['Pizza', 'Burger'],
});

newPerson.save((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personne enregistrée avec succès :', data);
  }
});


// **Création de plusieurs enregistrements avec `Model.create()`**

const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Burger', 'Pizza'] },
  { name: 'Charlie', age: 40, favoriteFoods: ['Steak', 'Pasta'] },
];

Person.create(arrayOfPeople, (err, people) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personnes créées avec succès :', people);
  }
});


// **Recherchez toutes les personnes ayant un prénom**


Person.find({ nom: 'John' }, (err, people) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personnes avec le prénom John :', people);
  }
});


// **Recherchez une seule personne qui a un certain aliment dans ses favoris**

Person.findOne({ favoriteFoods: 'Pizza' }, (err, person) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personne qui aime la Pizza :', person);
  }
});


// ** Recherchez une personne par `_id`**

const personId = 'your_id_here'; // Remplacez par un véritable _id
Person.findById(personId, (err, person) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personne trouvée par _id :', person);
  }
});


// **Effectuez des mises à jour classiques**


// Supposez que vous avez trouvé une personne par _id comme dans l'étape précédente

person.favoriteFoods.push('Sushi'); // Ajoutez "Sushi" aux favoris
person.save((err, updatedPerson) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personne mise à jour avec succès :', updatedPerson);
  }
});

// **Effectuer de nouvelles mises à jour sur un document à l'aide de `findOneAndUpdate()`**

Person.findOneAndUpdate(
  { nom: 'Alice' },
  { âge: 20 },
  { new: true }, // Cela renverra le document mis à jour
  (err, updatedPerson) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Personne mise à jour avec succès :', updatedPerson);
    }
  }
);


//**Supprimer un document à l'aide de `findByIdAndRemove()`**


// Supprimez une personne par _id comme dans l'étape précédente
Person.findByIdAndRemove(personId, (err, removedPerson) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Personne supprimée avec succès :', removedPerson);
  }
});


// **Supprimer de nombreux documents avec `Model.remove()`**

Person.remove({ nom: 'Mary' }, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Nombre de personnes supprimées : ${result.deletedCount}`);
  }
});

// **Aides aux requêtes de recherche en chaîne pour affiner les résultats de recherche**

Person.find({ favoriteFoods: 'Burritos' })
  .sort('nom')
  .limit(2)
  .select('-âge')
  .exec((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Résultats de la recherche en chaîne :', data);
    }
  });
