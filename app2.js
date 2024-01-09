
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gyanu:VoFSLenpVBvqAL4m@gyanumongodbcluster.4itc56q.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = client.db("Customers");
    const coll = db.collection("Customers");

    //const docs = [{name:"Anil Sharma",latitude:17.3317,longitude:78.5754},{name:"Parthu Garu",latitude:17.5169,longitude:78.3428},{name:"Gyanu",latitude:17.3685,longitude:78.5316}];
     
   // const result = await coll.insertMany(docs);
     
    // const update_result = await coll.updateOne({name:"Gyanu"},{$set:{salary:15000}});
    


    // find code goes here
    const cursor = coll.find({name:"Gyanu"});
    // iterate code goes here
   // await cursor.forEach(console.log);
     
    await cursor.forEach(element => {
             console.log(element.longitude);
             ele = element;
    });

   


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

