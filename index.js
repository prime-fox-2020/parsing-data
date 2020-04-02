"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = Number(id)
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
    this._people = this.readCSV()
  }

  get people() {
    return this._people
  }
  
  readCSV(){
    let data = fs.readFileSync(this._file, 'utf-8').split('\r\n')
    let datas = []
    for(let i=1;i<data.length;i++){
      let temp = []
      temp = data[i].split(',')
      //Input ke class Person
      datas.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]))
    }
    
    return datas
  }
  save(){
    let datas = []
    let data = [["id,first_name,last_name,email,phone,created_at"]]
    this._people.forEach(person => {
      let temp = []
      temp.push(person.id)
      temp.push(person.first_name)
      temp.push(person.last_name)
      temp.push(person.email)
      temp.push(person.phone)
      temp.push(person.created_at)
      datas.push(temp)
    })
    datas.forEach(temp => {
      data.push(temp.join(','))
    })
    fs.writeFileSync(this._file,data.join('\r\n'))
    console.log((data.join('\n')))
  }
  addPerson(first_name,last_name,email,phone) {
    let getID = this.people[this.people.length-1].id + 1
    this._people.push(new Person(getID,first_name,last_name,email,phone,Date.now()))
    
  }

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.addPerson("James","James","jamesjames@yahoo.com","12345")
// console.log(parser.people)
parser.save()