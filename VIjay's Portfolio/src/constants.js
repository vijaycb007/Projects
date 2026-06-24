// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import jiraLogo from './assets/tech_logo/jira.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import adobexdLogo from './assets/tech_logo/adobexd.png';
import sqlLogo from './assets/tech_logo/Sql.jpeg';
import javaLogo from './assets/tech_logo/java_logo.jpg';
import postgreSQLLogo from './assets/tech_logo/Postgresql_logo.svg';
import MySQLLogo from './assets/tech_logo/MySQL_logo.png';
import EclipseLogo from './assets/tech_logo/eclipse_logo.png';
import turboCLogo from './assets/tech_logo/turboC.png';
import PythonLogo from './assets/tech_logo/python.png';
import renderLogo from './assets/tech_logo/renderLogo.svg';
import springLogo from './assets/tech_logo/springLogo.png';
import hibernateLogo from './assets/tech_logo/hibernateLogo.png';
import postmanLogo from './assets/tech_logo/postmanLogo.png';
import springtoolsLogo from './assets/tech_logo/springtoolsLogo.jpg';
import gitLogo from './assets/tech_logo/gitLogo.png';

// Experience Section Logo's
import Rablologo from './assets/company_logo/Rablologo.png';
import jspiderslogo from './assets/company_logo/jspiders_logo.jpeg';

// // Education Section Logo's
import sdcLogo from './assets/education_logo/sdclogo.jpg';
import vvcLogo from './assets/education_logo/vvclogo.jpeg';
import svcLogo from './assets/education_logo/svclogo.png';

// Project Section Logo's
import todoapp from './assets/work_logo/todoapp.png';
import hands2speech from './assets/work_logo/hands2speech.png';
import eggtimer from './assets/work_logo/eggtimer.png';
import skycast from './assets/work_logo/skycast.png';
import imdbclone from './assets/work_logo/imdbclone.png';
import buzzly from './assets/work_logo/buzzly.png';
import BMS from './assets/work_logo/BMS.png';
import IMS from './assets/work_logo/IMS.png';
import Shopeee from './assets/work_logo/Shopeee.png';
import naturesbasket from './assets/work_logo/naturesbasket.png';
import lms from './assets/work_logo/lms.png';
import obs from './assets/work_logo/obs.png';

