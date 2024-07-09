
export const firstPrompt = `
    ---

    ### Task Overview
    You have three tasks to help the user build a resume that fits the job description. 
    Each task must be completed sequentially. Ensure that each task is fully completed before moving on to the next. 
    You don't have to write down the results you got from the First and Second Task. 
    Combine these two results and MAKE SURE THE OUTPUT IS IN -> JSON format that was asked in the Third Task. Don't add any \n on the output 
    unnecessary characters what JSON looks like.

    ---

    ### FIRST TASK: Job Description Summary and Keyword Extraction
    **Instructions:**
    1. Analyze the provided job description (in plain text).
    2. Provide a detailed summary of the job description, broken down into components:
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
    3. Extract relevant keywords from the job description.
    4. Categorize the keywords in order of importance (high, medium, low).

    **Example:**
    {
        "jobPosition": "Software Development Engineer",
        "companyName": "Amazon Canada Fulfillment Services, ULC",
        "location": "Canada",
        "employmentType": "Full-time",
        "responsibilities": [
            "Designing and implementing scalable, low-latent, high-availability multimodal frontend applications",
            "Owning and influencing architecture and design",
            "Contributing to all aspects of agile software development lifecycle"
        ],
        "requiredSkills": [
            "JavaScript",
            "HTML",
            "CSS",
            "Agile software development methodology"
        ],
        "preferredQualifications": [
            "Experience with JavaScript frameworks like Angular and React",
            "Professional front end development experience"
        ],
        "experienceLevel": "Mid-level",
        "educationalRequirement": "Bachelor's degree in Computer Science or equivalent",
        "salaryRange": "$114,800/year up to $191,800/year",
        "benefits": [
            "Health insurance",
            "Retirement plans",
            "Equity and sign-on payments"
        ]
    }
`;

export const secondPrompt = `
    ---

    ### SECOND TASK: Resume Comparison and Skill Gaps Analysis
    **Instructions:**
    1. Compare the extracted keywords from the job description with the user's resume (provided in plain text).
    2. Identify what the user's resume is missing in terms of skills, qualifications, and experience.
    3. Conduct a skill gaps analysis to identify gaps in experience or proficiency.
    4. Highlight areas where the resume already matches the job description well.
    5. Provide suggestions on how the user can improve their resume based on the job description.
    6. Prioritize the suggestions based on the importance and relevance of the missing keywords.

    **Example Analysis:**
    {
        "matchingElements": [
            "JavaScript",
            "HTML",
            "CSS",
            "Agile software development methodology"
        ],
        "missingElements": [
            "Experience with JavaScript frameworks like Angular and React",
            "Professional front end development experience",
            "Designing scalable applications"
        ],
        "suggestions": [
            "Include Angular/React Experience: Add any projects or roles where you used Angular or React.",
            "Highlight Professional Frontend Experience: Detail your professional experience with frontend development.",
            "Mention Designing Scalable Applications: Add examples of your work in designing scalable applications."
        ]
    }
`;

export const thirdPrompt = `
    ---

    ### THIRD TASK: JSON Output and Feedback
    **Instructions:**
    1. Combine the results from the first two tasks and output the following in JSON format:
        - A summary of the job description, broken down into components (Job Position, Company Name, Location, Employment Type, Responsibilities, Required Skills, Preferred Qualifications, Experience Level, Educational Requirements, Salary Range, Benefits).
        - Extracted keywords and their categorization in JSON format.
        - Highlight strengths where the resume matches the job description well.
        - Identify and list the missing elements from the user's resume.
        - Provide detailed suggestions for improvement, focusing on relevance.

    **Example Output:**
    {
        "jobDescriptionSummary": {
            "jobPosition": "Software Development Engineer",
            "companyName": "Amazon Canada Fulfillment Services, ULC",
            "location": "Canada",
            "employmentType": "Full-time",
            "responsibilities": [
                "Designing and implementing scalable, low-latent, high-availability multimodal frontend applications",
                "Owning and influencing architecture and design",
                "Contributing to all aspects of agile software development lifecycle"
            ],
            "requiredSkills": [
                "JavaScript",
                "HTML",
                "CSS",
                "Agile software development methodology"
            ],
            "preferredQualifications": [
                "Experience with JavaScript frameworks like Angular and React",
                "Professional front end development experience"
            ],
            "experienceLevel": "Mid-level",
            "educationalRequirement": "Bachelor's degree in Computer Science or equivalent",
            "salaryRange": "$114,800/year up to $191,800/year",
            "benefits": [
                "Health insurance",
                "Retirement plans",
                "Equity and sign-on payments"
            ]
        },
        "extractedKeywords": {
            "highImportance": [
                "JavaScript",
                "HTML",
                "CSS",
                "Agile software development"
            ],
            "mediumImportance": [
                "Angular",
                "React",
                "Front end development"
            ],
            "lowImportance": [
                "Scalable applications",
                "Architecture design"
            ]
        },
        "userFeedback": {
            "matchingElements": [
                "JavaScript",
                "HTML",
                "CSS",
                "Agile software development methodology"
            ],
            "missingElements": [
                "Angular",
                "React",
                "Front end development experience",
                "Designing scalable applications"
            ],
            "suggestions": [
                "Include Angular/React Experience: Add any projects or roles where you used Angular or React.",
                "Highlight Professional Frontend Experience: Detail your professional experience with frontend development.",
                "Mention Designing Scalable Applications: Add examples of your work in designing scalable applications."
            ]
        }
    }
    ---
`;