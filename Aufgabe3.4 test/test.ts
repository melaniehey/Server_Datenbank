import * as Mongo from "mongodb";

async function connectToDB(_url: string): Promise<void> {  
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect(); //verbinden mit Client

    let students: Mongo.Collection = mongoClient.db("Test").collection("Students"); //Collection anlegen --> Test und Student gibt es auch bei mongo.exe

    // let s: Student = {name: "Max Mustermann", matrikel: 666}; //In die Collection Daten angeben (insert, find, findOne, delete) - gleich wie letzte Woche
    // students.insertOne(s);

    let cursor: Mongo.Cursor = students.find({ name: "Melanie Kirchkesner" }); //Cursor - Zeiger auf ein Element das ausgelesen werden kann
    let result: Student[] = await cursor.toArray(); //Über "toArray" hovern -> Promise Typ -> man muss darauf warten -> await
    console.log(result);

    let s: Student = await students.findOne({ matrikel: 123456 });
    console.log(s);
    // students.deleteOne({ matrikel: 666 });
}

connectToDB("mongodb://localhost:27017");

interface Student {
    name: string;
    matrikel: number;
}