# AI Interview Mocker

## Overview
AI Interview Mocker is a web application designed to help users prepare for interviews by providing AI-powered mock interviews. The platform allows users to create mock interviews, receive feedback, and improve their interview skills.

## Table of Contents
- [AI Interview Mocker](#ai-interview-mocker)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
- [or](#or)

## Features
- Create and manage mock interviews.
- AI-generated interview questions based on job position and experience.
- Video and audio recording of responses.
- Feedback and ratings for each answer.
- User authentication and profile management.
- Responsive design for various devices.

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Drizzle ORM, PostgreSQL
- **Authentication**: Clerk
- **AI Integration**: Gemini AI Model for generating interview questions and feedback
- **Deployment**: Vercel

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm or yarn
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-interview-mocker.git```
   cd ai-interview-mocker

2. Install dependencies:
   ```bash
   npm install or yarn install ```

3. Create a .env.local file in the root directory and add the necessary environment variables:
```plaintext
    NEXT_PUBLIC_IMP_NOTE=Your important note
    NEXT_PUBLIC_QUESTION_NOTE=Your question note
    NEXT_PUBLIC_VIDEO_INFORMATION=Information about video usage
    NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=Number of questions to generate
```

4. Set up your PostgreSQL database and update the database connection string in your `.env.local`

## Usage

1. **Start the Development Server:**
   To run the application locally, start the development server with the following command:
   ```bash
   npm run dev
   # or
   yarn dev

2. **Access the Application:** 
   - Open your web browser and navigate to `http://localhost:3000` You will be greeted with the application interface.

3. **User Authentication:**
    - If you are a new user, click on the "Sign Up" button to create a new account. Fill in the required details and follow the prompts.
    -If you already have an account, click on the "Sign In" button and enter your credentials to log in.

4. **Creating a Mock Interview:**
    -Once logged in, navigate to the dashboard.
    - Click on the "+ Add New" button to create a new mock interview.
    - Fill in the fields for Job Position, Job Description, and Years of Experience.
    - Click on the "Start Interview" button to begin the mock interview process.

5. **Conducting the Interview:**
    - During the interview, you will be presented with AI-generated questions based on the details you provided.
   - You can record your answers using the "Record Answer" button, which activates your microphone and webcam.

6. **Receiving Feedback:**
    - After you record your answer, the system will analyze your response and provide feedback along with a rating.
    - You can review this feedback to improve your interview skills.

7. **Managing Your Interviews:**
    - You can view past interviews, edit them, or create new ones from the dashboard.
    - Use the provided options to manage your interview sessions effectively.