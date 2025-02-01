import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Check } from 'lucide-react';

// Define the form schema
const LibraryMembershipSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']),
  initials: z.string().min(1, "Initials are required"),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  reg_no: z.number().min(100000, "Registration number must be 6 digits"),
  membership_type: z.enum(['UNDERGRADUATE', 'POSTGRADUATE', 'STAFF', 'EXTERNAL']),
  student_id: z.string().min(2, "Student ID is required"),
  personal_email: z.string().email("Invalid email format"),
  university_email: z.string().email("Invalid email format").endsWith('.lk', "Must be a university email"),
  contact_no: z.number().min(10000000, "Contact number must be valid"),
  permanent_address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.number().min(10000, "ZIP code must be 5 digits")
  }),
  faculty: z.string().min(1, "Faculty is required"),
  course: z.string().min(1, "Course is required"),
  level: z.string().min(1, "Level is required"),
  nic_no: z.number().min(100000000, "NIC number must be valid"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  profilePic: z.string().optional()
});

type LibraryMembership = z.infer<typeof LibraryMembershipSchema>;

const steps = [
  {
    id: 'Step 1',
    title: 'Personal Information',
    fields: ['title', 'initials', 'first_name', 'last_name', 'full_name', 'date_of_birth', 'nic_no']
  },
  {
    id: 'Step 2',
    title: 'Contact Information',
    fields: ['personal_email', 'university_email', 'contact_no', 'permanent_address']
  },
  {
    id: 'Step 3',
    title: 'Academic Information',
    fields: ['reg_no', 'membership_type', 'student_id', 'faculty', 'course', 'level']
  }
];

const LibraryMembershipForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profilePic, setProfilePic] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LibraryMembership>({
    resolver: zodResolver(LibraryMembershipSchema),
    mode: 'onChange'
  });

  const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        setProfilePic(URL.createObjectURL(file));
      } else {
        alert('Profile picture must be less than 5MB');
      }
    }
  };

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const isStepValid = await trigger(fields as Array<keyof LibraryMembership>);
    
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async (data: LibraryMembership) => {
    setIsSubmitting(true);
    try {
      // Add API call here
      console.log('Form submitted:', data);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Library Membership Application</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}        
        <div className="mb-8">
          <div className="relative">
            {/* Connecting Line - Adjusted positioning */}
            <div className="absolute top-5 left-[15%] right-[15%] h-1 bg-gray-200">
              <div
                className="absolute top-0 h-full bg-orange-500 transition-all duration-300 ease-in-out"
                style={{ 
                  width: `${(currentStep / (steps.length - 1)) * 100}%`
                }}
              />
            </div>
        
            {/* Step Indicators - With completed check icon */}
            <div className="relative flex justify-between">
              {['Personal Details', 'Address', 'Academic Info'].map((label, idx) => (
                <div key={idx} className="flex flex-col items-center z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                      idx <= currentStep 
                        ? 'border-orange-500 bg-orange-500 text-white' 
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    {idx < currentStep ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <span className="text-sm font-medium">{idx + 1}</span>
                    )}
                  </div>
                  <div className={`mt-2 text-sm font-medium ${
                    idx <= currentStep ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {label}
                  </div>
                  {idx <= currentStep && (
                    <div className="mt-1 text-xs text-gray-500">
                      {idx === currentStep ? 'In Progress' : 'Completed'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Picture Section - Always visible */}        
        <div className="mb-6">
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <div 
            onClick={() => document.getElementById('profilePic')?.click()}
            className="cursor-pointer relative group w-32 h-32"
          >
            {profilePic ? (
              <div className="relative w-full h-full">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover ring-2 ring-orange-100 transition-all duration-300 group-hover:ring-orange-300"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center">
                    <Camera className="w-6 h-6 text-white mb-1" />
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 bg-orange-50 rounded-full flex flex-col items-center justify-center border-2 border-dashed border-orange-200 transition-all duration-300 group-hover:border-orange-400 group-hover:bg-orange-100">
                <Camera className="w-8 h-8 text-orange-400 mb-1" />
                <span className="text-sm font-medium text-orange-600">Add Photo</span>
              </div>
            )}
          </div>
        </div>

          {/* Step 1: Personal Information */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <select
                    {...register('title')}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                  </select>
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Initials</label>
                  <input
                    {...register('initials')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.initials && (
                    <p className="text-red-500 text-sm">{errors.initials.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    {...register('first_name')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    {...register('last_name')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  {...register('full_name')}
                  className="w-full p-2 border rounded-md"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">{errors.full_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    {...register('date_of_birth')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-sm">{errors.date_of_birth.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">NIC Number</label>
                  <input
                    {...register('nic_no', { valueAsNumber: true })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.nic_no && (
                    <p className="text-red-500 text-sm">{errors.nic_no.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Personal Email</label>
                  <input
                    type="email"
                    {...register('personal_email')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.personal_email && (
                    <p className="text-red-500 text-sm">{errors.personal_email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">University Email</label>
                  <input
                    type="email"
                    {...register('university_email')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.university_email && (
                    <p className="text-red-500 text-sm">{errors.university_email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input
                  {...register('contact_no', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-md"
                />
                {errors.contact_no && (
                  <p className="text-red-500 text-sm">{errors.contact_no.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Permanent Address</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Street</label>
                  <input
                    {...register('permanent_address.street')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.permanent_address?.street && (
                    <p className="text-red-500 text-sm">{errors.permanent_address.street.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      {...register('permanent_address.city')}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.permanent_address?.city && (
                      <p className="text-red-500 text-sm">{errors.permanent_address.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      {...register('permanent_address.state')}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.permanent_address?.state && (
                      <p className="text-red-500 text-sm">{errors.permanent_address.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                      {...register('permanent_address.zip', { valueAsNumber: true })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.permanent_address?.zip && (
                      <p className="text-red-500 text-sm">{errors.permanent_address.zip.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Registration Number</label>
                  <input
                    {...register('reg_no', { valueAsNumber: true })}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.reg_no && (
                    <p className="text-red-500 text-sm">{errors.reg_no.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Student ID</label>
                  <input
                    {...register('student_id')}
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.student_id && (
                    <p className="text-red-500 text-sm">{errors.student_id.message}</p>
                  )}

            </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Membership Type</label>
                <select
                  {...register('membership_type')}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="UNDERGRADUATE">Undergraduate</option>
                  <option value="POSTGRADUATE">Postgraduate</option>
                  <option value="STAFF">Staff</option>
                  <option value="EXTERNAL">External</option>
                </select>
                {errors.membership_type && (
                  <p className="text-red-500 text-sm">{errors.membership_type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Faculty</label>
                <select
                  {...register('faculty')}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Faculty</option>
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Management">Management</option>
                  <option value="Medicine">Medicine</option>
                </select>
                {errors.faculty && (
                  <p className="text-red-500 text-sm">{errors.faculty.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <input
                  {...register('course')}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., BSc in Computer Science"
                />
                {errors.course && (
                  <p className="text-red-500 text-sm">{errors.course.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select
                  {...register('level')}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Level</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Level 4">Level 4</option>
                  <option value="Level 5">Level 5</option>
                  <option value="Level 6">Level 6</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-sm">{errors.level.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-700 rounded-md hover:bg-blue-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LibraryMembershipForm;
