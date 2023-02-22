import * as Yup from "yup";
export const DoctorSchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('Name'),
  gender: Yup
    .string()
    .required()
    .label('Gender'),
  career_start: Yup
    .number()
    .required()
    .label('Career start'),
  speciality: Yup
    .number()
    .required()
    .label('Main speciality'),
  specialities: Yup
    .array(Yup.number())
    .label('Additional specialities'),
  academy_degree: Yup
    .string()
    .required()
    .label('Academy degree'),
  age_group: Yup
    .string()
    .required()
    .label('Qge group'),
  description: Yup
    .string()
    .max(1000)
    .label('Qge group')
})
