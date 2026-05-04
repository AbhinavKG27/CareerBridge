export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateRequired = (value) => {
  return value.trim() !== "";
};

export const validateMinLength = (
  value,
  length
) => {
  return value.trim().length >= length;
};