const URL = "http://localhost:3000/api";

interface ChangePasswordModel {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface ChangePasswordSuccessResponse {
  status: "success";
  message: string;
  token?: string;
}

interface ChangePasswordErrorResponse {
  status: "error";
  message: string;
}

type ChangePasswordResponse =
  | ChangePasswordSuccessResponse
  | ChangePasswordErrorResponse;

export const changePassword = async (
  model: ChangePasswordModel, // password form will be passed into here
  userToken: string // user token
): Promise<ChangePasswordResponse> => {
  try {
    const res = await fetch(`${URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, //passing bearer token from local storage into headers
      },
      body: JSON.stringify(model),
    });

    const data = await res.json(); //get response, expecting a successful message

    if (res.ok) {
      //successful password change
      return {
        status: "success",
        message: "Password Changed successful!",
      };
    } else {
      // Other errors with a specific message from the backend
      return {
        status: "error",
        message: data.error || "An error occurred during password change.",
      };
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      status: "error",
      message: "Failed to connect to the change password function.",
    };
  }
};
