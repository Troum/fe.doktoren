import * as Yup from "yup";
export const SpecialitySchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name'),
  avatar: Yup
    .mixed()
    .label('Icon'),
  pseudonym: Yup
    .string()
    .required()
    .label('Pseudonym'),
  age_group: Yup
    .string()
    .required()
    .label('Age group')
})
