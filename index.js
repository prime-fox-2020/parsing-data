"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, createAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createAt = createAt;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = null;
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  set people(value) {
    this._people = value;
  }

  addPerson(firstName, lastName, email, phone, createAt) {
    this.people.push(new Person(this.people.length + 1, firstName, lastName, email, phone, createAt));
  }

  save(file_name) {
    const fs = require('fs');
    let text = 'id,first_name,last_name,email,phone,created_at\n';
    for (let i in this.people){
      text += `${this.people[i].id},${this.people[i].firstName},${this.people[i].lastName},${this.people[i].email},${this.people[i].phone},${this.people[i].createAt}\n`;
    }
    fs.writeFileSync(file_name, text);
  }

}

let parser = new PersonParser('people.csv')
const fs = require('fs');
const data = fs.readFileSync(`./${parser.file}`, 'utf8');
const arr = data.split('\n');
let result = [];
    for (let i = 1; i < arr.length; i++) {
      const buffer = arr[i].split(',');
      result.push(new Person(Number(buffer[0]), buffer[1], buffer[2], buffer[3], buffer[4], new Date(buffer[5])));
    }
parser.people = result;
parser.addPerson('Alam', 'Rumambi', 'alam@gg.com', '1-633-333-3333', new Date());
parser.save(parser.file);


console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
