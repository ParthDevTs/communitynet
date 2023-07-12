import * as Yup from "yup";

export const newPostInitialSchema = Yup.object({
    content: Yup.string().required("Caption is Mandatory"),

});
