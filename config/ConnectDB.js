const mongoose =require('mongoose')

const ConnetDB =async ()=>{
  try {
    await mongoose.connect(process.env.DATABASE_URI,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
}
module.exports = ConnetDB