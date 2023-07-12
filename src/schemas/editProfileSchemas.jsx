import * as Yup from "yup";

export const editProfileSchema = Yup.object({
    bio: Yup.string().max(256),
    url: Yup.string(),
    profile__bg: Yup.string()
});