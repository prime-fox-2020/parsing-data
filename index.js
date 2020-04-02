"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

    let readData = fs.readFileSync('./people.csv', 'utf8').split('\n')

    let dataSplitted = []
    for (let i = 0; i < readData.length; i++) {
      dataSplitted.push(readData[i].split(','))
    }

    for (let i = 0; i < dataSplitted.length; i++) {
      let temp = []
      for (let j = 0; j < dataSplitted[i].length; j++) {
        temp.push(dataSplitted[i][j])
      }
      if (i === 0) {
        this._people.push(dataSplitted[i])
      } else {
        let data_person = new Person(temp[0], temp[1], temp[2], temp[3], temp[4], temp[5])
        this._people.push(data_person)
      }
    }
  }

  get file() {
    return this._file
  }

  get people() {
    return this._people
  }

  addPerson(value) {
    this._people.push(value)
    return this._people
  }

  saveDataPerson() {
    let saved = ''

    for (let i = 0; i < this._people.length; i++) {
      if (i === 0) {
        saved += this._people[i] + '\n'
      } else {
        saved += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
        saved += '\n';
      }
    }
    return fs.writeFileSync(`./${this._file}`, saved)
  }
}

let parser = new PersonParser('people.csv')

console.log(parser.people[201]);

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
