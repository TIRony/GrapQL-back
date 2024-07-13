const { z } = require("zod");

const registerValidation = (data) => {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().min(6).email(),
    password: z.string().min(6),
  });

  try {
    schema.parse(data);
    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

const loginValidation = (data) => {
  const schema = z.object({
    email: z.string().min(6).email(),
    password: z.string().min(6),
  });

  try {
    schema.parse(data);
    return { error: null };
  } catch (err) {
    return { error: err };
  }
};

module.exports = { registerValidation, loginValidation };
