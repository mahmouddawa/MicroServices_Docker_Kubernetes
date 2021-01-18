import {app} from './app'
import  mongoose  from 'mongoose' ;


const start = async()=>{
  if(!process.env.JWT_KEY){
    console.log("testing again");
    throw Error('JWT_KEY must be defined');
  }
  if(!process.env.MONGO_URI){
    throw Error('MONGO_URI must be defined');
  }

  try{
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log('connected to mongodb');
} catch (err) {
   console.log(err);
  }
  app.listen(3000, ()=>{
    console.log('listening on port 3000!!!! ');
  });
};




start();