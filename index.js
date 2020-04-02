"use strict"
const fs = require('fs')
class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first = first_name
    this.Last_Name = last_name
    this.Email = email
    this.Phone = phone
    this.Create_At = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.temp = []
  }

  get people() {
    let Beta = require('fs')
    let lengthz = Beta.readFileSync(this._file,'utf8').split('\n')
    let Gamma = Beta.readFileSync(this._file,'utf8').split('\n')

    for(var i = 1 ; i <lengthz.length ; i++){
      let temp = Gamma[i].split(',');
      this._people.push(new Person(temp[0],temp[1],temp[2],
      temp[3],temp[4],temp[5]))
    }
    return this._people 
  }

  get file () {
    return this._file
  }

  addPerson (id, first_name, last_name, email, phone, created_at) {
    let newPerson = new Person(id, first_name, last_name, email, phone, created_at);

    this._people.push(newPerson);
    return this._people;
  }

  save() {
    let toBeSaved = this._people;
    let gonnaBeSaved = '';
    if (this._people === null) {
      console.log('failed');
    } else {
      for (let i = 0; i < toBeSaved.length; i++) {
        let tempSaves = Object.values(toBeSaved[i]);
        let joinTempSaves = tempSaves.join();
        gonnaBeSaved += `${joinTempSaves} \n`;
        // console.log(gonnaBeSaved)
      }
      let saveRightNow = fs.writeFileSync('./people.csv', gonnaBeSaved);

      return saveRightNow;
    }
  }
}


let parser = new PersonParser('./people.csv')
var date = new Date()
console.log(`there are ${parser.people.length} people in file ${parser.file}`)
console.log(parser.addPerson('101','2Juan','3San','3asd@gmail','4087',date.toString().slice(0,24)))
parser.save();