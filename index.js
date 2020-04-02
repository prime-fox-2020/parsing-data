"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
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

  get file() {
    return this._file
  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    const newMember = new Person(id,first_name,last_name,email,phone,created_at);
    this._people.push(newMember);
    console.log('Data added!');
    return this
  }

  read() {
    const fs = require('fs');
    const data = fs.readFileSync(`${this._file}`, 'utf8');
    const str = data.split('\r\n');
    this._people = [];

    for (let i = 1; i < str.length; i++) {
      let temp = str[i].split(',');
      this._people.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]));
    }
    return this._people;
  }
  
  save() {
    let writeCSV = 'id,first_name,last_name,email,phone,created_at\r\n'
    for (let i = 0; i < this._people.length; i++) {
      let temp = Object.values(this._people[i]).join(',');
      if (i === this._people.length-1) {
        writeCSV += `${temp}`;
      }
      else {
        writeCSV += `${temp}\r\n`
      }
    }
    const fs = require('fs');
    fs.writeFileSync(`${this._file}`, writeCSV);
  }
}

let parser = new PersonParser('people.csv')
parser.read();
parser.addPerson(parser.people.length+1, 'Andrean', 'Wira', 'andreanwirapradana@gmail.com', '08964561272' , '2020-07-06T07:23:09-07:00')
console.log(parser.people);
parser.save()
parser.read();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

