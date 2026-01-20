export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const OTP_TTL_MIN = 5;

export const otpExpiry = (): Date => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + OTP_TTL_MIN);
  return d;
};
