import { appNotInTestEnvironment } from "../../../helpers/environments";
import { sendEmail } from "../../../services/emailService";
import sendEmailJob from "../../../services/qeues/jobs/sendEmailJob";
import { successEmails } from "../types";

export const sendPasswordResetSuccessfulEmail = async ({
  email,
  name,
}: successEmails) => {
  if (appNotInTestEnvironment()) {
    await sendEmailJob({
      reciepient: email,
      subject: "Password Reset Successful",
      mailData: {
        username: name,
      },
      mailTemplate: "auth/passwordResetSuccessful",
    });
  }
  return true;
};

export const sendAccountVerificationSuccessfulEmail = async ({
  email,
  name,
}: successEmails) => {
  if (appNotInTestEnvironment()) {
    await sendEmailJob({
      reciepient: email,
      subject: "Account successfully verified",
      mailData: {
        username: name,
      },
      mailTemplate: "auth/accountVerificationSuccessful",
    });
  }
  return true;
};

export const sendAccountRegistrationSuccessfulEmail = async ({
  email,
  name,
  link
}: successEmails) => {
  // if (appNotInTestEnvironment()) {
  // ** Use mail job here instead.
    await sendEmail({
      reciepient: email,
      subject: "Successful Registration",
      mailData: {
        name: name,
        link: link,
      },
      mailTemplate: "auth/successfullRegistration",
    });
  // }
  return true;
};
