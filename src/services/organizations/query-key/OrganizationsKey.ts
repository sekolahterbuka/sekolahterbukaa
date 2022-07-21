export const organizationsKeys = {
  all: ['organizations'] as const,
  lists: () => [...organizationsKeys.all, 'list'] as const,
  list: (filters: any) => [...organizationsKeys.lists(), { filters }] as const,
  details: () => [...organizationsKeys.all, 'detail'] as const,
  detail: (id: any | undefined) =>
    [...organizationsKeys.details(), id] as const,
};
