export const errorResponse = (message: string) => ({
  success: false,
  message,
});
export const successResponse = (data: unknown) => ({
  success: true,
  data,
});
