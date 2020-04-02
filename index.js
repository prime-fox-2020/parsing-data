"use strict"


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
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
    this._people = null
  }

  get people() {
    return this._people
  }
  set people(param){
    return this._people = param
  }

  get file() {
    return this._file
  }
  set file(param){
    return this._file=param
  }

  readFile(){
    const fs =require('fs');
    //read
    const data = fs.readFileSync('./'+this._file,'utf8');
    //Convert jadi ArrayOfString
    const dataArrString = data.split('\r\n')
    //conver Jadi Object
    this._people = [];
    for (let i = 1; i < dataArrString.length; i++) {
      const temp = dataArrString[i].split(',');   
      this._people.push(new Person(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5]))
    }
  }

  addPerson(newData) {
    this.people.push(newData)
  }

  save(){
    //Ubah Data jadi String
    let strData='id,first_name,last_name,email,phone,created_at \r\n'
    for (let i = 0; i < parser.people.length; i++) {
      if(i!==parser.people.length-1){
        strData += `${parser.people[i].id},${parser.people[i].first_name},${parser.people[i].last_name},${parser.people[i].email},${parser.people[i].phone},${parser.people[i].created_at}\r\n`
      }else{
        strData += `${parser.people[i].id},${parser.people[i].first_name},${parser.people[i].last_name},${parser.people[i].email},${parser.people[i].phone},${parser.people[i].created_at}`
      }
    }

    //Write File
    const fs =require('fs');
    fs.writeFileSync('./'+this._file,strData);
  }


}

let waktuNow = new Date();

//Proses
let parser = new PersonParser('people.csv')
parser.readFile()
parser.addPerson(new Person(parser.people.length+1,'Nur','Habib','Nurhabib_tes@gmail.com','080989999',waktuNow))
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

