import { model, Schema, Document } from "mongoose";
import configs from "../config/config";
import generateString from "../utils/auth/generateString";
import { compareString, hashString } from "../utils/auth/hash";

export interface UserDocument extends Document {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
  trials: number;
  account_verified: boolean;
  account_locked: boolean;
  email_verified: boolean;
  otp: string;
  account_type: string;
  otp_time_expiry: Date | number;
  password_changed_at: Date | number;
  createdAt: Date;
  updatedAt: Date;
  verificationString: string;
  verificationStringExpiry: Date | number;
  generateOtp: () => Promise<string>;
  isValidPassword: (password: string, dbpassword: string) => Promise<boolean>;
  getFullName: () => string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },

    first_name: {
      type: String,
      trim: true,
    },

    last_name: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
    },

    trials: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      enum: ["user", "admin",],
      default: "user",
    },

    account_type: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },

    account_verified: {
      type: Boolean,
      default: false,
    },

    account_locked: {
      type: Boolean,
      default: false,
    },

    email_verified: {
      type: Boolean,
      default: false,
        },
    
    otp: String,
    otp_time_expiry: Date,
    password_changed_at: Date,
    verificationStringExpiry: Date,
    verificationString: String
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.index({ first_name: 1 });
userSchema.index({ last_name: 1 });
userSchema.index({ phone_number: 1 });

userSchema.pre("save", async function (next) {
  /**
   * Checks if password was changed before attempting
   * to hash
   * isModified = was password changed?
   */
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = await hashString(user.password);

  next();
});


userSchema.pre("save", function (next) {
  const user = this as UserDocument;

  if (!user.isModified("password") || user.isNew) return next();

  user.password_changed_at = Date.now();

  next();
});

userSchema.methods.getFullName = function () {
  const user = this as UserDocument;

  return `${user.first_name} ${user.last_name}`;
};


userSchema.methods.getFullNameUppercase = function () {
  const user = this as UserDocument;

  return `${user.first_name} ${user.last_name}`;
};


userSchema.methods.isValidPassword = async (enteredPassword: string, dbPassword: string) => {

  const result = await compareString({
    string: enteredPassword,
    hash: dbPassword,
  });

  return result;
};

userSchema.virtual("id").get(function (this: UserDocument) {
  return this?._id;
});

userSchema.methods.generateOtp = async function () {
  const user = this as UserDocument;

  const otp = generateString(5);

  //encrypt otp and save to DB
  user.otp = await hashString(otp);

  // save otp expiry date to DB
  user.otp_time_expiry =
    Date.now() + 1000 * 60 * parseInt(configs.OTP_TIME_EXPIRY_MINUTES);

  return otp;
};

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
