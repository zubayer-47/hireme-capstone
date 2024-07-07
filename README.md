# Project Title

**Hireme**

## Overview

Hireme simplifies and enhances the job application process for job seekers.

### Problem

Job hunting can be one of the most stressful experiences, especially for recent graduates or those re-entering the workforce. Crafting a compelling resume and cover letter is crucial, yet many struggle with this daunting task. The anxiety of rejections, coupled with the challenge of creating standout application documents, can be overwhelming. Hireme addresses these challenges with a versatile tool designed to support every aspect of the job application process.

### User Profile

**Job Seekers:**

- Create compelling resumes and cover letters using the builder tool.
- Enhance application documents with tailored feedback based on job descriptions.
- Engage with a supportive community to share job application journeys and receive encouragement.
- Track and organize job applications, updating statuses to stay organized.
- Appreciate a clean and intuitive UI.

### Features

- **Private Workspace**: Protect privacy with dedicated personal workspaces.
- **Document Management**: View, filter, sort, search, and paginate drafted documents.
- **Resume Builder**: Create resumes using an intuitive builder tool.
- **AI Enhancer**: Analyze and improve resumes based on job descriptions.
- **Job Application Tracker**: Track applications with an interactive table.
- **Application Status Updates**: Easily update application statuses.
- **Organized Job Application Lists**: Stay on top of job search progress.

## Implementation

### Tech Stack

**Framework:**

- Next.js

**Front-End:**

- React
- TypeScript
- TailwindCSS
- Shadcn-UI Library

**Database:**

- Convex

**Authentication:**

- Clerk

**AI Model:**

- Gemini API

**Client Libraries:**

- Framer Motion (animation)
- React-PDF/renderer (PDF rendering)
- PDFJS (PDF conversion)
- Lucide React (icons)
- React Hook Form (form library)
- Zod (form validation)
- Zustand (global state management)
- Tanstack React-Table (table component)

**Deployment:**

- Vercel

### APIs

- Gemini API
- Clerk
- Convex

### Sitemap

#### Landing

- **Landing Page**: `/`
  - Sections: Header, Hero, Features, BentoGridFeatures, Highlights, CTA, Footer

#### Auth

- **Sign-In**: `/auth/sign-in/[[...sign-in]]`
- **Sign-Up**: `/auth/sign-up/[[...sign-up]]`

#### Feeds

- **User Feeds**: `/feeds/:userId`
  - Homepage for authenticated users.
  - Public resume sharing.
  - Interaction features: upvote, downvote, comment.

#### Builder

- **Document List**: `/builder`
  - Main page listing all drafted documents.
  - Toggle between Resume and Cover Letter.
  
- **Resume Builder**: `/builder/resume/:resumeId`
  - Real-time updates as users fill out forms.
  - Enhancement button for AI feedback.

#### Tracker

- **Job Tracker Main Page**: `/tracker`
  - Interactive table for tracked job applications.
  - Filter, search, and pagination features.
  
- **New Application**: `/tracker/application`
  - Page for creating new job applications.
  
- **Edit Application**: `/tracker/application/:applicationId`
  - Page for editing existing job applications.

### Mockups

#### Landing Page

- **Header & Hero**
  ![Header & Hero](header-hero.png)

- **Features**
  ![Features](features.png)

- **Call to Action (CTA)**
  ![CTA](cta.png)

- **Footer**
  ![Footer](footer.png)

#### Feeds Page

![Feeds](feeds.png)

#### Builder Page

- **Builder Main Page**
  ![Builder](builder.png)

- **Resume Builder Main Page**
  ![Resume Builder](resume-builder.png)

- **Enhance Tab**
  ![Enhance Tab](enhance-tab.png)

- **Stepper Form**
  ![Stepper Form](stepper-form.png)

#### Job Tracker Page

![Tracker](tracker.png)

### Data Schema

![Schema Diagram](schema-diagram.png)

### Server HTTP Methods Functions

#### Fetching & Storing User to the Database

- **Get Self Function**: Fetch current login user.

#### Job Tracker

- **GET /tracker**: Retrieve all user applications.

- **POST /tracker/application**: Create new application.

- **PUT or PATCH /tracker/application/:applicationId**: Update existing application.

- **DELETE /tracker**: Delete existing application.

#### Builder

- **GET /builder**: Retrieve documents.

- **POST /builder**: Create new document.

- **PUT or PATCH /builder/resume/:resumeId**: Edit existing document.

- **DELETE /builder**: Delete existing document.

#### AI Results

- **GET /builder/resume/:resumeId**: Query AI results.

## Roadmap

- **Create Project using React - NextJS**
  - Install dependencies, set up folder structure and routes.

- **Build ResumeStore for global state management**
  - Implement resume store files.

- **Integrate Clerk Authentication**
  - Create authentication pages and routes.

- **Hook AI with Convex Database**
  - Synchronize user data.

- **Build Landing Page**
  - Design and integrate components.

- **Create Global Browser Layout Component**
  - Implement reusable layout.

- **Build Feeds Page**
  - Develop feed components.

- **Build Builder Page**
  - Implement document management and creation.

- **Build Resume Builder**
  - Develop resume creation and AI integration.

- **Build Enhance Tab**
  - Implement AI feedback feature.

- **Build Tracker Page**
  - Implement job application tracking.

- **Deployment**
  - Deploy application on Vercel.

- **Testing, Styling, Bug Fixes**
  - Ensure application functionality and design.

- **Create Presentation and Demo**

## Nice-to-haves

- **Integrate Sentry for error tracking**
- **Use Jest for testing**
- **Implement Cover Letter Builder**
- **Add Calendar feature**
- **Implement Interview Prep and Career Path Generator**
- **Upload and parse resume/cover letter**
- **Create Dashboard for analytics**
- **Integrate Gamification**
- **Add caching mechanism**

