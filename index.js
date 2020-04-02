"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at = new Date()) {
    this.id = Number(id),
      this.first_name = first_name,
      this.last_name = last_name,
      this.email = email,
      this.phone = phone,
      this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.read()
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  read() {
    let data = fs.readFileSync(this._file, 'utf-8').split("\r\n")

    let peoples = []
    for (let i = 1; i < data.length; i++) {
      let person = data[i].split(',');
      peoples.push(new Person(person[0], person[1], person[2], person[3], person[4], person[5]))
    }
    return peoples
  }

  addPerson(addNewPerson) {
    this._people.push(addNewPerson)
    return this._people
  }

  save(path = this._file) {
    let data = this._people
    let newData = `id,first_name,last_name,email,phone,created_at`
    for (let i = 0; i < data.length; i++) {
      newData += ` \n${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${data[i].created_at.toISOString()}`;
    }

    fs.writeFileSync(path,newData)
    return `Save data to ${path} successful`;
  }
}

let parser = new PersonParser('people.csv')
console.clear();
parser.addPerson(new Person(201, 'adam', 'wijata', 'adama@wijata', +628566251));
console.log(parser.people[1]);
console.log(parser.people[200]);
console.log(parser.save('newPeoples.csv'));
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
