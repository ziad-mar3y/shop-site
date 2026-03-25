export interface Address {
  _id?: string;
  name: string;
  details: string;
  city: string;
  phone: string;
}

export interface PasswordForm {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  phone: string;
}

export interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export interface ProfilePageState {
  addresses: Address[];
  loading: boolean;
  showForm: boolean;
  activeSection: "addresses" | "settings";
  addAdrressLoading: boolean;
  removeAdrressLoading: boolean;
  passwordForm: PasswordForm;
  passwordLoading: boolean;
  showPasswords: ShowPasswords;
  profileForm: ProfileForm;
  profileLoading: boolean;
  isEditingProfile: boolean;
  form: {
    name: string;
    details: string;
    phone: string;
    city: string;
  };
}
