"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
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
  }

  get people() {
    return this._people
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
  }

  read(){
    const data = fs.readFileSync(`./${this._file}`,'utf8')
    const dataSplit = data.split('\n')
    this._people = []
    for (var i = 1; i<dataSplit.length; i++){
      const buffer = dataSplit[i].split(',')
      this._people.push(new Person(buffer[0],buffer[1],buffer[2],buffer[3],buffer[4],buffer[5]))
    }
    return this._people
  }

  save(){
    let writeToCsv = 'id,first_name,last_name,email,phone,created_at\n'
    for (let i = 0; i<this._people.length; i++){
      if (i === this._people.length -1){
        writeToCsv += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}`
      } else {
        writeToCsv += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}\n`
      }
    }

    fs.writeFileSync(`./${this._file}`,writeToCsv)
  }
}

let parser = new PersonParser('people.csv')
parser.read()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)

parser.addPerson(new Person(`${parser.people.length+1}`,'ronaldo','sigorda','rooooonale@mail.com','+123-13345-4646',new Date().toISOString()))
parser.save()

parser.read()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)