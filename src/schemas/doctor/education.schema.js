import * as Yup from "yup";

export const EducationSchema = Yup.object({
  id: Yup.number()
    .required()
    .label('University'),
  specialization: Yup.string()
    .required()
    .label('Specialization'),
  start_date: Yup.number()
    .required()
    .label('Start date'),
  end_date: Yup.number()
    .test('endDate', 'End date shouldn\'t be less than start date', function (value) {
      return this.parent.start_date <= value
    })
    .required()
    .label('End date'),
  now: Yup.bool()
    .required()
    .label('Still study')

})
