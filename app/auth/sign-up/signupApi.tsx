const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
interface SignUpPayload {
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  password: string;
  role: string;
}

interface SignUpSuccessResponse {
  status: "success";
  message: string;
  token?: string;
}

interface SignUpErrorResponse {
  status: "error";
  message: string;
}

type SignUpResponse = SignUpSuccessResponse | SignUpErrorResponse;

export const signUp = async (
  payload: SignUpPayload
): Promise<SignUpResponse> => {
    if (apiUrl?.includes('localhost')) {
    console.log('Dev API Address: ',apiUrl)
  }

  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.ok) {
      // Successful signup
      return {
        status: "success",
        message: "Signup successful!",
        token: data.token,
      };
    } else if (response.status === 409) {
      // Email Already in Use
      return {
        status: "error",
        message: "User with this email already exists.",
      };
    } else {
      // Other errors with a specific message from the backend
      return {
        status: "error",
        message: data.error || "An error occurred during signup.",
      };
    }
  } catch (error) {
    console.error("Error signing up:", error);
    // Handling unexpected errors, possibly network issues
    return {
      status: "error",
      message: "Failed to connect to the signup service.",
    };
  }
};
