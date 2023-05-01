// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://127.0.0.1:27017/thomson`)
.then(() => console.log('DB Connected!'))
.catch((err)=>{
    console.log("error "+ err)
})

module.exports = mongoose;