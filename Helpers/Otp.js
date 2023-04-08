import dotenv from 'dotenv'
import { default as Twilio } from "twilio";
dotenv.config()

const accoutnSID = process.env.accoutnSID
const serviceSID = process.env.serviceSID
const authToken = process.env.authToken

const client = Twilio(accoutnSID, authToken);

export const otpcallin = (phone) => {
    client.verify.v2
        .services(serviceSID)
        .verifications.create({ to: `+91${phone}`, channel: "sms" })
        .then((verification) => console.log(verification.sid))
       
        .catch((error) => console.log(error.message));
};
export const verifyOtp = (phone, otp) => {
  return new Promise((resolve, reject) => {
    client.verify.v2
        .services(serviceSID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp })
      .then((response) =>{
        console.log(response)
         resolve(response.valid)})
      .catch((error) => reject(error.message));
  });
};


