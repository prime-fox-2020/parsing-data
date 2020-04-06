"use strict"

const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createAt) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createAt = new Date(createAt).toLocaleDateString()
  }

  string = () => {
    let createDate = JSON.stringify(this.createAt).replace('\"','').replace('"','')
    createDate = createDate === 'Invalid Date' ? new Date(Date.now()).toLocaleDateString() : createDate;
    return [this.id, this.firstName, this.lastName, this.email, this.phone, createDate].join();
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._header = ''
  }

  get people() {
    return this._people;
  }

  addPerson(person) {
    this._people.push(person);
  }

  get file() {
    return this._file;
  }

  set header(string) {
    this._header = string;
  }

  save = () => {
    fs.writeFileSync(this._file,[this._people.map(data => data.string()).join('\n')].join('\n'))
  }

}

let parser = new PersonParser('people.csv')
let rawData = fs.readFileSync(parser.file,'utf8').split('\n');
parser.header = rawData[0];

for (let p in rawData) {
  parser.addPerson(new Person(...rawData[+p].split(',')))
}
// Test case
parser.addPerson(new Person(...['007','Yoyok','Permaficus','abukhalif2019@gmailcom','+1-87783638374']))
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
