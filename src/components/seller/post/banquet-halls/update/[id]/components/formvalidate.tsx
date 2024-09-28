import * as Yup from 'yup';

// Get the current year for validation
const currentYear = new Date().getFullYear();

// Comprehensive validation schema for all steps combined
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.object({
    city: Yup.string().required('City is required'),
    pincode: Yup.string()
      .length(6, 'Pincode must be exactly 6 digits')
      .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
      .required('Pincode is required'),
    area: Yup.string().required('Area is required'),
  }),
  description: Yup.string().required('Description is required'),
  operatingDays: Yup.string().required('Operating Days are required'),
  openHours: Yup.string().required('Open Hours are required'),
  type: Yup.string().required('Type is required'),
  billboard: Yup.mixed().required('Cover Photo is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .test(
      'max-length',
      'Price must be at most 8 digits long',
      value => !value || (value.toString().length <= 8)
    ),
  capacity: Yup.number()
    .required('Capacity is required')
    .positive('Capacity must be a positive number')
    .test(
      'max-length',
      'Capacity must be at most 4 digits long',
      value => !value || (value.toString().length <= 4)
    ),
  yearOfEstd: Yup.number()
    .required('Year of Establishment is required')
    .positive('Year must be a positive number')
    .min(1900, 'Year must be at least 1900')
    .max(currentYear, `Year must not be greater than ${currentYear}`),
  services: Yup.array().of(Yup.string().required('Service is required')),
  specialFeature: Yup.array().of(Yup.string().required('Special Feature is required')),
  availability: Yup.array().of(Yup.string().required('Availability is required')),
});

// Function to get validation schema based on step
export const getValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return Yup.object({
        name: Yup.string().required('Name is required'),
        location: Yup.object({
          city: Yup.string().required('City is required'),
          pincode: Yup.string()
            .length(6, 'Pincode must be exactly 6 digits')
            .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
            .required('Pincode is required'),
          area: Yup.string().required('Area is required'),
        }),
        description: Yup.string().required('Description is required'),
        operatingDays: Yup.string().required('Operating Days are required'),
        openHours: Yup.string().required('Open Hours are required'),
        type: Yup.string().required('Type is required'),
        billboard: Yup.mixed().required('Cover Photo is required'),
      });
    case 2:
      return Yup.object({
        price: Yup.number()
          .required('Price is required')
          .positive('Price must be a positive number')
          .test(
            'max-length',
            'Price must be at most 8 digits long',
            value => !value || (value.toString().length <= 8)
          ),
        capacity: Yup.number()
          .required('Capacity is required')
          .positive('Capacity must be a positive number')
          .test(
            'max-length',
            'Capacity must be at most 4 digits long',
            value => !value || (value.toString().length <= 4)
          ),
      
        yearOfEstd: Yup.number()
          .required('Year of Establishment is required')
          .positive('Year must be a positive number')
          .min(1900, 'Year must be at least 1900')
          .max(currentYear, `Year must not be greater than ${currentYear}`),
      });
    case 3:
      return Yup.object({
        services: Yup.array().of(Yup.string().required('Service is required')),
        specialFeature: Yup.array().of(Yup.string().required('Special Feature is required')),
        availability: Yup.array().of(Yup.string().required('Availability is required')),
      });
    default:
      return Yup.object();
  }
};
