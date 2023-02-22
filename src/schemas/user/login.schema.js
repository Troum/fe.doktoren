import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email().required().label('E-mail'),
  password: Yup.string()
    .min(6)
    .required()
    .label('Password')
})
