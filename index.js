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
    this._file = file
    this._people = this.read()
  }

  get people() {
    return this._people
  }

  get file(){
    return this._file
  }

  read(){
    let manyData = fs.readFileSync(`./${this._file}`, 'utf-8').split('\n');
    let keys = manyData.shift().split(',');
    let data = [];
    this._people = [];

    for (let i = 0; i < manyData.length; i++) {
      const splitData = manyData[i].split(',');
      let objData = {}
      for (let j = 0; j < splitData.length; j++) {
        objData[keys[j]] = splitData[j]
      }
      data.push(objData)
    }

    data.forEach(el => {
      this._people.push(new Person(
        el.id,
        el.first_name,
        el.last_name,
        el.email,
        el.phone,
        el.created_at
      ))
    });

    return this._people

  }

  addPerson() {
   
  }

  save(){}

}

let parser = new PersonParser('people.csv')

// console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
