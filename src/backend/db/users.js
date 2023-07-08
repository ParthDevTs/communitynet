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
    imgUrl: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
    following: [],
    bio: "",
    url: "",
    profile__bg: "wave"
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
    following: [],
    bio: "Bio? Nahi Li Maine",
    url: "https://www.linkedin.com/in/parth-kathuria-4b0856177/",
    profile__bg: "poly"
  },
  {
    _id: uuid(),
    firstName: "I AM",
    lastName: "Groot",
    username: "i_am_groot",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: "data:image/jpeg;base64,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",
    following: [],
    bio: "I am Grooooooot... I am Groot",
    url: "",
    profile__bg: "wave"
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
    following: [],
    bio: "",
    url: "",
    profile__bg: "wave"
  },
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "tanay_pratap",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: "https://pbs.twimg.com/profile_images/1597211549021908994/V2ClCtWn_400x400.jpg",
    following: [],
    bio: "Line lambi kheecho.",
    url: "https://twitter.com/tanaypratap?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    profile__bg: "blob"
  },
  {
    _id: uuid(),
    firstName: "Akanksha",
    lastName: "Pratap",
    username: "akanksha_p",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
    following: [],
    bio: "",
    url: "",
    profile__bg: "wave"
  },
  {
    _id: uuid(),
    firstName: "Sardar",
    lastName: "Khan",
    username: "chaabi_kahan",
    password: "parth",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    imgUrl: "https://qph.cf2.quoracdn.net/main-qimg-784a90c8853e3ce71e96e7189b887d2c-lq",
    following: [],
    bio: "Chaabi Kahan hai?",
    url: "https://en.wikipedia.org/wiki/Gangs_of_Wasseypur_%E2%80%93_Part_1",
    profile__bg: "wave"
  }
];
