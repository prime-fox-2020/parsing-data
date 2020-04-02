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
let pepKey = arrayPeople[0].split(',');

for (let i = 1; i < arrayPeople.length; i++) {
  let temp = arrayPeople[i].split(',');
  persons.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
}

let strings = [`${pepKey.join(',')}`];
for (let i = 0; i < persons.length; i++) {
  let temp = '';
  for (let j in pepKey) {
    temp += persons[i][pepKey[j]];
    if (j != pepKey.length-1) temp += ',';
  }
  strings.push(temp);
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

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    let persons = this._people;
    let people = fs.readFileSync(this._file, 'utf8');
    let arrayPeople = people.split('\n');

    let pepKey = arrayPeople[0].split(',');
    let strings = [`${pepKey.join(',')}`];
    for (let i = 0; i < persons.length; i++) {
      let temp = '';
      for (let j in pepKey) {
        temp += persons[i][pepKey[j]];
        if (j != pepKey.length-1) temp += ',';
      }
      strings.push(temp);
    }
    let ready = strings.join('\n');

    fs.writeFileSync(this._file, ready);
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// parser.addPerson(new Person('aaa','sss','aaa','bbb','ddd','bbb'));
// parser.save();