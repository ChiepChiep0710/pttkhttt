export const AppConfig = {
  SALT_ROUND: 10,
  MAX_FILE_UPLOAD: 3 * 1024 * 1024,
  FILE_UPLOAD: ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'],
  FILE_EXCEL_UPLOAD: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  OFFSET: 0,
  LIMIT: 0,
  EVENT_SOCKET: {
    CHANGE_CART: 'CHANGE_CART',
  },
  // STATIC_DIR: 'src/public',
};
