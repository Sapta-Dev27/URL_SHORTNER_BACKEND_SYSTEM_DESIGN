import mongoose from "mongoose";

const URLSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  shortedId: {
    type : String ,
    required : true ,
    unique : true 
  },
  redirectedURL : {
    type : String ,
    required : true 
  },
  visited : {
    type : Number ,
    default : 0
  },
  shortedURL : {
    type : String ,
    required :true
  }
}, {
  timestamps : true
})

const URLModel = new mongoose.model("URL" , URLSchema);

export default URLModel;