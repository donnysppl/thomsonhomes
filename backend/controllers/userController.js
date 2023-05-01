const Users = require("../models/users");
const bcrypt = require('bcryptjs');


const userList = async (req, res) => {

    let data = await Users.find();
    res.json(data);
    console.log(data);

}

const userAdd = async (req, res) => {
    console.log(req.body);
    let {name,email,phone,password} = req.body;
    let data = await Users({name,email,phone,password});
    let response = await data.save();
    response.mytoken = await data.getAuthToken();
    console.log(data.getAuthToken)
    res.status(200).json({'message':'ok','response':response});
}

const userLogin = async (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        res.status(301).json({ message: 'Error! please enter email and password' });
    }
    else{
        let user = await Users.findOne({ email: req.body.email });

        if (user) {
            // var match = await bcrypt.compare(req.body.password, user.password);
            var match = await bcrypt.compare(req.body.password, user.password);
            let myToken = await user.getAuthToken();
            // console.log(match);
    
            if (match) {
                res.status(200).json({ status:200 , message: 'Login Successfully', myToken });
            } else {
                res.status(400).json({  status:400 , message: 'Wrong Password' });
            }
        } 
        else {
            res.status(400).json({  status:400 , message: 'Invalid Email id' });
        }

    }
    


}

module.exports = {
    userList, userAdd, userLogin
}