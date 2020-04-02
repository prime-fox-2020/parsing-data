"use strict"

let fs = require('fs')
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
    let rawStr = fs.readFileSync('./people.csv/', 'utf8')
    let splitStr = rawStr.split('\r\n')

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
    let str = 'id,first_name,last_name,email,phone,created_at\r\n'
    for(let a = 0; a < this.people.length; a++){
        str += `${this.people[a].id},${this.people[a].first_name},${this.people[a].last_name},${this.people[a].email},${this.people[a].phone},${this.people[a].created_at}\r\n`
    }
    fs.writeFileSync('people.csv', str)
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(201, 'Merritt', 'Joyce', 'malesuada.fringilla@elitNullafacilisi.edu', '1-702-580-4785', Date()))

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()
console.log(parser.people[200])
