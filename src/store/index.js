// Utilities
import {createPinia} from 'pinia'
import common from "@/store/common/app";
import doctors from "@/store/entities/doctors";
import positions from "@/store/entities/positions";
import centers from "@/store/entities/centers";
import universities from "@/store/entities/universities"
import specialities from "@/store/entities/specialities"
import avatar from "@/store/components/avatar";
import experienceDialog from "@/store/components/dialogs/experience.dialog";
import educationDialog from "@/store/components/dialogs/education.dialog";
import confirmationDialog from "@/store/components/dialogs/confirmation.dialog";
import courseDialog from "@/store/components/dialogs/course.dialog";
import user from "@/store/auth/user"
import response from "@/store/components/responseAlert"
import countries from "@/store/entities/countries";
import cities from "@/store/entities/cities";
import loading from "@/store/common/loading";

export const doctorStorage = doctors
export const positionStorage = positions
export const centerStorage = centers
export const universityStorage = universities
export const specialityStorage = specialities
export const commonStorage = common
export const avatarStorage = avatar
export const experienceDialogStorage = experienceDialog
export const confirmationDialogStorage = confirmationDialog
export const educationDialogStorage = educationDialog
export const courseDialogStorage = courseDialog
export const userStorage = user
export const responseStorage = response
export const countryStorage = countries
export const cityStorage = cities
export const loadingStorage = loading

export default createPinia()
