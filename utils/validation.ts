 

export interface ValidationErrors {
  [key: string]: string;
}

export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const validatePhone = (phone: string): string => {
  const trimmed = phone.trim();
  if (!trimmed) return "Phone number is required";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7) return "Please enter a valid mobile number";
  return "";
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return "";
};

export const validatePassengerInfo = (data: {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  passengers?: number;
  luggage?: number;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateRequired(data.fullName || "", "Full Name");
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(data.email || "");
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phoneNumber || "");
  if (phoneError) errors.phoneNumber = phoneError;

  if (!data.passengers || data.passengers < 1) {
    errors.passengers = "At least 1 passenger is required";
  }

  if (data.luggage === undefined || data.luggage < 0) {
    errors.luggage = "Luggage count is required";
  }

  return errors;
};




