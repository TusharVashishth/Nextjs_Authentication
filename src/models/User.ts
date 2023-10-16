import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: [true, "Name field is required."],
    minLength: [2, "Name must be 2 character long."],
    type: Schema.Types.String,
  },

  email: {
    required: [true, "Email field is required."],
    type: Schema.Types.String,
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
  },
  avtar: {
    required: false,
    type: Schema.Types.String,
  },
  role: {
    required: true,
    type: Schema.Types.String,
    default: "User",
  },
  password_reset_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
  magic_link_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
  magic_link_sent_at: {
    required: false,
    type: Schema.Types.Date,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
