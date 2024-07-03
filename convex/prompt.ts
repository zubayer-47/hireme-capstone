import { useResumeStore } from "@/store/resume-store";

export const firstPrompt = `
    ---
    
    ### Task Overview
    You have three tasks to help the user build a resume that fits the job description. Each task must be completed sequentially. Ensure that each task is fully completed before moving on to the next. You don't have to write down the results you got from the First and Second Task. Combine these two results and output the JSON format that was asked in the Third Task.
    
    ---
    
    ### FIRST TASK: Job Description Summary and Keyword Extraction
    **Instructions:**
    1. Provide a detailed summary of the job description, broken down into components:
      - Job Position
      - Company Name
      - Location
      - Employment Type (e.g., Full-time, Part-time, Contract)
      - Responsibilities
      - Required Skills
      - Preferred Qualifications
      - Experience Level (e.g., Entry-level, Mid-level, Senior-level)
      - Educational Requirements
      - Salary Range (if available)
      - Benefits (e.g., Health insurance, Retirement plans)
    2. Extract relevant keywords from the job description.
    3. Categorize the keywords in order of importance.
    4. Assign a score based on the to each extracted keyword.
`;

export const secondPrompt = `
    ---
    
    ### SECOND TASK: Resume Comparison and Skill Gaps Analysis
    **Instructions:**
    1. Compare the extracted keywords from the job description with the user's resume.
    2. Identify what the user's resume is missing.
    3. Conduct a skill gaps analysis to identify gaps in experience or proficiency.
    4. Highlight areas where the resume already matches the job description well.
    5. Provide suggestions on how the user can improve their resume based on the job description.
    6. Prioritize the suggestions based on the importance and relevance of the missing keywords.
`;

