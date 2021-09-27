const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
descricao: {
    type: String,
    required: true

},

feito:{
    type: Boolean,
    required: true
},

})


module.exports = mongoose.model("Task", taskSchema)
