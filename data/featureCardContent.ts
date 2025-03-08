// Interface for each feature card item
export interface FeatureCardItem {
  title: string;
  content: string;
}

// Interface for the complete feature card content structure
export interface FeatureCardContent {
  about: FeatureCardItem;
  skills: FeatureCardItem;
  workExperience: FeatureCardItem;
  [key: string]: FeatureCardItem; // Allow additional feature cards in the future
}

// Individual feature card definitions
export const aboutCard: FeatureCardItem = {
  title: "About Me",
  content: `<span style="color: #0f0;">C:\\Users\\guest></span> list-about
  Loading profile information...

> I am a highly motivated and passionate developer with a solid background and experience in software development. 
> I thrive on taking initiative and collaborating on projects, 
> bringing strong problemsolving skills and attention to detail to every task. `,
};

export const skillsCard: FeatureCardItem = {
  title: "My Skills",
  content: `<span style="color: #0f0;">C:\\Users\\guest></span> list-skills

SKILL                       EXPERIENCE
---------------------------------------
C#                          3+ years
TypeScript                  2+ years
SQL                         2+ years
HTML/CSS, JavaScript        3+ years
Microservice Architecture   3+ years
Git                         3+ years
Postman, Swagger            2+ years`,
};

export const workExperienceCard: FeatureCardItem = {
  title: "Work Experiences",
  content: `<span style="color: #0f0;">C:\\Users\\guest></span> list-work-experiences

<span style="color: teal; font-weight: bold;">INTERTECH</span> (October 2023 - Present)
<span style="font-weight: bold;">Expert Software Engineer</span>
> Working as a part of the Treasury team, developing and designing the treasury domain from scratch
in Microservice architecture while maintaining the previous legacy codebase for all operating banks. 

<span style="color: teal; font-weight: bold;">PANTEON</span> (September 2022 - May 2023)
<span style="font-weight: bold;">VR Game Developer</span>
> Worked on developing a game for Quest2 VR headset on Unity Game Engine. 

<span style="color: teal; font-weight: bold;">INTERTECH</span> (November 2021 - August 2022)
<span style="font-weight: bold;">Software Engineer</span>
Worked on development and maintenance of the "Inventory" Project, delivering and receiving data
via APIs with an easy to use website.

<span style="color: teal; font-weight: bold;">YARIS KABIN</span> (AUGUST 2021)
<span style="font-weight: bold;">Intern</span>`,
};

export const educationCard: FeatureCardItem = {
  title: "Education",
  content: `<span style="color: #0f0;">C:\\Users\\guest></span> list-education

<span style="color: teal; font-weight: bold;">SAKARYA UNIVERSITY</span> (2018 - 2022)
<span style="font-weight: bold;">Bachelor of Science, Computer Engineering</span>
> Grade Average: 3.12

<span style="color: teal; font-weight: bold;">AGH UST KRAKOW</span> (2020)
<span style="font-weight: bold;">Erasmus Exchange Programme Student</span>`,
};

// Composed feature card content
export const featureCardContent: FeatureCardContent = {
  about: aboutCard,
  skills: skillsCard,
  workExperience: workExperienceCard,
  education: educationCard, // Add the education card to the content
};

// Default export for compatibility with existing code
export default featureCardContent;
