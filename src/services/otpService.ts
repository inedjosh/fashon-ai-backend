import cryptoRandomString from "crypto-random-string";

export const generateRandomCharsOtp = (length: number) => {
  const otp = cryptoRandomString({ length, type: "alphanumeric" });

  return otp;
};

export const generateRandomNumbersOtp = (length: number) => {
  const otp = cryptoRandomString({ length, type: "numeric" });

  return otp;
};
