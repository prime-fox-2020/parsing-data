"use strict"
const fs = require('fs')
// console.log(new Date('2013-07-06T07:23:09-07:00'))
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at = new Date().toISOString()) {
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
    this._people = null
    this._people = this.read()
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  read() {
    let data = fs.readFileSync(this._file, 'utf-8').split('\n')
    let arrData = []
    for(let i = 1; i < data.length; i++) {
      let person = data[i].split(',')
      arrData.push(new Person(person[0], person[1], person[2], person[3], person[4], person[5]))
    }
    return arrData
  }

  save(path = this._file) {
    let data = this._people
    let newData = `id,first_name,last_name,email,phone,created_at`
    for (let i = 0; i < data.length; i++) {
      newData += ` \n${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at}`;
    }

    fs.writeFileSync(path,newData)
    return `Save data to ${path} successful`;
  }

  addPerson(addNewPerson) {
    this._people.push(addNewPerson)
    return this._people
  }

}

let parser = new PersonParser('people.csv')
// console.log(parser)
parser.addPerson(new Person(201, 'Rinoto', 'Harto', 'rino@xxxxx.com', '+62-8999999'))
console.log(parser.save('newPeople.csv'));

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
