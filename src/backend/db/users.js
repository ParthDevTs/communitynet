import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import parth__img from "../../assets/parth__profile.jpg"
import user__placeholer from "../../assets/user__placeholder.jpg"
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: user__placeholer,
  },
  {
    _id: uuid(),
    firstName: "Parth",
    lastName: "Kathuria",
    username: "parthk101",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: parth__img,
    following: []
  },
  {
    _id: uuid(),
    firstName: "Ajay",
    lastName: "Chaurasia",
    username: "ajaychau_123",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: user__placeholer,
    following: []
  },
  {
    _id: uuid(),
    firstName: "Tanvi",
    lastName: "Priya",
    username: "tanvi_123",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: user__placeholer,
    following: []
  },
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "NeoG__roxx",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: user__placeholer,
    following: []
  },
  {
    _id: uuid(),
    firstName: "Akanksha",
    lastName: "Pratap",
    username: "Neo__g_f1",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: user__placeholer,
    following: []
  },
];
