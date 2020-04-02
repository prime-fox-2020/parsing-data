"use strict"
const fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, createdAt){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.read();
    this._date = this.saveDate();
  }

  get people() {
    return this._people;
  }

  get file(){
    return this._file;
  }

  get date(){
    return this._date
  }

  read(){
    let manyData = fs.readFileSync(`./${this.file}`, 'utf-8').split('\n');
    let keys = manyData.shift().split(',');
    let data = [];
    this._people = [];

    for (let i = 0; i < manyData.length; i++) {
      const splitData = manyData[i].split(',');
      let objData = {};
      for (let j = 0; j < splitData.length; j++) {
        objData[keys[j]] = splitData[j];
      }
      data.push(objData);
    }


    data.forEach(el => {
      this._people.push(new Person(
        Number(el.id),
        el.first_name,
        el.last_name,
        el.email,
        el.phone,
        new Date (el.created_at.slice(0, 10))
        // el.created_at
      ));
    });
    return this._people;
  }

  saveDate(){
    let manyData = fs.readFileSync(`./${this.file}`, 'utf-8').split('\n');
    let keys = manyData.shift().split(',');
    let data = [];
    this._date = []

    for (let i = 0; i < manyData.length; i++) {
      const splitData = manyData[i].split(',');
      let objData = {};
      for (let j = 0; j < splitData.length; j++) {
        objData[keys[j]] = splitData[j];
      }
      data.push(objData);
    }

    data.forEach(el => {
      this._date.push(el.created_at)
    });

    return this._date
  }

  getDate(year, month, date){
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    let result = `${year}-${month}-${date}T${hour}:${minute}:${second}-${Math.round(Math.random()) === 1 ? '07' : '08'}:00`;
    return result;
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    this._people.push(new Person(
      id,
      first_name,
      last_name,
      email,
      phone,
      new Date (created_at.slice(0, 10))
    ));
    this._date.push(created_at)
  }

  save(){
    let keys = 'id,first_name,last_name,email,phone,created_at';
    const data = this.people;
    const date = this.date;

    for (let i = 0; i < data.length; i++) {
      keys += `\n${data[i].id},${data[i].first_name},${data[i].last_name},${data[i].email},${data[i].phone},${date[i]}`;
    }

    fs.writeFileSync(`./${this.file}`, keys);
  }
}

let parser = new PersonParser('people.csv');

parser.addPerson(
  parser.people.length + 1,
  'Kendrick',
  'Lamar',
  'kendricklamar@mail.com',
  '1-373-588-1900',
  parser.getDate(2011,12,20)
);
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);