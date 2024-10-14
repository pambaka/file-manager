const getUserName = () => {
  const startChars = "--username=";
  const arg = process.argv.filter((arg) => arg.startsWith(startChars));
  const username = arg.length ? arg[0].replace(startChars, "") : "guest";

  return username;
};

export default getUserName;
