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

  addPerson(id, first_name, last_name, email, phone) {
    let created_at = new Date()
    let hourUTC = created_at.getUTCHours()
    if(hourUTC < 10){
      hourUTC = '0' + hourUTC
    }
    let minUTC = created_at.getMinutes()
    if(minUTC < 10){
      minUTC = '0' + minUTC
    }
    created_at = created_at.toISOString().split('.')[0] + '-' + hourUTC + ':' + minUTC // <--- format date sesuai dengan bentuk format tanggal csv awal
    const newMember = new Person(id, first_name, last_name, email, phone, created_at)
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
      let date = buffer[5]
      let formatDate = new Date(date) // <-- formatting data to type of object
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

parser.addPerson(parser.people.length+1, 'Charles', 'Jonathan', 'chrlsjnthn@gmail.com', '1-712-327-5317')
parser.save()
parser.read()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)