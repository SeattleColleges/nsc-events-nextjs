/**
 * Represents a user.
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  role: string;
}

export interface UsersData {
  data: User[];
  page: number;
  total: number;
  pages: number;
}
