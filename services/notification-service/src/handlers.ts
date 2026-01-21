import { transporter } from "./mailer";
import { env } from "./env";

export const sendOtpEmail = async (email: string, otp: string) => {
  if (!email) {
    throw new Error("EMAIL IS UNDEFINED");
  }

  await transporter.sendMail({
    from: env.EMAIL_FROM, // 🔥 REQUIRED
    to: email,
    subject: "Your OTP",
    html: `<h2>Your OTP is ${otp}</h2>`,
  });
};
