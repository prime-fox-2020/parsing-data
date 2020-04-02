"use strict"
let fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, date) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.date = date
  }
}

// console.log(arr)

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.readFile() // array of object.  
  }
  readFile() {

    let data = fs.readFileSync(this.file, 'utf8')
    // console.log(data)
    let arrData = data.split('\n')
    // console.log(arrData)
    let arr = [];
    for (var i = 1; i < arrData.length; i++) {
      let temp = (arrData[i].split(','))
      arr.push(new Person(temp[0], temp[1], temp[2], temp[3], temp[4], Date(temp[5]) ))
    }
    return arr
  }
  get file() {
    return this._file
  }

  get people() {
    // this._people = this.readFile()
    return this._people
  }

  addPerson(value) {
    this._people.push(value)
  }

  save(){
    let str = 'id,first_name,last_name,email,phone,date \n'
    for(let j=0;j<this._people.length;j++){
      str+= `${this._people[j].id},${this._people[j].first_name},${this._people[j].last_name},${this._people[j].email},${this._people[j].phone},${this._people[j].date}\n`
    }
    fs.writeFileSync('people.csv',str)
    console.log('saving file, please wait..')
  }
}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(201,'aa','bb','abc@gmail.com','123443332',Date()))
parser.save();
console.log(parser.people[parser.people.length - 1])

// console.log(parser)

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
