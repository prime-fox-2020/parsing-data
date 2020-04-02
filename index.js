"use strict"

let fs = require ('fs')

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = new Date(createdAt)
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.generateData()
  }
  get people() {
    return this._people
  }

  addPerson(input) {
    this._people.push(input)
  }

  generateData(){
    var person_object = []
    let data = fs.readFileSync(this._file).toString().split('\n')
    for(let i = 1; i < data.length; i++){
      let person_data = data[i].split(',')
      let objek = new Person(person_data[0],person_data[1],person_data[2],person_data[3],person_data[4],person_data[5])
      person_object.push(objek)
    }
    return person_object
  }
  
  save(){
    var string = 'id,first_name,last_name,email,phone,created_at\n'
    let keys = Object.keys(this._people[0])
    for(let i=0; i < this._people.length; i++){
      for(let j = 0; j < keys.length; j++){
        string += this._people[i][keys[j]]
        if(j !== keys.length-1){
          string += ','
        }
      }
      if(i !== this._people.length-1){
        string += '\n'
      }
    }
    console.log(`There are ${this._people.length} Peoples on ${this._file}`)
    fs.writeFileSync(this._file,string)
  }
}
let parser = new PersonParser('people.csv')
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.addPerson(new Person(parser.people.length+1,'Elvan','Rafif','elvan@gmail.com','081234567890','2020-04-27T00:45:57-07:00'))
parser.addPerson(new Person(parser.people.length+1,'Abia ','Farrel','afe@gmail.com','089856473884','2020-05-27T00:45:57-07:00'))
parser.addPerson(new Person(parser.people.length+1,'Raihan','Rahmatullah','RR@gmail.com','08421321908','2015-09-27T00:45:57-07:00'))
parser.save()
