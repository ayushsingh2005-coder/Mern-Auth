// we have written a middleware function that will find the token from the cookie and hence the userId ( read server.txt file )

import jwt from 'jsonwebtoken';

const userAuth = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success : false , message : 'Not Authorized. Login again'})
    }

    try{

       const tokenDecode =  jwt.verify(token , process.env.JWT_SECRET);

    //    console.log(tokenDecode);
       
       if(tokenDecode.id){

       req.userId = tokenDecode.id; 
       }
       else{
        return res.json({success : false , message : 'Not Authorized. Login again'})
       }

       next();

    } catch(error){
        res.json({success : false , message : error.message});
    }
}

export default userAuth;
