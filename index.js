"use strict"
const fs = require('fs')

class Person {
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
    this._people = this.getperson()
  }

  get file() {
    return this._file
  }
  get people() {
    return this._people
  }

  getperson () {
    let data = fs.readFileSync(this._file, 'utf-8').split('\n')
    let dataArr = []
    for (let i = 0; i < data.length; i++) {
      let buffer = data[i].split(',')
      dataArr.push(new Person(buffer[0], buffer[1], buffer[2], buffer[3], buffer[4], buffer[5]))
    }
    return dataArr
  }
  save(path = this._file) {
    let data = this._people
    let newData = 'id,first_name,last_name,email,phone,created_at'
    for (let i = 0; i < data.length; i++) {
      newData += ` \n${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at}`;
    }

    fs.writeFileSync(path,newData)
    return `Data has been saved to ${path}`
  }

  addPerson(addNewPerson) {
    this._people.push(addNewPerson)
    return this._people
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(201, 'Tubagus', 'Zuhdi', 'tubagusxxx@gmail.com', '1-234-567-8910'))

console.log(parser.save('people.csv'))

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)