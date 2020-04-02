"use strict"

const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at = new Date()){
      this.id = id
      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.read()
  }

  read() {
    let data = fs.readFileSync('./people.csv', 'utf8').split('\n')
    let temp = []
    for (let i = 1; i < data.length; i++) {
      data[i] = data[i].split(',')
      let newPerson = new Person(
        data[i][0], 
        data[i][1], 
        data[i][2], 
        data[i][3], 
        data[i][4], 
        data[i][5]
      )
      temp.push(newPerson)
    }
    return temp
  }

  get people() {
    return this._people
  }
  
  addPerson(newPerson) {
    this._people.push(newPerson)
    console.table(this._people)
    return this._people
  }

  get file(){
    return this._file
  }

  save(){
    let result = ['id,first_name,last_name,email,phone,created_at']

    for(let i = 0; i < this._people.length; i++){
      let temp = []

      for(let j in this._people[i]){
        temp.push(this.people[i][j])
      }
      result.push(temp)
    }

    fs.writeFileSync(this.file, result.join('\n'))
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(`${parser.people.length+1}`, 'Fahrul', 'muhammad noer', 'fahrulnoer17@gmail.com', '082318410565'))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()