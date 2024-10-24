import { serial, varchar, text, pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResponse: text('jsonMockResponse').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(), // Specify length if necessary
    jobDescription: varchar('jobDescription', { length: 1000 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }), // Adjust type if this is a date
    mockId: varchar('mockId', { length: 255 }).notNull()
});

export const UserAnswerTable = pgTable('userAnswerTable', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId', { length: 255 }).notNull(),
    question: varchar('question', {length: 2000 }).notNull(),
    correctAnswer: text('correctAnswer').notNull(),
    userAns: text('userAns').notNull(),
    feedback: text('feedback').notNull(),
    rating: varchar('rating', {length: 255 }).notNull(),
    useEmail: varchar('userEmail',{ length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }), // Adjust type if this is a date
});
