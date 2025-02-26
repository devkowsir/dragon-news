const EmailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /(?=.*[0-9a-zA-Z]).{6,}/;

export const isValidName = (name) => {
  if (typeof name !== "string") throw new Error("Name must be string");
  if (name.trim().length < 3) return false;
  return true;
};

export const isValidPhotoURL = async (url) => {
  if (typeof url !== "string") throw new Error("URL must be string");

  return new Promise((res, rej) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) return rej("Invalid URL.");
        if (response.headers.get("content-type").startsWith("image/")) return res(true);
        return rej(false);
      })
      .catch(() => rej("Something went wrong during fetching!"));
  });
};

export const isValidEmail = (email) => {
  if (typeof email !== "string") throw new Error("Email must be string");

  return EmailRegex.test(email);
};

export const isValidPassword = (password) => {
  if (typeof password !== "string") throw new Error("Password must be string");

  return passwordRegex.test(password);
};
