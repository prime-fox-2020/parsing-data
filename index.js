"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readAllData()
  }

  get people() {
    return this._people
  }

  get file(){
    return this._file
  }

  addPerson() {}

  readAllData(){
    const rawData = fs.readFileSync(this._file, 'utf8')
    let arrayOfData = rawData.split('\r\n')
    let dataArrayOfObject = []

    for(let i = 1; i < arrayOfData.length; i++){
      let elements = arrayOfData[i].split(',')
      dataArrayOfObject.push(new Person(elements[0], elements[1], elements[2], elements[3], elements[4], elements[5]))
    }

    return dataArrayOfObject
  }

}

let parser = new PersonParser('people.csv')
console.log(parser.readAllData())

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
