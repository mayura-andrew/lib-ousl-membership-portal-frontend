export type Status = 'approved' | 'rejected' | 'pending';
export type ApplicationState = 'pending' | 'approved' | 'rejected';

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}


export interface LibraryMembershipData {
  id: string;
  application: {
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    reg_no: number;
    membership_type: 'UNDERGRADUATE' | 'POSTGRADUATE' | 'STAFF' | 'EXTERNAL';
    student_id: string;
    faculty: string;
    course: string;
    level: string;
    personal_email: string;
    university_email: string;
    contact_no: string;
    permanent_address: Address;
    nic_no: string;
    date_of_birth: string;
    profile_pic?: string;
  };
  state: ApplicationState;
  payment_status: 'pending' | 'processing' | 'confirmed' | 'failed';
  membership_status: 'not_started' | 'processing' | 'active' | 'expired';
  created_at: string;
  updated_at: string;
  status_updated_by?: string;
  status_updated_date?: string;
}
