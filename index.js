"use strict"
const fs = require("fs")
const faker = require("faker")


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = new Date(created_at)
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

  get file(){
    return this._file
  }

  
  loadData(){
    let data = fs.readFileSync(this._file , "utf8").split("\r\n")
    const arrayData = []
    for (let i = 1; i < data.length; i++) {
      const splitData = data[i].split(",")
      arrayData.push(new Person(splitData[0],splitData[1],splitData[2],splitData[3],splitData[4],splitData[5]))
    }

    // new people
    return this._people = arrayData
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    return this._people.push(new Person(id, first_name, last_name, email, phone, created_at))
  }

  save(){
    let strData = "id,first_name,last_name,email,phone,created_at\r\n"
    for (let i = 0; i < this._people.length; i++) {
      strData+= `${this._people[i]._id},${this._people[i]._first_name},${this._people[i]._last_name},${this._people[i]._email},${this._people[i]._phone},${this._people[i]._created_at}\r\n`
    }
    fs.writeFileSync("./people.csv", strData)
  }
}
let parser = new PersonParser('./people.csv')
parser.loadData()
let randomFirstName = faker.name.firstName()
let randomLastName = faker.name.lastName()
let randomEmail = faker.internet.email()
let randomPhone = faker.phone.phoneNumber()
let randomDate = faker.date.future()
parser.addPerson("201", randomFirstName, randomLastName, randomEmail, randomPhone, randomDate)
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
