import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("URI starts with:", uri?.slice(0, 25));

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  await client.db("Bazar-dor").command({ ping: 1 });
  console.log("✅ Connected to MongoDB");
} catch (e) {
  console.error("❌", e.name, "-", e.message);
} finally {
  await client.close();
}