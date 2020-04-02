"use strict"

var fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,create_at = new Date().toISOString()) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.create_at = create_at
  }
}

class PersonParser {
  
  constructor(file) {
    this._file = file
    this._people = this.getData()

  }

  get file() {
    return this._file

  }
  
  get people() {
    return this._people
  }

  getData() {
    let contents = fs.readFileSync('./people.csv', 'utf8').split('\n')
    this._people = []
    for (let i = 0; i < contents.length; i++) {
      contents[i] = contents[i].split(',')
      this._people.push(new Person(contents[i][0], contents[i][1], contents[i][2], contents[i][3], contents[i][4], contents[i][5]))
    }
    return this._people
  }
  
  addPerson(newPerson) {
    this._people.push(newPerson)
  }
  
  savePerson() {
    let arrPeople = []
    for (let i = 0; i < this._people.length; i++) {
      let tampung = []
      for (let key in this._people[i]) {
        tampung.push(this._people[i][key])
      }
      arrPeople.push(tampung)
    }
    fs.writeFileSync(this._file, arrPeople.join('\n'))
  }
}


let parser = new PersonParser('people.csv')
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.addPerson(new Person(`${parser.people.length}`, 'vinastika', 'supiana', 'supiana@gmail.com', '+623435234523542'))

parser.savePerson()