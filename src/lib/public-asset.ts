// Public assets must follow the app's base path on GitHub project Pages.
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
