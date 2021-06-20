"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
async function connectToDB(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect(); //verbinden mit Client
    let students = mongoClient.db("Test").collection("Students"); //Collection anlegen --> Test und Student gibt es auch bei mongo.exe
    // let s: Student = {name: "Max Mustermann", matrikel: 666}; //In die Collection Daten angeben (insert, find, findOne, delete) - gleich wie letzte Woche
    // students.insertOne(s);
    let cursor = students.find({ name: "Melanie Kirchkesner" }); //Cursor - Zeiger auf ein Element das ausgelesen werden kann
    let result = await cursor.toArray(); //Über "toArray" hovern -> Promise Typ -> man muss darauf warten -> await
    console.log(result);
    let s = await students.findOne({ matrikel: 123456 });
    console.log(s);
    // students.deleteOne({ matrikel: 666 });
}
connectToDB("mongodb://localhost:27017");
//# sourceMappingURL=test.js.map