"use strict"

class Person {
  constructor( id, first_name, last_name, email, phone, created_at ){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.date = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
  }
  get people() {
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, date) {
    // let created_at = new Date()
    // let hourUTC = created_at.getUTCHours()
    // if(hourUTC < 10){
    //   hourUTC = '0' + hourUTC
    // }
    // let minUTC = created_at.getMinutes()
    // if(minUTC < 10){
    //   minUTC = '0' + minUTC
    // }
    // created_at = created_at.toISOString().split('.')[0] + '-' + hourUTC + ':' + minUTC // <--- format date sesuai dengan bentuk format tanggal csv awal
    const newMember = new Person(id, first_name, last_name, email, phone, date)
    this.people.push(newMember)
    console.log('Data added !')
    return this
  }

  read(){
    const fs = require('fs')
    const data = fs.readFileSync(`./${this._file}`, 'utf8')
    this._people = []
    const arrayOfString = data.split('\n')

    for(let i = 1; i < arrayOfString.length; i++){
      const buffer = arrayOfString[i].split(',')
      let date = new Date(buffer[5]) // how to formatting date to object
      date = date.toISOString()
      // let date = buffer[5]
      this._people.push(new Person(buffer[0],buffer[1],buffer[2],buffer[3],buffer[4],date))
    }
    return this._people
  }

  save(){
    let writeInCSV = 'id, first_name, last_name, email, phone, created_at\n'
    for(let i = 0; i < this._people.length; i++){
      const temp = Object.values(this._people[i]).join(',')
      if(i === this._people.length-1){
        writeInCSV += `${temp}`
      }
      else {
        writeInCSV += `${temp}\n`
      }
    }
    const fs = require('fs')
    fs.writeFileSync(`./${this._file}`,writeInCSV)
  }

}

let parser = new PersonParser('people.csv')

parser.read()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)


const banyakDataYangDitambahkan = 10

const faker = require('faker')
for(let i = 1; i <= banyakDataYangDitambahkan; i++){
  let firstName = faker.name.firstName()
  let lastName = faker.name.lastName()
  let email = faker.internet.email()
  let phone = faker.phone.phoneNumber()
  let date = faker.date.past().toISOString()
  parser.addPerson(parser.people.length+1, firstName, lastName, email, phone, date)

}
parser.save()
parser.read()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)