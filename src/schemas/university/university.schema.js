import * as Yup from "yup";
export const UniversitySchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('University name'),
  city_id: Yup
    .number()
    .required()
    .label('City')
})
