// import passport from 'passport';
// import BearerStrategy from 'passport-http-bearer';
// import db from '../models/index';
// import CustomStrategy from 'passport-custom';
// function findSession(token, done) {
//     db.UserSession.findAll({where:{SessionKey:token}})
//     .then(userSession=>{
//       let s = userSession && userSession.length>0? userSession[0]:null;
//       if(s){
//         return s.getUserAccount()
//         .then(account=>{
//               return {type:account.AccountType,Photo:'',FullName:account.FullName,EntityId:account.id};
//         }).catch(error=>{
//           done(error);
//         });
//       }else
//         done(null,false);
//     });
//   }
// passport.use(new BearerStrategy(
//   findSession
// ));


// passport.use('bearer-graphql',new CustomStrategy(
//     (req,done)=>{
//         let token = req.headers.authorization? req.headers.authorization.replace('Bearer ',''):'';
//         token = token? token:req.cookies.access_token;
//         AuthenticateWithToken(token).then(userAccount=>{
//           if(userAccount){
//             userAccount.isAuthenticated=true;
//             done(null,userAccount);
//             return userAccount;
//           }else{
//             done(null,{
//               isAuthenticated:false,
//               error:"Invalid access key"
//             });
//             return Promise.reject("Invalid access key");
//           }
//         }).catch(error=>{
//           done(null,{
//             isAuthenticated:false,
//             error
//           });
//         });
        
//     }
//   ));

// passport.use('cookie-site',new CustomStrategy(
//     (req,done)=>{
//         findSession(req.cookies.access_token,(error,userAccount)=>{
//           if(error)
//             done(error,userAccount);
//           else{
//             if(userAccount && userAccount.type !== "CUSTOMER"){
//               done(null,false);//if not customer force to login 
//             }else if (userAccount){
//               userAccount.isAuthenticated=true;
//               done(null,userAccount);
//             }else{
//               done(null,{
//                 isAuthenticated:false
//               });
//             }
//           }
//         });
        
//     }
//   ));
// passport.use('cookie-admin',new CustomStrategy(
//     (req,done)=>{
//         findSession(req.cookies.access_token,(error,userAccount)=>{
//           if(error)
//             done(error,userAccount);
//           else{
//             if(userAccount && userAccount.type !=="ADMIN"){
//               done(null,false);//force to log in if not system user.
//             }else if(userAccount){
//               userAccount.isAuthenticated = true;
//               done(null,userAccount);
//             }else{
//               done(null,false);// force to log in if not authenticated.
//             }
//           }
//         });
//     }
//   ));

// function AuthenticateWithToken(token){
//   let promise  = new Promise((complete,rej)=>{
//     findSession(token,(error,userAccount)=>{
//       if(error)
//         rej(error);
//       else
//         complete(userAccount);
//     });
//   });
//   return promise;
// }

// export default AuthenticateWithToken; 

import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import db from '../models/index';
import CustomStrategy from 'passport-custom';
import jwt from 'jwt-simple';
import secret from "../../secret";

async function verifySession(token){
  let decoded = undefined;
  try{
    decoded= jwt.decode(token,secret.auth_secret);
  }catch(e){      
  }
  if(!decoded)
    return {isAuthenticated:false,error:"Invalid token."};
  const {expiredIn,user_id,TokenVersion,account_type,entity_id} = decoded;
  if(expiredIn){
    const generatedAt = new Date(decoded.generatedAt);
    const expired = new Date(generatedAt.getTime() + expiredIn * 1000)
    const now = new Date();
    if(now.getTime()> expired.getTime())
      return {isAuthenticated:false,error:"Session expired!"};
  }

  const userAccount = await db.UserAccount.findById(user_id);
  // if(userAccount.TokenVersion != TokenVersion)
  //   return {isAuthenticated:false, error:"Already logout!."};
  // else{
  return {isAuthenticated:true,userAccount,account_type,type:account_type,EntityId:entity_id};
  // }
}


passport.use('bearer-graphql',new CustomStrategy(
    async (req,done)=>{
        let token = req.headers.authorization? req.headers.authorization.replace('Bearer ',''):'';
        token = token? token:req.cookies.access_token;
        try{
          const sessionData = await verifySession(token);
          done(null,sessionData);
        }catch(e){
          done(null,{
            isAuthenticated:flase,
            error:e
          });
        }
    }
  ));

passport.use('cookie-site',new CustomStrategy(
   async (req,done)=>{
        try{
          const sessionData = await verifySession(req.cookies.access_token);
          if(sessionData. error)
            done(null,{isAuthenticated:false});
          else if(sessionData && sessionData.account_type.toUpperCase() !== "CUSTOMER"){
            done(null,false);//if not customer force to login
          }else 
            done(null,sessionData);
        }catch(e){
          done(e.message);
        }        
    }
  ));
passport.use('cookie-admin',new CustomStrategy(
    async (req,done)=>{
        
      try{
        const sessionData = await verifySession(req.cookies.access_token);
        if(sessionData.error)
          done(null,false);
        else if(sessionData && sessionData.account_type.toUpperCase() !== "USER"){
          done(null,false);//if not user force to login
        }else 
          done(null,sessionData);
      }catch(e){
        done(e.message);
      }      
    }
  ));

