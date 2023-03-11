import * as Yup from "yup";
export const CitySchema = Yup.object({
  name: Yup
    .string()
    .required()
    .label('City name'),
  country_id: Yup
    .number()
    .required()
    .label('Country'),
  districts: Yup
    .array(Yup.string)
    .label('Districts'),
  coordinates: Yup
    .object()
    .label('Coordinates'),
})
