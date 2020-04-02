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
    this._phone = phone;
    this._createdAt = new Date();
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = [];
    
    fs.readFileSync(file, 'utf8').split('\r\n').forEach((el, i, arr) => {
      if (i > 0) {
        let data = el.split(',');
        this._people.push({
          _id: data[0],
          _firstName: data[1],
          _lastName: data[2],
          _email: data[3],
          _phone: data[4],
          _createdAt: new Date(data[5])
        })
      }
    });
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(obj) {
    this._people.push(obj);
  }

  save() {
    let personData = 'id,first_name,last_name,email,phone,created_at';
    this._people.forEach((el) => {
      personData += `\r\n${el._id},${el._firstName},${el._lastName},${el._email},${el._phone},${el._createdAt.toISOString()}`;
      // console.log(`${el._id}, ${el._firstName}, ${el._lastName}, ${el._email}, ${el._createdAt}\r\n`)
    })
    fs.writeFileSync(this._file, personData);
  }

}

let parser = new PersonParser('people.csv');
// console.log(parser.people)
parser.addPerson(new Person(parseInt(parser.people[parser.people.length - 1]._id) + 1, 'Bagong', 'Jyay', 'bagong@bagongcorp.com', '0888812121'));
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);

parser.save();