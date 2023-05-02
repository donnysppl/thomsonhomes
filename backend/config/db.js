// Using Node.js `require()`
const mongoose = require('mongoose');


mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGO_URL}`)
.then(() => console.log('DB Connected!'))
.catch((err)=>{
    console.log("error "+ err)
})

module.exports = mongoose;