// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import pythonLogo from './assets/tech_logo/python.png';
import phpLogo from './assets/tech_logo/phplogo.png';
import flaskLogo from './assets/tech_logo/flask.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import figmaLogo from './assets/tech_logo/figma.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import rLogo from './assets/tech_logo/r.png';
import jiraLogo from './assets/tech_logo/jira.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import msofficeLogo from './assets/tech_logo/msoffice.png';
import adobexdLogo from './assets/tech_logo/adobexd.png';

// Experience Section Logo's
import Rablologo from './assets/company_logo/Rablologo.png';

// // Education Section Logo's
import sdcLogo from './assets/education_logo/sdcLogo.jpg';
import vvcLogo from './assets/education_logo/vvclogo.jpeg';
import svcLogo from './assets/education_logo/svclogo.png';

// Project Section Logo's
import todoapp from './assets/work_logo/todoapp.png';
import hands2speech from './assets/work_logo/hands2speech.png';
import eggtimer from './assets/work_logo/eggtimer.png';
import skycast from './assets/work_logo/skycast.png';
import imdbclone from './assets/work_logo/imdbclone.png';
import buzzly from './assets/work_logo/buzzly.png';
import naturesbasket from './assets/work_logo/naturesbasket.png';

//certificates section
import adobe from './assets/certificates/adobe.jpeg';
import ai from './assets/certificates/ai.jpeg';
import digitalmaven from './assets/certificates/digitalmaven.jpeg';
import html from './assets/certificates/html.jpeg';
import javascript from './assets/certificates/javascript.jpeg';
import react from './assets/certificates/react.png';

export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Flask', logo: flaskLogo },
      { name: 'PHP', logo: phpLogo },
      { name: 'MySQL', logo: mysqlLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'R Programming', logo: rLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Netlify', logo: netlifyLogo },
      { name: 'Figma', logo: figmaLogo },
      { name: 'Jira', logo: jiraLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'MS Office', logo: msofficeLogo },
      { name: 'Adobe XD', logo: adobexdLogo },
    ],
  },
];

export const certificates = [
  {
      id: 0,
      img: html,
      name: "Web fundamentals : Web development using HTML",
      company: "Infosys Springboard",
      date: "September 2024",
      desc: "Completed a course in Web Fundamentals, focusing on HTML for web development.",
      skills: [
        "HTML",
        "Web Development",
      ],
    },
    {
      id: 1,
      img: ai,
      name: "Introduction to Artificial Intelligence",
      company: "Infosys Springboard",
      date: "September 2024",
      desc: "Completed a course in Introduction to Artificial Intelligence, focusing on machine learning, neural networks, and AI applications.",
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Neural Networks",
        "AI Applications",
      ],
    },
    {
      id: 2,
      img: adobe,
      name: "Diploma in User experience design for the web using Adobe XD",
      company: "Allison",
      date: "February 2024",
      desc: "Completed a diploma course in User Experience Design for the web using Adobe XD, focusing on design principles, user research, and prototyping.",
      skills: [
        "Adobe XD",
        "UI/UX Design",
        "Prototyping",
        "User Research",
      ],
    },
    
    {
      id: 3,
      img: digitalmaven,
      name: "AI tools",
      company: "Digital Maven",
      date: "February 2025",
      desc: "A certificate of completion of a session conducted by Digital Maven on AI tools, covering various AI applications and their practical uses in different domains.",
      skills: [
        "AI Tools",
        "ChatGPT",
        "AI Applications",
        "Prompt Engineering",
        "AI in Business",
      ],
    },
    {
      id: 4,
      img: javascript,
      name: "JavaScript",
      company: "Scalar",
      date: "May 2025",
      desc: "Completed a course in JavaScript, focusing on JavaScript basic concepts, frameworks, and libraries.",
      skills: [
        "JavaScript",
        "ES6",
        "Web Development",
        "DOM Manipulation",
      ],
    },
    {
      id: 5,
      img: react,
      name: "React.js",
      company: "Scalar",
      date: "June 2025",
      desc: "Completed a course in React.js, focusing on building user interfaces, component-based architecture, and state management.",
      skills: [
        "React",
        "JavaScript",
        "Web Development",
        "Vite",
        "Tailwind CSS",
      ],
    },
  ];

