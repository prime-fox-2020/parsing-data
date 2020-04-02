"use strict"

const fs =require('fs')

//read
const data=fs.readFileSync("people.csv","utf8")


const arrayOfString=data.split('\n')

let arrayOfObject=[]


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at= new Date().toISOString()){
    this.id=id,
    this.first_name=first_name,
    this.last_name=last_name,
    this.email=email,
    this.phone=phone,
    this.created_at=created_at
  }
}

for (let i = 1; i < arrayOfString.length; i++) {
  const buffer=arrayOfString[i].split(',')
  arrayOfObject.push(new Person(buffer[0],buffer[1],buffer[2],buffer[3],buffer[4],buffer[5]))
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }


  get people() {
    return this._people
  }

  set people(length){
    this._people=length
  }

  get file(){
    return this._file
  }

  set file(name){
    this._file=name
  } 
  
  addPerson(id, first_name, last_name, email, phone, created_at= new Date().toISOString()) {
    let x=new Person(id, first_name, last_name, email, phone, created_at)
    arrayOfObject.push(x)
    return this
  }
  save(){
    let data='id, first_name, last_name, email, phone, created_at'
    arrayOfObject.forEach(arr => {
      data += `\n${arr.id},${arr.first_name},${arr.last_name},${arr.email},${arr.phone},${arr.createdAt=new Date().toISOString()}`;
    });
    fs.writeFileSync(this._file,data)
  }

}

let parser = new PersonParser('people.csv')
parser.people=arrayOfObject

const faker = require('faker')
const jumlahData = 5


for(let i = 1; i <= jumlahData; i++){
  let firstName = faker.name.firstName()
  let lastName = faker.name.lastName()
  let email = faker.internet.email()
  let phone = faker.phone.phoneNumber()
  let date = faker.date.past().toISOString()
  parser.addPerson(parser.people.length+1, firstName, lastName, email, phone, date)

}
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)


