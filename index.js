"use strict"
const fs = require('fs')

class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(id, firstName, lastName, email, phone, createdAt) {
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.phone = phone
        this.created_at = createdAt
    }
}

const data = fs.readFileSync('./people.csv', 'utf8')
// const tes = process.cwd()
// console.log(data)
// console.log(tes)
const arrayPeople = data.split('\r\n')
let peoples = []
for(let i = 1 ; i < arrayPeople.length; i++){
    let tampung = arrayPeople[i].split(',')
    peoples.push(new Person(tampung[0],tampung[1],tampung[2],tampung[3],tampung[4],tampung[5]))
}
console.log(peoples)

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return this._people
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
