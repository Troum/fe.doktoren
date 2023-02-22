import * as Yup from "yup";

export const CourseSchema = Yup.object({
  name: Yup.string()
    .required()
    .label('Course name'),
  place: Yup.string()
    .label('Place'),
  start_date: Yup.number()
    .required()
    .label('Start date'),
  end_date: Yup.number()
    .test('endDate', 'End date shouldn\'t be less than start date', function (value) {
      return this.parent.start_date <= value
    })
    .required()
    .label('End date')
})
