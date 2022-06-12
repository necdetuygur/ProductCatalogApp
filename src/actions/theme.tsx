export const setTheme = (theme: string) => {
  return {
    type: "THEME",
    payload: theme,
  };
};