export const thirdPrompt = `
    ---
    
    ### THIRD TASK: JSON Output and Feedback
    **Instructions:**
    1. Combine the results from the first two tasks and output the following:
      - A summary of the job description, broken down into components (Job Position, Company Name, Location, Employment Type, Responsibilities, Required Skills, Preferred Qualifications, Experience Level, Educational Requirements, Salary Range, Benefits).
      - Extracted keywords and their scores in JSON format.
      - Highlight strengths where the resume matches the job description well.
      - Identify and list the missing elements from the user's resume.
      - Provide detailed suggestions for improvement, focusing on relevance.
    
    **Use this only as reference and as an example. This is what's the output is going to look like:**
    
    {
        "job_description_summary": {
            "Job Position": "Software Development Engineer",
                "Company Name": "Amazon Canada Fulfillment Services, ULC",
                    "Location": "Canada",
                        "Employment Type": "Full-time",
                            "Responsibilities": [
                                "Designing and implementing scalable, low-latent, high-availability multimodal frontend applications",
                                "Owning and influencing architecture and design",
                                "Contributing to all aspects of agile software development lifecycle"
                            ],
                                "Required Skills": [
                                    "JavaScript",
                                    "HTML",
                                    "CSS",
                                    "Agile software development methodology"
                                ],
                                    "Preferred Qualifications": [
                                        "Experience with JavaScript frameworks like Angular and React",
                                        "Professional front end development experience"
                                    ],
                                        "Experience Level": "Mid-level",
                                            "Educational Requirements": "Bachelor's degree in Computer Science or equivalent",
                                                "Salary Range": "$114,800/year up to $191,800/year",
                                                    "Benefits": [
                                                        "Health insurance",
                                                        "Retirement plans",
                                                        "Equity and sign-on payments"
                                                    ]
        },
        "extracted_keywords": {
            "high_importance": [
                { "keyword": "Web Developer", "score": 10 },
                { "keyword": "Front end web development", "score": 10 },
                { "keyword": "JavaScript", "score": 10 },
                { "keyword": "React", "score": 10 },
                { "keyword": "Marketing", "score": 9 },
                { "keyword": "TypeScript", "score": 9 },
                { "keyword": "HTML", "score": 9 },
                { "keyword": "CSS", "score": 9 }
            ],
                "medium_importance": [
                    { "keyword": "A/B testing", "score": 8 },
                    { "keyword": "Content Management Systems (CMS)", "score": 8 },
                    { "keyword": "SEO", "score": 8 },
                    { "keyword": "Accessibility", "score": 8 },
                    { "keyword": "SASS", "score": 7 },
                    { "keyword": "Webpack", "score": 7 },
                    { "keyword": "Marketing tech tools", "score": 7 },
                    { "keyword": "Design teams collaboration", "score": 7 },
                    { "keyword": "Design prototyping tools", "score": 7 },
                    { "keyword": "User Experience (UX)", "score": 7 },
                    { "keyword": "Localization", "score": 7 }
                ],
                    "low_importance": [
                        {import { Skills } from './types';
 "keyword": "Experience Cloud", "score": 6 },
                        { "keyword": "Webflow", "score": 6 },
                        { "keyword": "Full-stack projects", "score": 6 },
                        { "keyword": "Project Management", "score": 6 },
                        { "keyword": "Documentation", "score": 6 },
                        { "keyword": "External vendors management", "score": 6 },
                        { "keyword": "New web technologies and infrastructure", "score": 6 },
                        { "keyword": "Problem solving", "score": 6 }
                    ]
        },
        "user_feedback": {
            "missing_elements": [
                "A/B testing",
                "Content Management Systems (CMS)",
                "SEO",
                "Accessibility",
                "SASS",
                "Webpack",
                "Marketing tech tools",
                "Design prototyping tools",
                "Localization",
                "Experience Cloud",
                "Webflow",
                "Documentation",
                "External vendors management",
                "New web technologies and infrastructure",
                "Problem solving"
            ],
                "suggestions": [
                    "Include A/B Testing Experience: Add any projects or roles where you conducted A/B testing, even if it's minor.",
                    "Highlight CMS Experience: Specify any content management systems you've worked with, like WordPress or custom CMS platforms.",
                    "Mention SEO Skills: Detail any work you have done to improve search engine optimization for websites.",
                    "Include Accessibility Efforts: Add any experience ensuring websites are accessible to all users, including those with disabilities.",
                    "Specify SASS Experience: Mention any use of SASS for CSS preprocessing in your projects.",
                    "Highlight Webpack Usage: If you have used Webpack for module bundling, add this to your skills.",
                    "List Marketing Tech Tools: Include any tools like Google Analytics, Adobe Data Collection, or Marketo.",
                    "Detail Design Collaboration: Expand on your experience working with design teams, specifying tools and methods used.",
                    "Include Prototyping Tools: Mention any experience with design prototyping tools such as Figma, Sketch, or InVision.",
                    "Add Localization Experience: Highlight any work done to adapt websites for different languages and regions.",
                    "Experience with Experience Cloud: If you have used Adobe Experience Cloud, note this.",
                    "Mention Webflow: Include any experience with Webflow or similar platforms.",
                    "Detail Project Management: Describe your project management experience, including tools and methodologies used.",
                    "Highlight Documentation Skills: Add examples of documentation you've produced for projects.",
                    "External Vendor Management: Mention any experience managing relationships with external vendors or contractors.",
                    "New Web Technologies: List any new web technologies you have implemented or championed.",
                    "Problem-Solving Examples: Provide specific examples of complex problems you've solved in your projects."
                ]
        },
        "overall_score": 28.52
    }
    ---
`;

const {
    profile,
    projects,
    skills,
    experiences,
    education
} = useResumeStore();

export const userResumePrompt = `
  PROFILE: {
    Name: ${profile.name},
    Role: ${profile.role},
    Email: ${profile.email},
    Phone: ${profile.phone},
    Location: ${profile.location},
    LinkedInUrl: ${profile.linkedInUrl},
    githubUrl: ${profile.githubUrl},
    objective: ${profile.objective}
  },
  PROJECTS: 
  ${projects.map((project) => (
    `Name: ${project.name}, 
    Description: ${project.descriptions}`
  ))}
  ,
  SKILLS:
  ${skills.map((skill) => (
    `Heading: ${skill.heading}, 
    Skills: ${skill.featuredSkills}`
  ))}
  ,
  EXPERIENCES:
  ${experiences.map((exp) => (
    `Company: ${exp.company}, 
    Title: ${exp.title}, 
    Dates: ${exp.startDate} - ${exp.endDate}, 
    Description: ${exp.descriptions}`
  ))}
  ,
  EDUCATION:
  ${education.map((edu) => (
    `School: ${edu.school}, 
    Degree: ${edu.degree}, 
    GPA: ${edu.gpa}, 
    Dates: ${edu.startDate} - ${edu.endDate}, 
    Description: ${edu.descriptions}`
  ))}
`;