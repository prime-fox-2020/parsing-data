"use strict"

const fs = require('fs')
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
    this._people = this.getData()
  }

  getData() {
    let data = fs.readFileSync('./dummy.csv', 'utf8').split('\n')
    let temp = []
    for (let i = 1; i < data.length; i++) {
      data[i] = data[i].split(',')
      temp.push(new Person(
        data[i][0], 
        data[i][1], 
        data[i][2], 
        data[i][3], 
        data[i][4], 
        data[i][5]))
    }
    console.table(temp)
    return temp
  }

  get people() {
    return this._people
  }
  
  addPerson() {}

}

let parser = new PersonParser('dummy.csv')

//console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
console.log(`There are ${parser.people.length -1} people in the file '${parser.file}'.`)