export const experiences = [
    {
      id: 0,
      img: Rablologo,
      role: "UI/UX Designer Intern",
      company: "RABLO.IN",
      date: "November 2024 - March 2025",
      desc: "worked as an UI/UX designer TL & intern on a Tutor-Student project on Rablo. Creating wireframes and maintaining the documents of the project. Collaborating with other team members for producing an effective contribution to the team and the organization.",
      skills: [
        "Figma",
        "Prototyping",
        "Wireframing",
        "Jira",
        "User Research",
        "User Testing",
        "Agile Methodology",
        "Team Collaboration",
        "Documentation",
        "Design Systems",
        "UI/UX Design",
        "Product Design",
      ],
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: sdcLogo,
      school: "Seshadrtipuram Degree College, Mysuru",
      date: "Sept 2022 - June 2025",
      grade: "9.04 CGPA",
      desc: "I have completed my Bachelor's degree (BCA) in Computer Applications from Seshadrtipuram Degree College, Mysuru. During my time at Seshadrtipuram, I gained a strong foundation in programming, software development, and computer science principles. I have studied courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering. My experience at Seshadrtipuram Degree College has been instrumental in shaping my technical abilities and professional growth.",
      degree: "Bachelor of Computer Applications - BCA",
    },
    {
      id: 1,
      img: vvcLogo,
      school: "Vivekananda Composite PU College, Mysuru",
      date: "August 2020 - April 2022",
      grade: "91%",
      desc: "I completed my PUC (class 12) from Vivekananda Composite PU College, Mysuru. Throughout my studies, I was immersed in a variety of subjects that deepened my understanding of commerce and technology. From exploring Programming and Accountancy to diving into Web Development and Balance sheets. My time at Vivekananda Composite PU College allowed me to gain knowledge about the intersection of commerce and technology.",
      degree: "PUC in Commerce (EBACs Branch)",
    },
    {
      id: 2,
      img: svcLogo,
      school: "Sri Vidya Convent, Mysuru",
      date: "Apr 2011 - March 2020",
      grade: "87%",
      desc: "I completed my class 10 education from Sri Vidya Convent, Mysuru, under the State board, where I studied all the subjects including Maths, Social Science, and Science with some languages.",
      degree: "State Board (Class 1 - Class 10)",
    },
  ];
  
  export const projects = [
    {
      id: 0,
      title: "TO-DO App",
      description:
        "Built a responsive To-Do list app with add/delete features, local storage support, and a clean, user-friendly interface.",
      image: todoapp,
      tags: ["HTML", "Tailwind CSS", "React JS"],
      github: "https://github.com/vijaycb007/Projects/tree/main/todo-app",
      webapp: "https://todo-list-app-sandy-seven.vercel.app/",
    },
    {
      id: 1,
      title: "Hands2Speech",
      description:
        "A web application that converts sign language gestures into speech using machine learning and computer vision.",
      image: hands2speech,
      tags: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Machine Learning", "Deep Learning", "Computer Vision", "TensorFlow"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Hands2Speech",
      webapp: "https://github.com/vijaycb007/Projects/tree/main/Hands2Speech"
    },
    {
      id: 2,
      title: "Egg Timer",
      description:
        "A simple egg timer application built with React, allowing users to set timers for boiling eggs.",
      image: eggtimer,
      tags: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
      github: "https://github.com/vijaycb007/Projects/tree/main/EggTimer",
    },
    {
      id: 3,
      title: "Skycast",
      description:
        "A weather forecasting application that provides real-time weather updates and forecasts using a weather API.",
      image: skycast,
      tags: ["React","Vite","Tailwind CSS", "API"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Skycast",
      webapp: "https://projects-2p3w.vercel.app/",
    },
    {
      id: 4,
      title: "IMDB Clone",
      description:
        "A clone of the popular IMDB website, showcasing movies, TV shows, and user reviews.",
      image: imdbclone,
      tags: ["React","Vite","Tailwind CSS", "API"],
      github: "https://github.com/vijaycb007/Projects/tree/main/imdbclone",
      webapp: "https://imdb-clone-nu-eight.vercel.app/",
    },
    {
      id: 5,
      title: "Nature's Basket",
      description:
        "a Figma-based UI/UX for an organic grocery shopping platform focused on user-centric navigation, minimalist aesthetics, smart cart features, and intuitive profile management, delivering a seamless and engaging shopping experience.",
      image: naturesbasket,
      tags: ["Figma", "UI/UX Design", "Prototyping", "Wireframing","User Research"],
      github: "https://www.figma.com/design/tB2jos2BG7kaMsk2N8t1OK/nature-s-basket?node-id=0-1&t=q2iat1riLasTSB0B-1",
      webapp: "https://www.figma.com/proto/tB2jos2BG7kaMsk2N8t1OK/nature-s-basket?node-id=0-1&t=q2iat1riLasTSB0B-1"
    },
    {
      id: 6,
      title: "Buzzly",
      description:
        "Designed Buzzly, a modern mobile app combining news, blogs, and personalized content. Focused on clean UI, intuitive onboarding, blog creation, and smooth content management for an enhanced reading experience.",
      image: buzzly,
      tags: ["Figma", "UI/UX Design", "Prototyping", "Wireframing", "User Research"],
      github: "https://www.figma.com/design/5efPsg6vQmwjHiSs5fQBWQ/Buzzly?node-id=0-1&t=f6XlbP8uM6nBdZ8f-1",
      webapp: "https://www.figma.com/proto/5efPsg6vQmwjHiSs5fQBWQ/Buzzly?node-id=0-1&t=f6XlbP8uM6nBdZ8f-1",
    },
  ];