import {Model, models, model}from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    role: "admin" | "creator" | "user";
}

interface Methods {
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true, trim: true},
    password: { type: String, required: true},
    role: { type: String, enum: ["admin", "creator", "user"], default: "user"},
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
    // hash only when password changes
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw error;
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error;
    }
};

const UserModel = models.User || model("User", userSchema);

export default UserModel as Model<UserDocument, {}, Methods>;