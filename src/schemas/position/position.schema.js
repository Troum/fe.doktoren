import * as Yup from "yup";
export const PositionSchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name')
})
