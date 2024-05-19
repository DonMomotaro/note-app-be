export const pagination = (limit: any, offset: any, total: any) => {
  return {
    limit: Number(limit),
    offset: Number(offset),
    total: Number(total),
  };
};
