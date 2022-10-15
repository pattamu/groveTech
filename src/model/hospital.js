const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const hospitalSchema = new mongoose.Schema({
    name: {type: String},
    phoneNo: {type: String, unique: true},
    roles: {type: [String]},
    patients: {type: [String]},
    registered: {type: Boolean}
},{timestamps: true})


const managementSchema = new mongoose.Schema({
    product: {type: String},
    releaseDate: {type: Date},
    demo: {type: Boolean, default: true},
    hospitals: {type: [ObjectId], ref: "Hospital"}
},{timestamps: true})

const hospitalModel = mongoose.model('Hospital', hospitalSchema)
const hospitalManagemenet = mongoose.model('Hospitalmanagement', managementSchema)

module.exports = {hospitalModel, hospitalManagemenet}