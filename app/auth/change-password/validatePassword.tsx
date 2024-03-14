interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

//this function is to validate password change input fields

export const validateChangePassword = (values: ChangePasswordForm) => {
  const errors: Partial<ChangePasswordForm> = {};

  const { currentPassword, newPassword, newPasswordConfirm } = values;

  if (!currentPassword) {
    errors.currentPassword = "Current password is required.";
  }

  if (!newPassword) {
    errors.newPassword = "New password is required.";
  }

  if (!newPasswordConfirm) {
    errors.newPasswordConfirm = "Confirm password is required";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  } else if (newPassword.length > 30) {
    errors.newPassword = "Password must be less than 30 characters";
  } else if (newPassword.search(/[a-z]/i) < 0) {
    errors.newPassword = "Password must contain at least one letter";
  } else if (newPassword.search(/[0-9]/) < 0) {
    errors.newPassword = "Password must contain at least one digit";
  } else if (newPassword.search(/[!@#$%^&*]/) < 0) {
    errors.newPassword = "Password must contain at least one special character";
  }

  //checking if password confirm matches
  if (newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = "Passwords do not match";
  }

  return errors;
};
