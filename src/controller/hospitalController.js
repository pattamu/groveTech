const {hospitalModel, hospitalManagemenet} = require('../model/hospital')

const createHospital = async (req,res) => {
    try{
        let data = req.body

        data.name = data.name.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')

        let managementId = await hospitalManagemenet.find().populate("hospitals")

        let phoneCheck = managementId[0].hospitals.some(x => x.phoneNo === data.phoneNo)
        if(phoneCheck)
            return res.status(400).send({msg: "Phone number already exists."})

        let hospitalData = await hospitalModel.create(data)

        let managementData = await hospitalManagemenet.findOneAndUpdate({_id: managementId[0]._id},{
            product: "Hospital management",
            releaseDate: Date.now(),
            $addToSet: {hospitals: hospitalData._id}
        },{upsert: true, new:true}).populate("hospitals")

        res.status(201).send({data: managementData})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}


const updateHospital = async (req,res) => {
    try{
        let data = req.body
        data.name = data.name.split(' ').map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ')
        let id = req.params.id

        let hospitals = await hospitalModel.findOne({phoneNo: data.phoneNo})
        if(hospitals)
            return res.status(400).send({msg: "Phone number already exists."})

        let hospitalData = await hospitalModel.findOneAndUpdate({_id: id},{
            name: data.name,
            phoneNo: data.phoneNo,
            $addToSet: {roles: data.roles},
            $push: {patients: data.patients},
            registered: data.registered
        },{new:true})
        // let managementData = await hospitalManagemenet.find()
        res.status(200).send({UpdatedData: hospitalData})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const getAllHospitals = async (req,res) => {
    try{
        let filters = req.query

        let allHospitals = await hospitalModel.find(filters).collation({ locale: "en", strength: 2 }).limit(filters.limit)

        if(!allHospitals.length) 
            return res.status(404).send({msg: "no Hospitals found. 🚫"})

        res.status(200).send({totalRecords: allHospitals.length, data: allHospitals})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const getHospital = async (req,res) => {
    try{
        let id = req.params.id
        let data = await hospitalModel.findById(id)
        res.status(200).send({data})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

module.exports = {createHospital, updateHospital, getAllHospitals, getHospital}