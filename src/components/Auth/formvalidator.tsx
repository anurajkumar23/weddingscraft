import { object, ref, string } from "yup";

export const LogInSchema = object({
  email: string().email().required('Please enter your Email'),
  password: string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters long'),
});

export const SignUpSchema = object({
    name: string()
      .trim()
      .min(2)
      .max(25)
      .required("Please enter your name"),
    email: string().email().required("Please enter your Email"),
    password: string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters long'),     
    confirmpassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords don't match."),
    phone: string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Please enter your phone number"),
  });
  
  export const ForgotPasswordSchema = object({
    email: string().email().required("Please enter your Email"),
  })
  
  export const ResetSchema = object({
    password: string()
      .required("Please enter your password")
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   "Password: 8+ characters, 1 uppercase, 1 number, 1 special character."
      // ),
      ,
    confirmpassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords don't match."),
  })