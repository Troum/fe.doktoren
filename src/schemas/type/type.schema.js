import * as Yup from "yup";
export const TypeSchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name')
})
