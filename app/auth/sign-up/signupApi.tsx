interface signUpPayload {
  name: string;
  email: string;
  password: string;
  role: "user";
}

type signUpResponse = string | { message: string };

export const signUp = async (
  payload: signUpPayload
): Promise<signUpResponse> => {
  const URL = "http://localhost:3000/api/auth/signup";
  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Signup failed for an unknown reason");
    } else {
      localStorage.setItem("token", data.token);
      return "Success";
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return "Signup failed";
  }
};
