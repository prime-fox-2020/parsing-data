"use strict"

//baca csv file

// console.log("TCL: data \n", data);
// console.log("TCL: data", dataArray);

class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}
// console.log(dataObject);

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = this.readData();
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  readData() {
    const fs = require("fs");
    let dataString = fs.readFileSync("people.csv", "utf8");
    let dataArray = dataString.split("\n");
    let dataObject = [];
    for (let i = 1; i < dataArray.length; i++) {
      let temp = dataArray[i].split(",");
      dataObject.push(new Person (temp[0],temp[1],temp[2],temp[3],temp[4],Date(temp[5])));
    }
    return dataObject;
  }

  addPerson(value) {
    this._people.push(value);
  }

  updateData() {
    let strData = "id,first_name,last_name,email,phone,created_at\n";
    for(let i = 0; i < this.people.length; i++) {
        strData += '${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at}\n';
      }
      fs.writeFileSync("people.csv",strData);
  }

}
//

let parser = new PersonParser('people.csv')
parser.addPerson(new Person("201", "zeke", "putra", "pengu@yahoo.com", "0812929282", Date()));
console.log(parser.people[200]);

//
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
