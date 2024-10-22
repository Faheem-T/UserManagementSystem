const role = {
  trim: true,
  escape: true,
  isIn: {
    options: ["user", "admin"],
    errorMessage: "Invalid user role",
  },
};

const username = {
  trim: true,
  escape: true,
  notEmpty: {
    errorMessage: "Username cannot be empty",
  },
  isLength: {
    options: { min: 3 },
    errorMessage: "Username should be more than 2 characters",
  },
};

const email = {
  trim: true,
  escape: true,
  isEmail: {
    errorMessage: "Invalid email",
  },
};

const password = {
  trim: true,
  escape: true,
  isLength: {
    options: { min: 4 },
    errorMessage: "Password should be more than 4 characters",
  },
};

const _id = {
  trim: true,
  escape: true,
};

// REMEMBER: search text can be empty, don't error that
const searchText = {
  trim: true,
  escape: true,
};

// validation for signup and createUser
export const userFormValidation = {
  username,
  email,
  password,
  role,
};

// validation for login page
export const loginValidation = {
  username,
  password,
};

// validation for search bar in admin page
export const searchValidation = {
  searchText,
};

// validation for edit user page
export const editUserValidation = {
  _id,
  username,
  email,
};
