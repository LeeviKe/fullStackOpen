// import { z } from 'zod';
// import { NewPatient, Gender } from './types';

// // const isString = (text: unknown): text is string => {
// //   return typeof text === 'string' || text instanceof String;
// // };

// // const parseName = (name: unknown): string => {
// //   if (!isString(name)) {
// //     throw new Error('Incorrect name' + name);
// //   }
// //   return name;
// // };

// // const isDate = (date: string): boolean => {
// //   return Boolean(Date.parse(date));
// // };

// // const parseDate = (date: unknown): string => {
// //   if (!isString(date) || !isDate(date)) {
// //     throw new Error('Incorrect date: ' + date);
// //   }
// //   return date;
// // };

// // const parseSsn = (ssn: unknown): string => {
// //   if (!isString(ssn)) {
// //     throw new Error('Incorrect ssn: ' + ssn);
// //   }
// //   return ssn;
// // };

// // const parseOccupation = (occupation: unknown) => {
// //   if (!isString(occupation)) {
// //     throw new Error('Incorrect occupation' + occupation);
// //   }
// //   return occupation;
// // };

// // const isGender = (param: string): param is Gender => {
// //   return Object.values(Gender)
// //     .map((v) => v.toString())
// //     .includes(param);
// // };

// // const parseGender = (gender: unknown) => {
// //   if (!isString(gender) || !isGender(gender)) {
// //     throw new Error('Incorrect gender' + gender);
// //   }
// //   return gender;
// // };

// const newPatientSchema = z.object({
//   name: z.string(),
//   dateOfBirth: z.string().date(),
//   ssn: z.string(),
//   gender: z.enum(Gender),
//   occupation: z.string(),
//   entries: z.array(z.string()),
// });

// const toNewPatient = (object: unknown): NewPatient => {
//   return newPatientSchema.parse(object);
// };

// export default toNewPatient;
