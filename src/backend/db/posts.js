import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "When you're on a mission, you have to sacrifice some of the pleasures of life. The harder it is - the more meaningful. The more meaningful - the greater the results.",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ajaychau_123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: ""
  },
  {
    _id: uuid(),
    content:
      "Is this a Aurora??? :p",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: "https://lh3.googleusercontent.com/pw/AJFCJaXZ9zK02arPc9SEzcktBY6N_sXrMeddlg0jSc7-yNJOvbto9_ewIFMFENn_5kzURYfc6aENqrff_nERxnaEn5iIgdg10ZTzNy1YKE5EIaT2-BzQGxg0qwNTkzobmT48JuVQR3yVkXxQCHo0Je021Wr4=w1292-h969-s-no?authuser=0"
  },
  {
    _id: uuid(),
    content:
      "Perfectionism is a disease that paralyzes action.Rather than obsessing over every detail, take risks, make mistakes, and embrace imperfection!",
    likes: {
      likeCount: 18,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Neo__g_f1",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: ""
  },
  {
    _id: uuid(),
    content:
      "The Rain is Crazyyyy...",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: ""
  },
  {
    _id: uuid(),
    content:
      "Would anyone know of a coffee shop close to the DN nagar metro station? Need it for a work meeting.",
    likes: {
      likeCount: 15,
      likedBy: [],
      dislikedBy: [],
    },
    username: "NeoG__roxx",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: ""
  },
  {
    _id: uuid(),
    content:
      "Found this Amazing Mustang in Chennai",
    likes: {
      likeCount: 34,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tanvi_123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: "https://lh3.googleusercontent.com/pw/AJFCJaW_HwgHwKoIlqPHADi7EXjWmRLYAl0HrfmgbBdV6pRvlk2IXnxzreRz120BS3JBPcBt7qwbk8Q1SJjEUZci_CG4dX6VzVSOHTzsrBv7kITQafz4noisxevzozQHhsj99Gz47CA5_Bg78a2qBIT3QkTl=w1292-h969-s-no?authuser=0"
  },
  {
    _id: uuid(),
    content:
      "My Monsoon Trip to Barog!",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    username: "parthk101",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: "https://lh3.googleusercontent.com/pw/AJFCJaVHw3Qq63UvT-AQmM2SO-k-NrnUoyQsHSc0dfCPXkM1SU_5URRVvtW75QJ5NHAlpN88CXi1DvGf9QtYl_9yLhxPzP-BRqfIFs_czHuntyBEuLz5gVlMKiVCwDsTA854eODmf4YWK_BrIYgsLsAcG9q0=w1292-h969-s-no?authuser=0"
  },
];
