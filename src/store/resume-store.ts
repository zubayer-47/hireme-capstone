import { create } from "zustand";
import {
    Skills,
    Resume,
    Profile,
    Projects,
    Education,
    Experiences,
    DisplayOrderForm,
} from "./resume-types";

export const defaultProfile: Profile = {
    name: "",
    role: "",
    email: "",
    phone: "",
    linkedInUrl: "",
    githubUrl: "",
    objective: "",
};

export const defaultProjects: Projects = {
    name: "",
    url: "",
    date: "",
    industry: "",
    descriptions: ""
}

export const defaultSkills: Skills = {
    heading: "",
    featuredSkills: ""
}

export const defaultWork: Experiences = {
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    descriptions: "",
}

export const defaultEducation: Education = {
    school: "",
    degree: "",
    gpa: "",
    startDate: "",
    endDate: "",
    descriptions: ""
}

export const defaultResume: Resume = {
    profile: defaultProfile,
    projects: [defaultProjects],
    skills: [defaultSkills],
    experiences: [defaultWork],
    education: [defaultEducation]
}

type UpdateResume = {
    // -------------- Profile Set Function ---------------
    setProfile: (
        name: keyof Profile,
        newProfile: Profile[keyof Profile]
    ) => void;

    // -------------- Projects Set Function ---------------
    setProjects: (
        index: number,
        name: keyof Projects,
        newProject: Projects[keyof Projects]
    ) => void;

    // -------------- Skills Set Function ---------------
    setSkills: (
        index: number,
        name: keyof Skills,
        newSkill: Skills[keyof Skills]
    ) => void;

    // -------------- Work Set Function ---------------
    setExperience: (
        index: number,
        name: keyof Experiences,
        newWork: Experiences[keyof Experiences]
    ) => void;

    // -------------- Education Set Function ---------------
    setEducation: (
        index: number,
        name: keyof Education,
        newEducation: Education[keyof Education]
    ) => void;

    // -------------- Add & Delete Functions -----------------
    addNewForm: (targetForm: DisplayOrderForm) => void;
    deleteForm: (targetIndex: number, targetForm: DisplayOrderForm) => void;
}

export const useResumeStore = create<Resume & UpdateResume>()((set) => ({
    ...defaultResume,

    // Function to set the profile section
    // the name => is the keys for each profile
    // the newProfile => new value assign for each key
    setProfile: (name, newProfile) => {
        set((state) => ({
            profile: {
                ...state.profile,
                [name]: newProfile
            }
        }))
    },

    // Takes in index as parameter to track multiple projects entries
    // The name will take the keyof the type for Resume Section
    // The newProject is the new entry
    setProjects: (index, name, newProject) => {
        set((state) => {
            const projects = [...state.projects];
            projects[index] = {
                ...projects[index],
                [name]: newProject
            };

            return { ...state.projects, projects }
        })
    },

    setSkills: (index, name, newSkills) => {
        set((state) => {
            const skills = [...state.skills];
            skills[index] = {
                ...skills[index],
                [name]: newSkills
            }

            return { ...state.skills, skills }
        })
    },

    setExperience: (index, name, newWork) => {
        set((state) => {
            const experiences = [...state.experiences];
            experiences[index] = {
                ...experiences[index],
                [name]: newWork
            };

            return { ...state.experiences, experiences }
        })
    },

    setEducation: (index, name, newEducation) => {
        set((state) => {
            const education = [...state.education];
            education[index] = {
                ...education[index],
                [name]: newEducation
            };

            return { ...state.education, education }
        })
    },

    addNewForm: (targetForm) => {
        set((state) => {
            switch (targetForm) {
                case "experience": {
                    const experiences = [...state.experiences];
                    experiences.push(defaultWork);
                    return {
                        ...state.experiences,
                        experiences
                    }
                }
                case "education": {
                    const education = [...state.education];
                    education.push(defaultEducation);
                    return {
                        ...state.education,
                        education
                    }
                }

                case "projects": {
                    const projects = [...state.projects];
                    projects.push(defaultProjects);
                    return {
                        ...state.projects,
                        projects
                    }
                }

                case "skills": {
                    const skills = [...state.skills];
                    skills.push(defaultSkills);
                    return {
                        ...state.skills,
                        skills
                    }
                }

                default:
                    return state;
            }
        })
    },

    deleteForm: (targetIndex, targetForm) => {
        set((state) => {
            switch (targetForm) {
                case "experience": {
                    const experiences = [...state.experiences];
                    if (targetIndex < experiences.length) {
                        experiences.splice(targetIndex, 1);
                    }
                    return { ...state.experiences, experiences }
                }

                case "skills": {
                    const skills = [...state.skills];
                    if (targetIndex < skills.length) {
                        skills.slice(targetIndex, 1)
                    }

                    return { ...state.skills, skills }
                }

                case "education": {
                    const education = [...state.education];
                    if (targetIndex < education.length) {
                        education.splice(targetIndex, 1)
                    }
                    return { ...state.education, education }
                }

                case "projects": {
                    const projects = [...state.projects];
                    if (targetIndex < projects.length) {
                        projects.splice(targetIndex, 1)
                    }
                    return { ...state.projects, projects }
                }

                case "skills": {

                }

                default:
                    return state;
            }
        })
    }


}))


