"use strict"

const fs = require('fs');

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._file = file;
    this._people = this.read(this.file);
  }

  get people() {
    return this._people;
  }
  set people(param) {
    this._people = param;
  }
  get file() {
    return this._file;
  }
  set file(param) {
    this._file = param;
  }

  addPerson(newPerson) {
    this.people.push(newPerson);
  }

  read(file) {
    const buffer = fs.readFileSync(`./${file}`,'utf8');
    const dataArr = buffer.split('\n');
    const allPersonData  = [];
    for (let i = 1; i < dataArr.length; i++) {
      const personArr = dataArr[i].split(',');
      let date = new Date(personArr[5]);
      console.log(date);
      allPersonData.push(new Person(personArr[0], personArr[1], personArr[2], personArr[3], personArr[4], date));
    }
    return allPersonData;
  }

  save() {
    let writeBack = 'id,first_name,last_name,email,phone,created_at';
    for (let i = 0; i < this.people.length; i++) {
      writeBack += '\n' + Object.values(this.people[i]).join(',');
    }
    fs.writeFileSync(`./${this.file}`, writeBack);
  }

}

let parser = new PersonParser('people.csv');
// parser.addPerson(new Person('201', 'Abab', 'Abadi', 'abab@hactiv8.com', '+628123123', '2012-02-22T10:09:03-08:00'));
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
// console.log(parser.people[20]);

const faker = require('faker');
const fakeData = 10; // Jumlah data palsu yang ingin dibuat;
for(let i = 1; i <= fakeData; i++){
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = faker.internet.email();
  let phone = faker.phone.phoneNumber();
  let date = faker.date.past();
  parser.addPerson(parser.people.length+i, firstName, lastName, email, phone, date);
}

parser.save();