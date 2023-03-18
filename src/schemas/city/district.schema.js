import * as Yup from "yup";

export const DistrictSchema = Yup.object({
  id: Yup
    .string(),
  name: Yup
    .string()
    .label('District name'),
  districts: Yup
    .string()
})
