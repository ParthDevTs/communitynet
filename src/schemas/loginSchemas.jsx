import * as Yup from "yup";

export const loginSchema = Yup.object({
    username: Yup
        .string()
        .min(5, "User ID must be atleast 5 Characters")
        .required("User ID is required"),
    password: Yup
        .string()
        .required("Please enter password")

});

export const signUpSchema = Yup.object({
    username: Yup
        .string()
        .min(6, "User ID must be atleast 6 Characters")
        .max(10, "max character length 10")
        .required("User ID is required")
        .matches("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$", "Please use Alphanumeric and Special Characters(. and _ only) for username"),
    password: Yup
        .string()
        .required("Please enter password")
        .min(3, "Password must be atleast 3 characters"),
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    confirm_password: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),


})

export const loginInitialValues = {
    username: "",
    password: "",
}
export const signUpInitialValues = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirm_password: "",
}