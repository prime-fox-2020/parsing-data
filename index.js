"use strict"

const fs = require('fs')
class Person {
  // id,first_name,last_name,email,phone,created_at
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._createdAt = new Date();
  }
}

class PersonParser {

  constructor(file) {
    this._file = fs.readFileSync(file, 'utf8');
    this._people = []
    
    this._file.split('\r\n').forEach((el, i, arr) => {
      if (i > 0) {
        let data = el.split(',');
        this._people.push({
          id: data[0],
          firstName: data[1],
          lastName: data[2],
          email: data[3],
          createdAt: data[4]
        })
      }
    })

  }

  get people() {
    return this._people;
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')
let bagon = new Person((parser.people[parser.people.length - 1].id + 1), 'Bagong', 'Jyay', 'bagong@bagongcorp.com', '0888812121')
console.log(bagon)
// console.log(parser.people)
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
