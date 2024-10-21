/** @type { import("drizzle-kit").Config } */
export default{
    dialect: "postgresql",
    schema: "./utils/schema.js",
    dbCredentials:{
        url: 'postgresql://ai-interview-mocker_owner:OEe8RSB3NYGy@ep-holy-tree-a4xh1qoo.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require'
    }
};