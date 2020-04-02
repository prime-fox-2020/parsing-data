"use strict"
const fs = require('fs');

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
    this._people = this.readAllData()
  }

  get people() {
    return this._people
  }

  get file(){
    return this._file
  }

  addPerson(objOfPerson) {
    this._people.push(objOfPerson)
    console.log(objOfPerson)
    this.save()
  }

  readAllData(){
    const rawData = fs.readFileSync(this._file, 'utf8')
    let arrayOfData = rawData.split('\r\n')
    let dataArrayOfObject = []

    for(let i = 1; i < arrayOfData.length; i++){
      let elements = arrayOfData[i].split(',')
      dataArrayOfObject.push(new Person(elements[0], elements[1], elements[2], elements[3], elements[4], elements[5]))
    }

    return dataArrayOfObject
  }

  save(){
    let dataArrayOfObject = this._people
    const header = 'id,first_name,last_name,email,phone,created_at\r\n'
    let rawData = header
    for(let i = 0; i < dataArrayOfObject.length; i++){
      if(i === dataArrayOfObject.length - 1){
        rawData += `${dataArrayOfObject[i].id},${dataArrayOfObject[i].first_name},${dataArrayOfObject[i].last_name},${dataArrayOfObject[i].email},${dataArrayOfObject[i].phone},${dataArrayOfObject[i].created_at}`
      }else{
        rawData += `${dataArrayOfObject[i].id},${dataArrayOfObject[i].first_name},${dataArrayOfObject[i].last_name},${dataArrayOfObject[i].email},${dataArrayOfObject[i].phone},${dataArrayOfObject[i].created_at}\r\n`
      }
    }
    fs.writeFileSync('people.csv', rawData)
  }

}

let parser = new PersonParser('people.csv')
let fadhlan = new Person(parser.people.length+1, 'Fadhlan', 'Fariz', 'fadhlan@outlook.co.id', '021-2424123', '2014-01-02T08:27:26-08:00')
parser.addPerson(fadhlan)

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
