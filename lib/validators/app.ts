import { z } from "zod";

export const CreateAppValidator = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(30, {
        message: "Name cannot be more than 30 characters long"
    })
});

export const EditAppValidator = z.object({
    id: z.string(),
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(30, {
        message: "Name cannot be more than 30 characters long"
    })
});

export const DeleteAppValidator = z.object({
    id: z.string()
});

export const CreateApiKeyValidator = z.object({
    appId: z.string()
});

export const CreateTestimonialValidator = z.object({
    appId: z.string(),
    feedback: z.string().min(20, {
        message: "Feedback must be at least 20 characters long"
    }).max(300, {
        message: "Feedback must be at most 300 characters long"
    }),
    rating: z.number().min(0, {
        message: "Rating must be greater or equal to 0"
    }).max(5, {
        message: "Rating must be smaller or equal to 5"
    }),
    email: z.string().email({
        message: "Email is invalid"
    })
});

export const GetTestimonialsValidator = z.object({
    page: z.number(),
    limit: z.number()
});

export const GetAppValidator = z.object({
    appId: z.string()
});

export const GetAppTestimonialsValidator = z.object({
    appId: z.string(),
    page: z.number(),
    limit: z.number()
});

export const RecoverApiKeyValidator = z.object({
    appId: z.string()
});

export const GetAppInfoValidator = z.object({
    appId: z.string()
});

export const DeleteApiKeyForRecoveryValidator = z.object({
    appId: z.string(),
    token: z.string()
});

export const ResendApiKeyTokenValidator = z.object({
    appId: z.string()
});

export const GetTestimonialValidator = z.object({
    testimonialId: z.string()
});

export const BulkDeleteTestimonialsValidator = z.object({
    testimonialIds: z.array(z.string())
});

export type CreateAppPayload = z.infer<typeof CreateAppValidator>;
export type EditAppPayload = z.infer<typeof EditAppValidator>;
export type DeleteAppPayload = z.infer<typeof DeleteAppValidator>;
export type CreateApiKeyPayload = z.infer<typeof CreateApiKeyValidator>;
export type CreateTestimonialPayload = z.infer<typeof CreateTestimonialValidator>;
export type GetTestimonialsPayload = z.infer<typeof GetTestimonialsValidator>;
export type GetAppPayload = z.infer<typeof GetAppValidator>;
export type GetAppTestimonialsPayload = z.infer<typeof GetAppTestimonialsValidator>;
export type RecoverApiKeyPayload = z.infer<typeof RecoverApiKeyValidator>;
export type GetAppInfoPayload = z.infer<typeof GetAppInfoValidator>;
export type DeleteApiKeyForRecoveryPayload = z.infer<typeof DeleteApiKeyForRecoveryValidator>;
export type ResendApiKeyTokenPayload = z.infer<typeof ResendApiKeyTokenValidator>;
export type GetTestimonialPayload = z.infer<typeof GetTestimonialValidator>;
export type BulkDeleteTestimonialsPayload = z.infer<typeof BulkDeleteTestimonialsValidator>;