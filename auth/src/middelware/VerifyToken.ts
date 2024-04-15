import {Request,Response,NextFunction}  from "express"
import jwt,{TokenExpiredError,JsonWebTokenError} from "jsonwebtoken"



interface TokenRequest extends Request{
    userdata:any
}


export const verfiyToken = (req:Request,res:Response,next:NextFunction)=>{
    const tokenRequest = (req as TokenRequest)
    
    const BearerToken:any = req.header('authorization')
    if (typeof BearerToken === "undefined") {
        return res.json({ message: "no token found" });
    }
    const token:any =  BearerToken.split(' ')[1]
    if(typeof token === "undefined"){
        res.json({message:"no token found"})
    }
    const secrete:any = process.env.JWT_SECRETE
    jwt.verify(token, "oursecretekey123", (err:any,decoded:any)=>{
        if(err instanceof TokenExpiredError){
            res.json({message:"expired token"})
        }else if(err instanceof JsonWebTokenError){
            res.json({message: "invalid token"})
        }else if(err){
            res.json({message:"something went wrong"})
        }else{
            (req as any).userdata = decoded
            next()


        }

        

    })





}