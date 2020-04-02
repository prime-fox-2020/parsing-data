"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, createdAt){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.read();
  }

  get people() {
    return this._people;
  }

  get file(){
    return this._file;
  }

  read(){
    let manyData = fs.readFileSync(`./${this.file}`, 'utf-8').split('\n');
    let keys = manyData.shift().split(',');
    let data = [];
    this._people = [];

    for (let i = 0; i < manyData.length; i++) {
      const splitData = manyData[i].split(',');
      let objData = {};
      for (let j = 0; j < splitData.length; j++) {
        objData[keys[j]] = splitData[j];
      }
      data.push(objData);
    }

    data.forEach(el => {
      this._people.push(new Person(
        el.id,
        el.first_name,
        el.last_name,
        el.email,
        el.phone,
        // new Date (el.created_at)
        el.created_at
      ))
    });

    return this._people;
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    this._people.push(new Person(
      id,
      first_name,
      last_name,
      email,
      phone,
      created_at
    ));

    return this;
  }

  save(){
    let data = 'id,first_name,last_name,email,phone,created_at';
    
    this.people.forEach(el => {
      data += `\n${el.id},${el.first_name},${el.last_name},${el.email},${el.phone},${el.createdAt}`;
    });

    console.log(data)

    fs.writeFileSync(`./${this.file}`, data);
  }

}

let parser = new PersonParser('people.csv');

parser.addPerson(
  '202',
  'Kendrick',
  'Lamar',
  'kendricklamar@mail.com',
  '1-373-588-1900',
  '2012-07-15T12:06:16-07:00'
);

parser.save();

console.log(parser.people);
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
