export type Role = "admin" | "user" | "client" | "coach";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  preferableActivity?: string;
  target?: string;
  about?: string;
  imageUrl?: string;
  filrUrls?: string[];
  rating?: number;
  specializations?: string[];
}
