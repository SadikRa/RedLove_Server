import z from "zod";

const createCommunityPost = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),

  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long" })
    .max(500, { message: "Message must not exceed 500 characters" }),

  email: z.string().email({ message: "Invalid email address" }),
});

const updateCommunityPost = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .optional(),

  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long" })
    .max(500, { message: "Message must not exceed 500 characters" })
    .optional(),

  email: z.string().email({ message: "Invalid email address" }).optional(),
});

const communityValidation = {
  createCommunityPost,
  updateCommunityPost,
};

export default communityValidation;
