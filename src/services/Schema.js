import * as Yup from "yup";
export const Schema = Yup.object().shape({
  firstName: Yup.string().required("* Please fill out first name"),
  lastName: Yup.string().required("* Please fill out last name"),

  email: Yup.string()
    .email("* Invalid email")
    .required("* Please fill out email"),
  password: Yup.string().required("* Please fill out password"),
  role: Yup.string().required("* Please select a role"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("* Invalid email")
    .required("* Please fill out email"),
  password: Yup.string().required("* Please fill out password"),
});
