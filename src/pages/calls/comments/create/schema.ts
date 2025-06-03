import z from "zod";

export type CreateCallCommentFormMeta = z.infer<typeof createCallCommentSchema>

export const createCallCommentSchema = z.object({
    content: z.string().min(1, "Content cannot be empty."),
})

export const defaultFormValues = {
    content: ""
}