//certificates section
import adobe from './assets/certificates/adobe.jpeg';
import ai from './assets/certificates/ai.jpeg';
import digitalmaven from './assets/certificates/digitalmaven.jpeg';
import html from './assets/certificates/html.jpeg';
import javascript from './assets/certificates/javascript.jpeg';
import react from './assets/certificates/react.png';
import reacttest from './assets/certificates/reacttest.jpg';

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
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: PythonLogo },
      { name: 'SQL', logo: sqlLogo },
      { name:'Hibernate Framework', logo: hibernateLogo },
      { name: 'Spring Framework', logo: springLogo }
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'GitHub', logo: githubLogo },
      { name: 'Git Bash', logo: gitLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Turbo C', logo: turboCLogo },
      { name: 'Figma', logo: figmaLogo },
      { name: 'Jira', logo: jiraLogo },
      { name: 'Eclipse IDE', logo: EclipseLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Netlify', logo: netlifyLogo },
      { name: 'Render', logo: renderLogo },
      { name: 'Adobe XD', logo: adobexdLogo },
      { name: 'MySQL', logo: MySQLLogo },
      { name: 'PostgreSQL', logo: postgreSQLLogo },
      { name: 'Postman API Tool', logo: postmanLogo },
      { name: 'Spring Tools for Eclipse', logo: springtoolsLogo },
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
  {
      id: 6,
      img: reacttest,
      name: "Frontend Developer (React.js)",
      company: "HackerRank",
      date: "June 2025",
      desc: "Completed a test for the course of React.js by HackerRank.",
      skills: [
        "React",
        "JavaScript",
        "CSS",
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
      desc: "worked as an UI/UX designer TL & intern on a Tutor-Student project on Rablo. Created wireframes and maintained the documents of the project. Collaborated with other team members and other departments for producing an effective contribution to the team and the organization.",
      skills: [
        "Figma",
        "Prototyping",
        "Wireframing",
        "Jira",
        "Miro",
        "User Research",
        "User Testing",
        "Agile Methodology",
        "Team Collaboration",
        "Documentation",
        "Design Systems",
        "UI/UX Design",
        "Product Design",
      ],
      link: "https://drive.google.com/file/d/1m4AFlKnasYi1BXeDl0Ky9veaiRbuLTW5/view?usp=sharing",
    },
  {
      id: 1,
      img: jspiderslogo,
      role: "Java FullStack developer Trainee",
      company: "JSpiders",
      date: "July 2025 - present",
      desc: "Joined Jspiders for training of Java FullStack development",
      skills: [
        "SQL",
        "Java",
        "HTML",
        "CSS",
        "JavaScript",
        "JDBC", 
        "Hibernate",
        "Servlets and JSP's",
        "Spring MVC",
        "SpringBoot",
        "Spring Data JPA",
        "React JS"
      ],
    link: "",
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: sdcLogo,
      school: "Seshadripuram Degree College, Mysuru",
      date: "Sept 2022 - June 2025",
      grade: "9.2 CGPA",
      degree: "Bachelor of Computer Applications - BCA",
    },
    {
      id: 1,
      img: vvcLogo,
      school: "Vivekananda Composite PU College, Mysuru",
      date: "August 2020 - April 2022",
      grade: "91%",
      degree: "PUC in Commerce (EBACs Branch)",
    },
    {
      id: 2,
      img: svcLogo,
      school: "Sri Vidya Convent, Mysuru",
      date: "Apr 2011 - March 2020",
      grade: "87%",
      degree: "Karnataka State Board (Class 1 - Class 10)",
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
      webapp: "https://imdb-clone-two-bay.vercel.app/",
    },
    {
      id: 5,
      title: "Banking Management System",
      description:
        "Built a console‑based Mini Banking Application using Core Java, JDBC, and MySQL with account creation, secure login, deposits/withdrawals (with validation), transaction history, and safe account deletion.",
      image: BMS,
      tags: ["Java", "JDBC", "MySQL", "SQL"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Bank%20Management%20System/Bank_Management_System",
      webapp: "https://github.com/vijaycb007/Projects/tree/main/Bank%20Management%20System/Bank_Management_System",
    },
     {
      id: 6,
      title: "Inventory Management System",
      description:
        "Built a full-stack Inventory Management System using Java and React to manage products, stock levels, and sales from a single, responsive dashboard with search and modal-based sell/restock flows. Implemented automatic low-stock alerts, total inventory value calculation, stock history logging, and auto-removal of products when stock reaches zero to mirror real-world inventory behaviour.",
      image: IMS,
      tags: ["Java", "JDBC", "PostgreSQL", "SQL", "React.js", "TailwindCSS"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Inventory%20Management%20System",
      webapp: "https://inventorymanagementsystem-puce.vercel.app/",
    },
    {
      id: 7,
      title: "Shopeee E-Commerce website",
      description:
        "Built and deployed a fully functional E-commerce Shopping System using HTML, CSS, and JavaScript.",
      image: Shopeee,
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Shopee",
      webapp: "https://shopeee-ecommerce.netlify.app/",
    },
    {
      id: 8,
      title: "Library Management System",
      description:
        "A Spring MVC and PostgreSQL-based web app for managing books, students, and issue records efficiently through an organized MVC architecture.",
      image: lms,
      tags: ["Java", "Spring MVC", "HTML/CSS", "PostgreSQL"],
      github: "https://github.com/vijaycb007/Projects/tree/main/Library-Management-System",
      webapp: "",
    },
    {
      id: 9,
      title: "Online Banking System",
      description:
        "Built a full-stack Banking System with React.js and Vite, featuring account management, fund transfers, transaction history, RESTful API integration, and authentication-protected routing with real-time form validation.",
      image: obs,
      tags: [ "HTML/CSS", "JavaScript", "React JS", "Tailwind CSS"],
      github: "https://github.com/vijaycb007/Projects/tree/main/online-banking-system",
      webapp: "",
    },
    {
      id: 10,
      title: "Nature's Basket",
      description:
        "a Figma-based UI/UX for an organic grocery shopping platform focused on user-centric navigation, minimalist aesthetics, smart cart features, and intuitive profile management, delivering a seamless and engaging shopping experience.",
      image: naturesbasket,
      tags: ["Figma", "UI/UX Design", "Prototyping", "Wireframing","User Research"],
      github: "https://www.figma.com/design/tB2jos2BG7kaMsk2N8t1OK/nature-s-basket?node-id=0-1&t=q2iat1riLasTSB0B-1",
      webapp: "https://www.figma.com/proto/tB2jos2BG7kaMsk2N8t1OK/nature-s-basket?node-id=0-1&t=q2iat1riLasTSB0B-1"
    },
    {
      id: 11,
      title: "Buzzly",
      description:
        "Designed Buzzly, a modern mobile app combining news, blogs, and personalized content. Focused on clean UI, intuitive onboarding, blog creation, and smooth content management for an enhanced reading experience.",
      image: buzzly,
      tags: ["Figma", "UI/UX Design", "Prototyping", "Wireframing", "User Research"],
      github: "https://www.figma.com/design/5efPsg6vQmwjHiSs5fQBWQ/Buzzly?node-id=0-1&t=f6XlbP8uM6nBdZ8f-1",
      webapp: "https://www.figma.com/proto/5efPsg6vQmwjHiSs5fQBWQ/Buzzly?node-id=0-1&t=f6XlbP8uM6nBdZ8f-1",
    },
  ];























