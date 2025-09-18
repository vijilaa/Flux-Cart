
const RegisterSchema = require('./RegistraionSchema')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./Images")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },

})
const UserImage = multer({ storage: storage }).single("image");

const UserRegistration = (req, res) => {
    const User = new RegisterSchema({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
        image: req.file

    })
    User.save()
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
const ViewUser = (req, res) => {
    RegisterSchema.find()
        .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
    })
                .catch((error) => {
                    console.log(error)
                })
    

}
const UserId = (req,res)=>{
    const UseId =req.params.id;
    RegisterSchema.findById(UseId)
    .then((result)=>{
        res.json({
            data:result,
            msg:"successful"
        })
      
    })
      .catch((error)=>{
            console.log(error)
        })
}
const findOneUser = (req, res) => {
    const email = req.body.email;

    RegisterSchema.findOne({ email })
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};
const UpdateUser =(req, res)=>{
    const UseId=req.params.id;
    const updateData={
          name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
         image: req.file
    };
    RegisterSchema.findByIdAndUpdate(UseId,updateData,{new:true})
    .then((result)=>{
        res.json({
            data:result,
            msg:"sucessful"
        })
       
    })
     .catch((error)=>{
            console.log(error);
            
        })
}
const deleteUser = (req, res) => {
    const useId = req.params.id;

    RegisterSchema.findByIdAndDelete(useId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};
const ForgotUser = (req, res) => {
    const email = req.body.email;
    const updateData = {
        password: req.body.password,
    };

    RegisterSchema.findOneAndUpdate({ email: email }, updateData, { new: true })
    .then((result) => {
        if (result) { 
            res.json({
                data: result,
                msg: "Password updated successfully"
            });
        } else {
            res.status(404).json({
                msg: "User not found with that email"
            });
        }
    })
    .catch((error) => {
        console.error(error); 
        res.status(500).json({ 
            msg: "An error occurred during password update"
        });
    });
};


module.exports = { UserImage,UserRegistration, ViewUser,UserId,findOneUser,UpdateUser,deleteUser,ForgotUser }