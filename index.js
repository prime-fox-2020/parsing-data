"use strict"
const fs = require('fs')

//template untuk object
class Person {
    // Look at the above CSV file
    // What attributes should a Person object have?
    constructor(id, firstName, lastName, email, phone, createdAt) {
        this.id = id
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.phone = phone
        this.created_at = createdAt
    }
}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = this.readFile()
    }

    get people() {
        return this._people
    }
    get file() {
        return this._file
    }

    addPerson(first_name, last_name, email, phone, created_at = new Date(), id = this.people.length + 1) {
        created_at = `${created_at.getFullYear()}-${created_at.getMonth()}-${created_at.getDate()}T${created_at.getHours()}:${created_at.getMinutes()}:${created_at.getSeconds()}-${created_at.getUTCHours()}:00`
        //penampung
        let adding = new Person(id, first_name, last_name, email, phone, created_at)
        //push ke array of object
        this.people.push(adding)
        return this._people
    }

    readFile() {
        //proses array of object people.csv
        const data = fs.readFileSync(this._file, 'utf8')
        // const tes = process.cwd()
        // console.log(data)
        // console.log(tes)
        const arrayPeople = data.split('\r\n')
        let peoples = []
        for (let i = 1; i < arrayPeople.length; i++) {
            let tampung = arrayPeople[i].split(',')
            peoples.push(new Person(tampung[0], tampung[1], tampung[2], tampung[3], tampung[4], tampung[5]))
        }
        // console.log(peoples)
        //proses array of object people.csv selesai
        return peoples
    }

    saveFile() {
        let poepleObject = this.people
        let string = ['id,first_name,last_name,email,phone,created_at']
        // console.log(poepleObject)
        for (let i = 0; i < poepleObject.length; i++) {
            let temp = ''
            for (let key in poepleObject[i]) {
                temp += poepleObject[i][key]
                if (key !== 'created_at') {
                    temp += ','
                } 
                // if (key === 'created_at') {
                //     temp += ''
                // }
            }
            string.push(temp)
        }
        string = string.join('\r\n')
        console.log(string)
        fs.writeFileSync(this._file, string)

    }
}





let parser = new PersonParser('people.csv')

// console.log(parser)

//There are 200 people in the file 'people.csv'
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'`)

parser.addPerson('sony', 'martha', 'soso@gmail.com', '021123456')

// // //There are 201 people in the file 'people.csv'
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'`)

parser.saveFile()
