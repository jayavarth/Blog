const mongoose=require('mongoose')
const blogschema=new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    date:{
        type:String
    }
})
const Record=mongoose.model('Content',blogschema)

module.exports={Record}