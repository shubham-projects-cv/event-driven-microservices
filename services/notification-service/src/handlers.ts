import { transporter } from "./mailer";

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });
};

export const sendProductMail = async (email: string, message: string) => {
  await transporter.sendMail({
    to: email,
    subject: "Product Update",
    text: message,
  });
};
