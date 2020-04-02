"use strict"

const fs = require('fs')
const data = fs.readFileSync('./people.csv', 'utf8')
// console.log(data)


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

//convert
const dataInArray = data.split('\n')
// console.log(dataInArray)

const dataInArrayOfObject = []
for (let i = 1; i < dataInArray.length; i++){
  const temp = dataInArray[i].split(',')
  const tempDate = new Date (temp[5])
  dataInArrayOfObject.push(new Person(temp[0], temp[1], temp[2], temp[3], temp[4], tempDate))
}
// console.log(dataInArrayOfObject)

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return this._people
  }

  set people(param){
    this._people = param
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    const trueDate = new Date(created_at)
    this._people.push(new Person(id, first_name, last_name, email, phone, trueDate))
    return this
  }

  save(){
    var dataInString = ['id, first_name, last_name, email, phone, created_at\n']
    for (let i = 0; i < this._people.length; i++){
      var temp = []
      for (let key in this._people[i]){
        temp.push(this._people[i][key])
      }
      dataInString.push(`${temp.join(',')}\n`)
    }
    fs.writeFileSync(this._file, dataInString.join('').trim())
  }
}

let parser = new PersonParser('people.csv')
parser.people = dataInArrayOfObject
// console.log(parser)
parser.addPerson(parser.people.length, 'Reza', 'Rizky', 'xxx@gmail.com', '123456', '2020-04-01')
// console.log(parser.people[parser.people.length-1])

parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)