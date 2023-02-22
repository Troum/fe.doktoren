import * as Yup from "yup";
export const CenterSchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name'),
  avatar: Yup
    .mixed()
    .label('Avatar'),
  city_id: Yup
    .number()
    .required()
    .label('City'),
  age_group: Yup
    .string()
    .required()
    .label('Age group'),
  specialization: Yup
    .number()
    .label('Specialization'),
  type: Yup
    .number()
    .label('Type'),
  address: Yup
    .string()
    .required()
    .label('Address')
})
