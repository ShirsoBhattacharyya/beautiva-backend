const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const GOOGLE_CLIENT_ID=`869459374526-6sdfdjaesmakeclj53g5u1vafuu1bjc3.apps.googleusercontent.com`;
const GOOGLE_CLIENT_SECRET=`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`;
const passport=require("passport")
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/auth/google/callback"
  },
    async function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
        const email=profile._json.email
        const firstName=profile._json.given_name
        const lastName=profile._json.family_name
        const user={
            email:email,
            password:uuidv4(),
            isVerified:true
        }
        // const newUser=await userModel.create(user)
        // const {_id,role}=newUser
        const payload={
         email,
        //  role,
        //  _id,
        //  url:profile._json.picture
        }
        return cb(null,payload)
      }
  
));
module.exports=passport