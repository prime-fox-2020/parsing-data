"use strict"

const fs    = require('fs');
const faker = require('faker');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt){
    this._id          = id;
    this._firstName   = firstName;
    this._lastName    = lastName;
    this._email       = email;
    this._phone       = phone;
    this._createdAt  = new Date(createdAt);
  }
}

class PersonParser {

  constructor(file) {
    this._file   = file
    this._people = this.loadData();
  }

  get people() {
    return this._people
  }

  set people(val){
    this._people = val;
  }

  get file(){
    return this._file;
  }
  
  set file(val){
    this._file = val;
  }

  loadData(){
    const data   = fs.readFileSync(this._file, "utf8").split("\n");
    const arrData = [];
    // new People
    for(let i = 1; i < data.length; i++){
      const person = data[i].split(",");
      arrData.push(new Person(person[0], person[1], person[2], person[3], person[4], person[5]));
    }
    this._people = arrData;
    // return arrData;
  }
  addPerson(id, firstName, lastName, email, phone, createdAt) {
    return this._people.push(new Person(id, firstName, lastName, email, phone, createdAt));
  }

  save(){
    let str = "id,first_name,last_name,email,phone,created_at";
    for(let i = 0; i < this._people.length; i++){
      str += `\n${this._people[i]._id}, ${this._people[i]._firstName}, ${this._people[i]._lastName}, ${this._people[i]._email}, ${this._people[i]._phone}, ${this._people[i]._createdAt}`;
    }
    // console.log(str)
    fs.writeFileSync("./people.csv", str);
  }
}


let parser = new PersonParser('people.csv');
// console.log(parser);
// parser.loadData()
// parser.addPerson()
// parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

parser.addPerson("201", "Muhammad", "Afif", "abc@laksl.com", "09090", "1-906-235-0832,2013-07-06T07:23:09-07:00")
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();

// FAkER TIME :D
const randId        = Math.floor(Math.random() * 1000);
const randFirstName = faker.name.firstName();
const randLastName  = faker.name.lastName();
const randEmail     = faker.internet.email();
const randPhone     = faker.phone.phoneNumber();
const randDate      = faker.date.past();

parser.addPerson(randId, randFirstName, randLastName, randEmail, randPhone, randDate)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save();
