import mongoose from "mongoose";

export function connect() {
  mongoose
    .connect(process.env.MONGO_URL!, {
      tls: true,
      ssl: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("The DB error is", err));
}
