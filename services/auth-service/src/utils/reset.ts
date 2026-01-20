import * as crypto from "crypto";

export const generateResetToken = (): string =>
  crypto.randomBytes(32).toString("hex");

export const resetExpiry = (): Date => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 15);
  return d;
};
