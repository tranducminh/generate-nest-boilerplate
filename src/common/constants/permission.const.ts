export type Permission = User | Role;

export enum Role {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'user',
}

export enum User {
  CREATE = 'user:create',
  READ = 'user:read',
  UPDATE = 'user:update',
  DELETE = 'user:delete',
}
