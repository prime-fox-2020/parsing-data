"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = Number(id);
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.readData();
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  readData() {
    let data = fs.readFileSync('people.csv', 'utf-8').split('\n');
    let hasil = [];
    
    for (let a = 1; a < data.length; a++) {
      let tampung = data[a].split(',');
      hasil.push(new Person(tampung[0], tampung[1], tampung[2], tampung[3], tampung[4], new Date(tampung[5].slice(0, tampung[5].length-1))));
    }
    return hasil;
  }

  addPerson(newPerson) {
    
  }

  savePerson() {

  }
}

let parser = new PersonParser('people.csv');
console.log(parser);

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
