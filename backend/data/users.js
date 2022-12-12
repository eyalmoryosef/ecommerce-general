import bcrypt from "bcryptjs";
const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "jhon",
    email: "jhon@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "moshe",
    email: "moshe@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
