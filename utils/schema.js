import { serial, varchar, text, pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id'),
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(), // Specify length if necessary
    jobDescription: varchar('jobDescription', { length: 500 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }), // Adjust type if this is a date
    mockId: varchar('mockId', { length: 255 }).notNull()
});
