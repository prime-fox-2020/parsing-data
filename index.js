"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at; 
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = this.read(this.file);
  }

  get people() {
    return this._people;
  }
  set people(param) {
    this._people = param;
  }
  get file() {
    return this._file;
  }
  set file(param) {
    this._file = param;
  }

  addPerson(array, person) {
    array.push(person);
  }

  read(file) {
    const buffer = fs.readFileSync(`./${file}`,'utf8');
    const dataArr = buffer.split('\n');
    const allPersonData  = [];
    for (let i = 1; i < dataArr.length; i++) {
      const personArr = dataArr[i].split(',');
      const personObj = new Person(personArr[0], personArr[1], personArr[2], personArr[3], personArr[4], personArr[5]);
      this.addPerson(allPersonData, personObj);
    }
    return allPersonData;
  }

  write() {
    
  }

}

let parser = new PersonParser('people.csv');

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
