export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permisos: string[];
}

