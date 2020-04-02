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
    this._people = this.readData()
  }

  get people() {
    return this._people
  }
  get file() {
    return this._file
  }

  readData(){
    let rawStr = fs.readFileSync('people.csv', 'utf8')
    let splitStr = rawStr.split('\n')

    let arrOfPersons = []

    for(let a = 1; a < splitStr.length; a++){
    let selector = splitStr[a].split(',')
    arrOfPersons.push(new Person(selector[0], selector[1], selector[2], selector[3], selector[4], Date(selector[5]), ))
    }

    return arrOfPersons
  }

  addPerson(obj) {
    this.people.push(obj)
  }

  save(){
    let str = 'id,first_name,last_name,email,phone,created_at\n'
    for(let a = 0; a < this.people.length; a++){
        str += `${this.people[a].id},${this.people[a].first_name},${this.people[a].last_name},${this.people[a].email},${this.people[a].phone},${this.people[a].created_at}\n`
    }
    fs.writeFileSync(this._file, str)
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(201, 'Jap', 'Hendy', 'japhendy@gmail.com', '09876345', Date()))

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

parser.save()

