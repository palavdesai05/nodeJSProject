let mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pdesai3960:pdesai3960@cluster0.p8cyubi.mongodb.net/driver', { useNewUrlParser: true },(error)=>{

    if(error){
        console.log("Mongodb Not Connected due to this error")
        console.log(error)
    }
    else{
        console.log("Mongodb Connected!!!")
    }
});
