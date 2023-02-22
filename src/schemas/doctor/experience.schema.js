import * as Yup from "yup";
export const ExperienceSchema = Yup.object({
  id: Yup.number()
    .required()
    .label('Center'),
  position: Yup.number()
    .required()
    .label('Position'),
  start_date: Yup.number()
    .required()
    .label('Working start date'),
  end_date: Yup.number()
    .test('endDate', 'End date shouldn\'t be less than start date', function (value) {
      return this.parent.start_date <= value
    })
    .required()
    .label('Working end date'),
  now: Yup.bool()
    .default(false)
    .label('Still working'),
  is_main: Yup.bool()
    .default(false)
    .label('Main work place')

})
