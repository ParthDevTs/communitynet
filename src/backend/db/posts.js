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
  {
    _id: uuid(),
    content:
      "New ID , Who this?",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    username: "chaabi_kahan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGBgaGBoZGBgaGBoYGhkYGBgaGRgYGhgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzErJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQxNP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA/EAACAQIDBQUFBgYBAwUAAAABAgADEQQSIQUxQVFhBiJxgZETQlKhwQcysdHh8CNicoKS8RQVU6IWMzSD0v/EABkBAQEBAQEBAAAAAAAAAAAAAAABAwIEBf/EACURAQEAAgICAgEEAwAAAAAAAAABAhEhMQMSQVEyBCJhcQUTgf/aAAwDAQACEQMRAD8AueyjhSlupS7p8JdXJaxW+ltwFtACb8TvPS8MfjbLWlJFpTTBTXuWvfgOth04ekcMtycu+3ujhe4t7t9Nd+kqKCUpKlOX0y3JKCx3AWFuH4E+YElQr8I9Af8AW+BSSnJkpy5ddO6Oug1j1ty+Q5W/HWEV0STIklKgnQWj1SVDUSTKsEtwI039PGRvjKautNnUO33VJ1MOdrKrHqJS2ltKnh1zOT0UasfAcusR9s0Vo+3zjJa/Un4cvxdIVpARwnMbI7YUqpZX/hkfdubhhy3fe6Ti+2X2iVC70cK2RBdWcWzseIU+6Oo1iapMbbp6DtvtVhsLcO+Zx7id5h/VwXznn22/tOrsCuHVaQ3Zz338r6X8p59VxRP3jcnU68+fMzquznZg1FFWqCFNiq9OBPjK79ZOazxt/Huc3/JrH+9gPQaRo2pWvaoGN97Hf+s7YYFEsAtgJRx+BV9LRuw3jfhzZxLb76SWhtWpTOZHZTzViPwlPHYVqLWO47jKb1Z1Mtlxeh7E+0CsjBa/8ROJ3OBzB3N5+s9NwGOSsi1KbBkbcR8wRwPSfN9Ktpblp+U63sL2lOHrqjN/CqEK4O5SdA45W49PCS8ucsddPbIRAIsjMQhCAQiRYNiESEAheJCEEIQhBEhCE25H2UUU5gp2mBp2ygVdwHu/1dR0lCl2pdUKOLvrapu0PNQLX6zP2xejWX07AU4tPKbgEEg2NiDY8jynCUdsVqSsFbMrXJJ1Zb7ypPOVKONqJmek5s33rb/MHcdd8nvF9a9EpYqmzmmHBddSsr1dtUUrCizd46E+6p4KTznna42/eBKuOINj11kb1kc2Y5X+Lg39XI9ZPdfSvRdq7fSgQAM+oz2Oij6npINr7fGRTh3Uk6kgXt0N934zghjChyOMyn1Hhzg9coQyNmB4b/UcI96f63aYjtQ1SnkRSj275uNOeT85Rw3aqrTT2T6nctQ6kA8DzPUznnr5wCoYP4G4PjHVkd11UA8Te1+tuc596vpGnh9pVsO7OjHvDvX1zcdb8esZVxXtbvmJa9yfeVucoYWm6rlZwRwB1seh+kbTo5XzByDxPA+u8Se38uvWLVfaDs3fcs9rBib5hyud3hIBjQhuNQdGQ/SOfDIxN3v0FrfKFGjQzr7QMVuAxud3rJ7bNM/adYIjVabaW0HFWOg+ZE5BXnc9ucRRdESgmUBgC2XJfW405C1/OcK9TfbdNsOlnTd7HbK/5OKRG+4t3fqFIsPMkfOe2Pg1VQo4fTdPNPsmQBq7nfZF8tSfxE7/ABePteW5SW7TLG5ZaVa2E7x14yIYcc5G+NlV8aeAmd8kaY+JDtzBI6EW14GebV+6xU8Daeg4iuxBnCbbp5KnjLhnvJ1lj+1TSpqfD8JMjyija+slV5ttlp9F9itqf8nB0nvdlXI/9aaG/iLHzm9PIPsc2xlrVcMx0qDOg/nTRvVbf4T1+HmzmroQiQhwWESEBYkIQCEIkIIQhCCEIkDwI4q+jCx5j96SRWZhYqW00bj+sneuF1VBbg2+0ies+hDXHTTyM8m3uu/iEw2GqC4LALyOtuvSFHDgMzZzfjbj4xw72oJJ4qdf9xPZ8V0blf8AAxyq0NkIaLV+AOgvqTe0z0NL4D4HWTiuT3GOXXyv1HA9ZDicMb7tee79JLaY4pRXQbkHmBJXqta6hcvTgeR5TOpqQe9u58POPpuVNwbfgR1l1Kti+lVm1VrEb10+XOMSrc2ckH5fpIkAbd3W5X3+BkykNo41+ID8Y1ELly3DC68+I/MRmRkOYd5D6EfvjJ0ouptlLLwtqfL8pOmEdb5VuDvU6DXfv3GOE2rqgcZk3+NreMGF9Do3yMsPs1la6MF6H8NN4klTCgjVgON9/wDqNxXP7Yo9y3DMB1FwVsems5VaWpWehY/CI9Jk9oCxWwNra8PmBOIroQQ9tdzDkQbMJt4spZo26z7L3s1VOqn5ET0TE00A1M8e2BtP/i1Wf3XWw6HgZfxvbN3OguOcZY3ddSbsruqqKToZHUyLyvOX2NtR62YAHMoBI6TN2ltaorED5zGS71p6PWa7dZWccJxXaVe+DIDtGtoXzWbd18JSx2JZ2s19OBmuGOrtnleKrg6xbxvGBM2ZNbsvtE4fFUq3wOCf6dzD/EmfTKsCLjcdR4T5Swz2YHrPpDsPj/b4Gg5NyFKN/VTYoT55b+cMPNOq3oQhDziEIQCESEAhCJCFhEhAIQhCPB6ZPAHqLXBkgpE6qpUj08pDTxpO4+R4R7Yhmsc27lPHuvpaTvhTa5GUjiN3oN0cEBHeIO7Ub41Kl95LDlfUeEQJ8Oo4i2v76iTlOEz0ktZiTyOgPrJFpIqnUkeN7eg0lRB8J8v3vkiNc33H8enWNX7Q6mlE3IQHnpcxGxFFfc/8Ywprp3T8v0jWIbuuLHnL6rwnp7Qpb1QHplEBtPXdb1/CZWLwjJ3lO7UHpy6woYk2s1t3HS/5Rr7XU+G0+0n6W6WPoTEes7DMjluY0BHpM1X5buRkiNrmQ2P79RL6xyte0z7iQ3Im/wDsRXpB9Puv46Nbl16RtNkc2buPzGgJ/OK9TXK/k3Plfl4y6ibpaVYXCuLHmfrMrbOyit3AujmzfyvbQnxE2HTNo/k/EePMdf8Acv4OgPYsj6g5tN4y20t6GdY8VMrxt5me4cjju8D9JYoWUABUYXuCRqDL22MABoNRwP08dZkrddJvZuOsa9G7P4JaOGNVh/EqkkkfAuij1zHzmDjtnh2JtqTf1mXg+09VFCMc6AWAO8DoZY/9Sg2ulj/V+czywvw3xymuVgYWsBkU6Dd08JibW2c1MZnN2Y/Sb69pafFWv4A/WYO29orWIy6Ac4xxylTLKWMkRGMUjqIuS/vCasjaR1nu32QYnNhKqH3MQ4Hg6o34lp4dSpqN5vO77AdsUwLOlRb06rqzODqhAtmy8Ruv4Qz8k3jw9zhGU3DAMpBBAII3EHUER0PIIQhAIQiQghCEAhCEIIQiQOD279niNd8M2U7/AGbHT+1948/UTgcVhalBylZGVhzFjbnyI6z32VNpbMpYhMlZFdeF946qw1U+Eyy8cvT14+Wzi8vDkfj8x9ZOtS+/yYTrdsfZyy3fDPm45HOVvBX3Hzt4zicTh6tFijoysN6sMp9NxmVlx7bS45dLZF9T6iLfnr14/rKlPEeX75SZX8j8pE0mzEfzLz/f4RQoYaajkd48JFcjofkYf+J+R/KUKLre3eXip4flGNhkcXXTpy8pKKnxaHnGunHceDD68oJbGe6FDbhHqx3y2737rj+4cfGU69Bk7y7uHEESdO+0+cH73rzk9PFaZXGZeDcR58ZmpW5+n5SUPxE6jmxoo5T+ZOFvofpLO0dqLQw6stszBsg8SQSR0mXQr5LsDZfeB1FvDnOZ2xjzUe/ACyjkommGO+XFm7pro2akpJuTdj/exP5TGxdIgm00MM9gi80UeeUW+cq4l+HGbGPbMaMtHVBI80m2pwJilzGZoZ+kBS3SJcdfWIWHWNNusm0TKy9fWSCulxdSfOVQYoEbTT277K+1a1lGCYNmpozIxN7oCLqeVswt08J6RPnf7L9rU8Njc9VgqGjUUtqbaBxYDUklbW6z3jZO16OJTPQcOu48GU8mU6gxHl8uOrw0IkJFSxCNqjKwBKkqQbEbwbcZWKWEIl4CwhEhBCEJQQhCBJCEJy0LKe0dm0sQuWqgYcDxH9LDUS3FjTqV5ht77PnW74di678mgcfR/kek4qoHpkq4II0IIIt4g6gz6EnE9uMOtU5Th3YohPtVU5bEbmYDcLc+cxzwk5jXHy/FeZJiOHyP0kyVuG/+U/SPwPZ6vULMqOUBIDBGYGxsdQLaEWlnDbFqVCciF8uhKqzWPI8jM2119qntRuGv8p3jw/SItXgp/tO/ymi3ZnE3ucNUP9jflIcLsKpVd1p02d0NnFtUNyLNc6HQ+ku/4OPtUWuCbDzUxpa33D4ofpzm6vYvFk3FE35koPmWkDdmaqVqdB1UVKlyi5lOgvckgm24+kbv1SWXqsJ1V7gb/h4jw5yFNNN9zbTeDO3H2c4j4qQ/vf8A/E5vtNgf+C3s2ZGqFQe4SQgN95IHeI9AZ1MbvomcvHbn9rYv3FO7ViOLfkJikXMnfUyXDUbmehOllicw6AfIRMWPelmnRuSToOJkOMqgg2Gi/WElZdUSAiSu8iJkaEtGmOLRLwGxQsW0QmAXipEC84pMImV7bpPgtrVqD56NR6b/ABIxU25HmOhlKPRAZUsjrsN26xrUnptiHsd7mxcX4K+8X+mlpFsHtE+GdXp921gVGiuvwsOPjObz8Bujg9t/6ybcXDH6fRuzO01DEUw9NxmOmVu6Ve1wrePPpMvE9o6isCVGg1ym4F2tlc8N3jPEsJj3Q3RynHQ23c+fnO12JtcYlauctnFiwW1nJU5RuNrkD06S28PL5PFcefh6TszbDVSVXXQG+4jXVjzG71m+gIGpueJnBYbDvhgjo2d3HdW/dsoJKEndbUg6fdI4zqdi4p2pg1rBjrvGgZjlBHA2tv5zrTGcNWEhq4hVtc6ncBrfS/0kiNcA2t0kXZ0IQhUkJmJthGcIoJvvJ0A1t5zQSqp0DA+BvJp3MpekkIkIUsytr1BSoVHdrkrlF9wZ+6oA4C58es1JS2xh1qUKiMLqUJ81GYH1AnOW9XXa463N9MrsL/8ADW59+r5D2jzaw1RCqsthnAYGwBa63BPM2/Cct9nWJZ8PUpFSBTqMof4s5Zj5i/zE0dh4lhhyxOYhsirfQFctNVtwBYE+c5w/GL5Ny10IM5PZ59iyV79x62Io1L+7mxFRqTkncAxK/wD2CdC7mlTLMcxVSSd2YgfK5mVsu1XDLmUBH9qXUi91LvZRwF73v006W83XyY5al21jjqYcp7Rc4BJQMCwA1JKjUDUannOYxLZlTHMCQ2KolOGTD96kpNuB9o76/GJm4KitTGrTqM+VqYuMx/iGnZkVzvdbBtOM7PaWAWpQejoishUGwsth3WA4ZSAfKLLdxcMpxVTtRt1MHQaq2rfdRficjTyG8+E+fMfjGrVHqOxZmYsxPEkzou2W3XxdRcx7qKEUA6FgBnf+5tfC059MP4ztphNTaulOW6CcJIMK3K3jpHABNSy6dbw0tVtssVyqp3C58T+kzquL7mW2p3+Uu4vFId5LHppM5sQvBB56yVcZwrXjlpk8JI2JPAAeAtI2qMeMjs8oBvMYWHCJrC0oSLEvC8BYhigxYQ0LHg8tBGlohaBIGtu9Y5BIx1iM99NwgTmrwHrOu7G4xQrJudjpe1iANF533+s4pBLVCqVIIOsM88fbHT1yjXxSoyIrZlY3uF0OUghQd5y8eQj8NWqOC7MRmYIBvIK3JLqBqQdL6amY2wdrF8jsxzDe9ySGAGU242sNOO6X8Riy7E6KSWLEC2Ys17m0XLUeDLGy6rb2PiiWKVKhQqCUJsBqSGOblr63mlgtsVX+4mcIcrm41cnKCOa+H6TlP+UyqCrakWvaxC3Ohv5nzlrZe0GAUqwK5lJCnUBSB3hxH3fnzkxy+HGnotO+UZiCeJAsIZxzE4jaHaRmAANl3ZxcZiLXBHireUzm2oxJOdgSbnXeTx+nlOvaOvalbEHnH4bFOpurEfu8rsl7c45KfEmw+c1upGb0LY1R2pqz7yLg3vccD0mhOGw223UWUi1rC/AcLWG+bGy9vhrLVIB+K4sed+Uyta45zp0My+0dd0w9RkFyAL8e5cZ9P6bzQp1VbcwPHQg6HdIcc49m4PwNpv8AdPCTKWyyNcbJZtg9i6wTAZ+CtWbyDs00cGMlGkOJUMdN7HvXPqZxnZ+oww+IQ1GyswCINMpzWc35EEabjrO5qsGCFdwBt4DQR4t2TZ5tTKyUys5dSrag7xG0lyKEXRALBenjvi2jhNfWb2w3VFdm0lcVAgDg3Da3B3aazH7c7aalQ9mrHPVuvgg+8fO4HmZv4rEpTUu7BVHEm3kOZ6TyjtftxK1XODZAoVL77byehJJky4jTxY21g1Sqd59T8I+soYnazbkAUdBGV8ch6yq+JQ+7M9vdMfs2pj3PEyu1djJWrJ8Maao4JI7Q5jyihTyj854C0YSYUuXmY0tDJALAIWjhEJgMymGURS0beAuaITEvC8BYZo2KBCCOUQAiiAojw0ZeAgdJ2cxPfyE2uNPEfszqWdlUW11tpr8555hqxRlYbwb+k9GwGza9RFqJSdkcXVlAsQfPyizby+bHnZq4kkW58ZcwaMlnV0UH3d5YDU5h4jzjF2Bif+w/p+skXYuKC/8AsvfnYbpz666eayfBlQqQ3urfcDw4b9f9mUyfH1lg7CxWoNF9eNr/AFkZ2HiP+xV/xMrqSN+m4tY+H6xrhSdByEzmxBOl5Yw9XiT/ALM7ssZWHVFIJvr9JGalradNf34SV6t41qd9bnQfvWXG/aaS4fFOhDKbHQix5cLS5i9quyMQxDMSSouBw3cdRpbpMtmAWx4+sSkSCNN5nOePtjZ068eWspddUux6v8J+B9obi+ljYr6WPrOu7P1i9Mk3uDY3N+unIazgdlqA9T+0fNr/AITueypvSY/zn8FnPhtuM323/UYyZ8ddtkwgYTdg4Ltds1iXxD1ySoOSmF7ig91VBvcnW5NtTPMcbWVtGG7kbfKdl2rZ0Yq1U1WOj2OgIAByrwF76TiMRSBNybeYmPL6Pjxk4VHyfD85GXX4ZI9NPiJ8BEuo3D11hsjz8li2bwjzU5CJYmE0YRzJMS/KPIA3mMz30AvAMsaWEVlt94+QjVbWwEAuTEK8zFa/OIFgNJHKJHZYuWAwCOAhljrQG5YWjoQGxRCBgJeOvGiECRDPVfsv24TQfDs1jTbMlz7j6keTX9Z5QJ0HYjGezxKA7nBQ+J1X5gesMvLj7Y17f/1H+Yf5RDtL+YesxMg/f+45UHwmXdeDUbH/AFI8/nD/AKl1+ZmUEHwmOCdI5XUYGMwD01V7h0b7rre1+RB1U79DK1N+X6zrcHhWq0aiuwIzMAACASoDK2puNeU5jB6tuP5TuZbm9aLNcJA7KASDr5aSWnjD68JHicSzNqRu0BAiIGzZSBckanrCaMZyTxk9Am+gI8ZbXBuGtZBwFjqfKR1Q6G72ta9gdd9rfXynOeUxxtrrDD2yknajgcOzI7DU5je1za27h1M7Hslf2AuDcs518ROS2NjwmbS/fv8AIcPWdrsTFIaYJZVPe7uYaDMfynHh6d+bftWmZn7V2omHW7atwW9r9SeAl326fGv+QnlHaraqms5drjMQqjiAbD5ATXPL1jX9H+nnmz/d1GZ2vxnt39oihM17hdASLa9b8TOSdGvN7H1Q6Kd2hsByuZjVWmO3tyxmOVmPSv7I8bCJlUbzFYExoSU0DVHuiNJYyzRw5YhVUkk2AAuSeQAnYbH7B1qneq/wk5aFz5bh5wsxt6cQmGJI4knQbyTyAlzaGCbDkLUGViL5L94A7s3w35b56fV2ThtnUHxOTO6DuF9SztogHLXlwBnkmJxD1Hao7FnYlmY8WMurFyxxxn3UDG5j0XdEQSRYZGONYkdU3xkAtCLCARLRTCARIExLwFtEaKDGsYAIqxscsBZLhapR1cb1YMPIg/SQmKkOXuuHIcBxuYBh4EXk8wux2O9phlHGn3D4Wuvy/Cb2adTp8/OaugGiZoZhDSESbNxRGcsWuXc67hYb/QW8pzuFYAEg79TpwI5+cITx+C3n/jrPtBWWzX3+Mus4zWAFteHpCE9cvCTuJKWKYNmuNBYC0K9bP9/ztfw1v1tCEy834Vt4sZ7z+3P02sDrrfQnXSdn2GYEVCd5Kj5EwhOvDNSJ5rba6TG1kpo7vbKilj4KLz53xmLNaszt7zFrcrm9oQnXl+Hs/wAf1l/ca+PwboiB0de4DqpG/vDXwMx3w7ncjehhCZ16McZllyYmAc+7bx0nSbB7GNXQO75RciwGuhsfwiwkwytvL2ZeDDDD2ei7E2Dh8MtkQZ7audWPnwmnwhCeiPO8y+1baV2pYdTooNV/6muq+gDf5Tz5tB4whOL28+fZAY9TCEOCVJGIsIBCEIBC8IQhDEhCAXjTCEAjlhCRSmCwhKjt/s/xuWsyHc6X80II+TGehisIQljx+b8h7QcouYQhDF//2Q=="
  },
  {
    _id: uuid(),
    content:
      "With the BOis",
    likes: {
      likeCount: 30,
      likedBy: [],
      dislikedBy: [],
    },
    username: "chaabi_kahan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    image: "https://www.scrolldroll.com/wp-content/uploads/2020/08/Sardar-Khan-Bike-Scene-Gangs-Of-Wasseypur-Memes-750x430.jpg"
  },
];
