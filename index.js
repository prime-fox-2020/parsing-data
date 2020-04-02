"use strict"

const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
      this.id = id
      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.reader()
  }

  reader() {
    let buffer = fs.readFileSync('./people.csv', 'utf8').split('\n')
    let temp = []
    for (let i = 1; i < buffer.length; i++) {
      buffer[i] = buffer[i].split(',')
      temp.push(new Person(buffer[i][0], buffer[i][1], buffer[i][2], buffer[i][3], buffer[i][4], buffer[i][5]))
    }
    return temp
  }

  get people() {
    return this._people
  }
  
  get file(){
    return this._file
  }

  addPerson(newPerson) {
    this._people.push(newPerson)
    console.table(this._people)
    return this._people
  }

  save(){
    let answer = ['id,first_name,last_name,email,phone,created_at']
    for(let i=0; i<this._people.length; i++){
      let temp = []
      for(let k in this._people[i]){
        temp.push(this.people[i][k])
      }
      answer.push(temp)
    }
    fs.writeFileSync(this.file, answer.join('\n'))
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(`${parser.people.length + 1}`, 'Bima', 'Sakti', 'galaxy8@gmail.com', '010000099917', new Date()))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()