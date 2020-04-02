"use strict"

const fs = require('fs');

class Person {
  
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.phone = phone;
    this.created_at = createdAt;
  }

}

let persons = [];
let people = fs.readFileSync('people.csv', 'utf8');
let arrayPeople = people.split('\n');

for (let i = 0; i < arrayPeople.length; i++) {
  let temp = arrayPeople[i].split(',');
  persons.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.peoples(file);
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file;
  }

  peoples(file) {
    let persons = [];
    let people = fs.readFileSync(file, 'utf8');
    let arrayPeople = people.split('\n');

    for (let i = 1; i < arrayPeople.length; i++) {
      let temp = arrayPeople[i].split(',');
      persons.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
    }
    return persons;
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// console.log(parser);
