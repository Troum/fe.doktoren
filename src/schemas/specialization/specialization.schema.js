import * as Yup from "yup";
export const SpecializationSchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name')
})
