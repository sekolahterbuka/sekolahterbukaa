// create type public.app_permission as enum ('public', 'private', 'freemium', 'premium', 'member');
// create type public.app_role as enum ('admin', 'moderator');
// create type public.publication_role as enum ('draft', 'posted');
// create type public.user_status as enum ('ONLINE', 'OFFLINE');

export const app_permission = {
  public: 'public',
  private: 'private',
  freemium: 'freemium',
  premium: 'premium',
  member: 'member',
};

export const app_role = {
  admin: 'admin',
  moderator: 'moderator',
};

export const publication_role = {
  draft: 'draft',
  posted: 'posted',
};
