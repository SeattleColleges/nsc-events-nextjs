import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";


interface NewUserRequest {
  // request will contain use info coming from frontend
  name: string;
  email: string;
  password: string;
}

interface NewUserResponse {
  // response will contain data we send as a response
  id: string;
  name: string;
  email: string;
  role: string;
}


// sign-up route creation

// with the next response, either return the user or an error
type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string}>;

// take the incoming request(user info) and return a promise with the new response(user info)
export const POST = async (req: Request): Promise<NewResponse> => {
  // request the data coming from the frontend, then compare incoming data to what's in our db
  const body = (await req.json()) as NewUserRequest;

  await startDb();

    const existingUser = await UserModel.findOne({ email: body.email })
    if (existingUser) {
        return NextResponse.json(
            { error: "email is already in use!" },
            { status: 422 }
        );
    }
    // if a new user create with NewUserRequest
    const user = await UserModel.create({ ...body });

    return NextResponse.json({
        user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
    },

    });


  // todo: once db has been created along with construction of schema, 
        // we can compare sign-up email to emails in our db 
        // upon creation of a user model, we can create a new user using user model
        // then return new user info as a response to the frontend sign-up page


  // return NextResponse.json({
  //   user: {
  //     id: "_id",
  //     email: "email",
  //     name: "name",
  //     role: "role",
  //   },
  // });

};

