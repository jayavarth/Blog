const mongoose=require('mongoose')
const blogschema=new mongoose.Schema({
    content:{
        type:String
    },
    date:{
        type:String
    }
})
const Record=mongoose.model('Content',blogschema)

module.exports={Record}