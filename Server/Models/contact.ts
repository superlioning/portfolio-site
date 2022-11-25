// import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Create a Schema that matches the data in the collection
const ContactSchema = new Schema
({
    First_name: String,
    Last_name: String,
    Contact_number: String,
    Email_address: String
},
{
    collection: "contacts"
});

// Create a Model using the Schema
const Model = mongoose.model("Contact", ContactSchema);

// Export the Model -> converts this file into a module
export default Model;