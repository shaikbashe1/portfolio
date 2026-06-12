import { useState, useEffect } from 'react';
import './App.css';
import avatarImg from './assets/avatar.png';

const TITLES = [
  'Cybersecurity Enthusiast',
  'AI Product Engineer',
  'B.Tech IT Student @ LBRCE'
];

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Typing Effect States
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  // Project Filtering
  const [projectFilter, setProjectFilter] = useState('all');

  // Skill Filtering
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');

  // Contact Form State
  const [formStatus, setFormStatus] = useState(null); // 'loading', 'success', 'error'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Theme Syncing
  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Typing Loop Effect
  useEffect(() => {
    let timer;
    const fullText = TITLES[currentTitleIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setTypedText(prev => {
          const next = prev.slice(0, -1);
          if (next === '') {
            setIsDeleting(false);
            setCurrentTitleIndex(prevIndex => (prevIndex + 1) % TITLES.length);
          }
          return next;
        });
      } else {
        setTypedText(prev => {
          const next = fullText.slice(0, prev.length + 1);
          if (next === fullText) {
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
          }
          return next;
        });
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    if (!(!isDeleting && typedText === fullText)) {
      timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTitleIndex]);

  // Intersection Observer for scroll animations (fade in) & active nav
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.35, rootMargin: '-70px 0px 0px 0px' }
    );

    reveals.forEach(el => revealObserver.observe(el));
    sections.forEach(sec => navObserver.observe(sec));

    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);

  // Form Submission Handler (Formspree API)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/xjkyjqkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Portfolio Datasets
  const projects = [
    {
      title: 'Agentic Honeypot for Scam Detection',
      category: 'cybersecurity',
      tags: ['Python', 'FastAPI', 'REST APIs', 'Cybersecurity'],
      desc: 'Developed an intelligent REST API honeypot using FastAPI that simulates vulnerable endpoints, captures attacker interactions, logs raw payloads, parses attack patterns, and generates comprehensive threat intelligence reports for security analysis.',
      github: 'https://github.com/shaikbashe1/honeypot-project',
      icon: 'fa-shield-halved'
    },
    {
      title: 'LearnLoom - AI Learning Ecosystem',
      category: 'aiml',
      tags: ['Next.js', 'TypeScript', 'OpenAI API', 'React'],
      desc: 'Built an AI-powered personalized learning platform featuring structured roadmaps, intelligent chatbot mentor support, code syntax validation, student assessments, interactive progress indicators, and automated certificate generation.',
      github: 'https://github.com/shaikbashe1/Learn-Loom',
      icon: 'fa-brain'
    },
    {
      title: 'Student AI Hub',
      category: 'aiml',
      tags: ['TypeScript', 'Next.js', 'Auth.js', 'Database'],
      desc: 'Collaborated on and maintained an AI student workspace platform. Resolved API latency issues, integrated secure authentication workflows via Auth.js, enhanced validation policies, and optimized backend query speeds.',
      github: 'https://github.com/shaikbashe1/student-ai-hub',
      icon: 'fa-users-gear'
    },
    {
      title: 'AI Face Security System',
      category: 'aiml',
      tags: ['OpenCV', 'Python', 'Deep Learning', 'Computer Vision'],
      desc: 'Engineered a real-time face detection and identification framework for local access control. Features integrated software-based liveness verification using landmark algorithms to prevent spoofing bypasses.',
      github: 'https://github.com/shaikbashe1/ai-face-security',
      icon: 'fa-face-smile-wink'
    },
    {
      title: 'Voice-Controlled Blind Navigation Spectacles',
      category: 'webiot',
      tags: ['Arduino', 'IoT', 'Embedded C', 'Hardware'],
      desc: 'Designed assistive smart glasses for visually impaired individuals. Incorporates real-time ultrasonic distance sensors for obstacle warnings, and integrated voice modules for localized audio directions.',
      github: null,
      icon: 'fa-glasses'
    },
    {
      title: 'AI-WiFence - WiFi Intrusion Detection',
      category: 'cybersecurity',
      tags: ['Machine Learning', 'Python', 'Network Security', 'Scikit-Learn'],
      desc: 'Trained supervised machine learning models to classify probe requests, deauthentication frames, and identify unauthorized access point interference inside local wireless networks.',
      github: null,
      icon: 'fa-wifi'
    }
  ];

  const skills = [
    // Languages
    { name: 'Python', level: 90, type: 'languages', icon: 'fa-brands fa-python' },
    { name: 'Java', level: 85, type: 'languages', icon: 'fa-brands fa-java' },
    { name: 'C', level: 80, type: 'languages', icon: 'fa-solid fa-code' },
    { name: 'TypeScript', level: 80, type: 'languages', icon: 'fa-solid fa-file-code' },
    // Backend
    { name: 'FastAPI', level: 85, type: 'backend', icon: 'fa-solid fa-server' },
    { name: 'Flask', level: 80, type: 'backend', icon: 'fa-solid fa-network-wired' },
    { name: 'REST APIs', level: 90, type: 'backend', icon: 'fa-solid fa-gears' },
    { name: 'API Security', level: 85, type: 'backend', icon: 'fa-solid fa-lock' },
    // AI/ML
    { name: 'Applied ML', level: 80, type: 'aiml', icon: 'fa-solid fa-brain' },
    { name: 'AI Agents', level: 75, type: 'aiml', icon: 'fa-solid fa-robot' },
    { name: 'Data Analysis', level: 80, type: 'aiml', icon: 'fa-solid fa-chart-line' },
    { name: 'OpenCV', level: 80, type: 'aiml', icon: 'fa-solid fa-eye' },
    // Tools
    { name: 'Git & GitHub', level: 90, type: 'tools', icon: 'fa-brands fa-github' },
    { name: 'GitHub Actions', level: 75, type: 'tools', icon: 'fa-solid fa-shuffle' },
    { name: 'Linux OS', level: 85, type: 'tools', icon: 'fa-brands fa-linux' },
    { name: 'Honeypots', level: 85, type: 'tools', icon: 'fa-solid fa-shield-halved' }
  ];

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  const filteredSkills = activeSkillCategory === 'all'
    ? skills
    : skills.filter(s => s.type === activeSkillCategory);

  return (
    <div>
      {/* Navigation Header */}
      <header className="navbar navbar-scrolled">
        <div className="container">
          <a href="#home" className="logo" aria-label="Shaik Bashe Portfolio Home">
            <i className="fa-solid fa-shield-halved"></i> SHAIK BASHE
          </a>

          <nav role="navigation">
            <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <li>
                <a
                  href="#home"
                  className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className={`nav-link ${activeNav === 'experience' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`nav-link ${activeNav === 'skills' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`nav-link ${activeNav === 'projects' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  className={`nav-link ${activeNav === 'certifications' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Certs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
              </li>
            </ul>
          </nav>

          <button
            className="menu-toggle"
            aria-label="Toggle Navigation Drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content reveal active">
              <span className="hero-tagline">Cybersecurity & AI Product Engineering</span>
              <h1>SHAIK BASHE</h1>
              
              <div className="hero-title-wrapper">
                I am a&nbsp;<span className="typing-text">{typedText}</span>
              </div>

              <p className="hero-desc">
                Building AI-Powered Threat Detection Systems, Intelligent Automation & Scalable Web Applications. 
                Currently a 3rd-year IT student at Lakireddy Bali Reddy College of Engineering (LBRCE) 
                and AI Product Engineer Intern at AlignX AI. FIDE-registered chess player.
              </p>

              <div className="btn-group">
                <a href="#projects" className="btn btn-primary">
                  <i className="fa-solid fa-code"></i> View Projects
                </a>
                <a href="./resume_shaik_bashe.pdf" download="Resume_Shaik_Bashe.pdf" className="btn btn-outline">
                  <i className="fa-solid fa-file-pdf"></i> Resume (PDF)
                </a>
              </div>

              <div className="contact-grid">
                <div className="contact-item">
                  <i className="fa-solid fa-map-pin"></i>
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-val">Andhra Pradesh, India</div>
                  </div>
                </div>
                <a href="mailto:shaikbashe2222@gmail.com" className="contact-item" aria-label="Email Shaik Bashe">
                  <i className="fa-solid fa-envelope"></i>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-val">shaikbashe2222@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+918333094992" className="contact-item" aria-label="Call Shaik Bashe">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-val">+91 8333094992</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="hero-image-container reveal active">
              <div className="profile-frame">
                <img
                  src={avatarImg}
                  alt="Shaik Bashe Professional Portrait"
                  className="profile-img"
                />
              </div>
              <div className="avatar-backdrop"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Education Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-graduation-cap"></i> Education & Profile
            </h2>
            <p className="section-subtitle">
              Academic backgrounds and profiles optimizing concepts of IT, AI/ML, and Cybersecurity.
            </p>
          </div>

          <div className="about-grid">
            <div className="card reveal">
              <h3>Professional Summary</h3>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                Highly motivated Information Technology undergrad combining strong foundations in cybersecurity principles 
                with advanced practical capabilities in AI product workflows. Experienced in constructing honeypots, 
                integrating backend microservices with FastAPI, and applying computer vision datasets. Focuses heavily 
                on defensive network techniques, threat intelligence logging, and developer system automation.
              </p>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                Outside of engineering, active participant in competitive chess championships with a registered FIDE ID rating, 
                leveraging critical problem-solving skills to analyze algorithms and defense architectures.
              </p>
            </div>

            <div className="card reveal">
              <h3>Academic Background</h3>
              <div className="timeline" style={{ marginTop: '1.5rem' }}>
                <div className="timeline-item">
                  <div className="timeline-date">2024 - 2028 (Expected)</div>
                  <h4 className="timeline-title">B.Tech - Information Technology</h4>
                  <div className="timeline-org">Lakireddy Bali Reddy College of Engineering (LBRCE)</div>
                  <span className="timeline-gpa">CGPA: 8.02 / 10</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2022 - 2024</div>
                  <h4 className="timeline-title">Intermediate (MPC)</h4>
                  <div className="timeline-org">KBN College</div>
                  <span className="timeline-gpa">Percentage: 93.3%</span>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">Graduated 2022</div>
                  <h4 className="timeline-title">SSC Secondary Education</h4>
                  <div className="timeline-org">LPCT Gujarati Vidhyalaya</div>
                  <span className="timeline-gpa">GPA: 9.1 / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-briefcase"></i> Experience
            </h2>
            <p className="section-subtitle">
              Professional history and technical internships in AI engineering.
            </p>
          </div>

          <div className="card exp-card reveal">
            <div className="exp-header">
              <div>
                <h3 className="exp-title">AI Product Engineer Intern</h3>
                <div className="exp-company">AlignX AI (Remote)</div>
              </div>
              <div className="exp-date">Ongoing | Remote</div>
            </div>

            <ul className="exp-list">
              <li>
                Contributed to the deployment pipeline of AI product releases, running regression tests, 
                and implementing telemetry analysis structures to enhance overall end-user flow.
              </li>
              <li>
                Collaborated directly with product planning squads to design API mockups and draft technical schemas 
                for feature integrations.
              </li>
              <li>
                Designed secure FastAPI wrapper layers to optimize token query latencies for internal LLM tasks.
              </li>
              <li>
                Resolved authentication session validation checks and integrated robust security safeguards.
              </li>
            </ul>

            <div style={{ marginTop: '1.5rem' }}>
              <a
                href="https://linkedin.com/in/shaik-bashe"
                target="_blank"
                rel="noopener noreferrer"
                className="cert-badge"
              >
                <i className="fa-brands fa-linkedin"></i> Verify on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-gears"></i> Technical Skills
            </h2>
            <p className="section-subtitle">
              Technologies and domains of expertise in programming, security, and AI development.
            </p>
          </div>

          <div className="skills-tabs reveal">
            {['all', 'languages', 'backend', 'aiml', 'tools'].map(cat => (
              <button
                key={cat}
                className={`skills-tab-btn ${activeSkillCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="skills-grid reveal">
            {filteredSkills.map(skill => (
              <div key={skill.name} className="card skill-card">
                <i className={`${skill.icon} skill-icon`}></i>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-meter-bg">
                  <div className="skill-meter-fill" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-code"></i> Featured Projects
            </h2>
            <p className="section-subtitle">
              Showcasing practical work in automated agent workflows, cybersecurity logs, and embedded systems.
            </p>
          </div>

          <div className="projects-filter reveal">
            {['all', 'cybersecurity', 'aiml', 'webiot'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${projectFilter === filter ? 'active' : ''}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter === 'aiml' ? 'AI / ML' : filter === 'webiot' ? 'IoT & Web' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="projects-grid reveal">
            {filteredProjects.map(proj => (
              <div key={proj.title} className="card project-card">
                <div className="project-icon-wrapper">
                  <i className={`fa-solid ${proj.icon}`}></i>
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-tags">
                  {proj.tags.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {proj.github ? (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`GitHub Repository for ${proj.title}`}
                    >
                      <i className="fa-brands fa-github"></i> Repository
                    </a>
                  ) : (
                    <span className="tech-tag" style={{ background: 'rgba(156, 163, 175, 0.15)', color: 'var(--text-secondary)' }}>
                      Code On Request
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Analytics Section */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-brands fa-github"></i> GitHub Analytics
            </h2>
            <p className="section-subtitle">
              Live updates of open-source contributions, repositories, and linguistic stats.
            </p>
          </div>

          <div className="github-analytics reveal">
            <div className="github-grid">
              <div className="github-chart-container">
                <div className="github-chart-title">
                  <i className="fa-solid fa-calendar-days" style={{ color: 'var(--accent-primary)' }}></i> Contribution Activity Graph
                </div>
                <img
                  src="https://ghchart.rshah.org/3b82f6/shaikbashe1"
                  alt="Shaik Bashe GitHub Contribution Chart"
                  className="github-chart-img"
                  loading="lazy"
                />
              </div>

              <div className="github-cards-grid">
                <div className="github-stat-card">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=shaikbashe1&show_icons=true&theme=dark&hide=stars&count_private=true&bg_color=0d1117&title_color=3b82f6&icon_color=3b82f6"
                    alt="Shaik Bashe GitHub Stats Profile"
                    loading="lazy"
                  />
                </div>
                <div className="github-stat-card">
                  <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=shaikbashe1&theme=dark&background=0d1117&ring=3b82f6&fire=3b82f6&currStreakLabel=3b82f6"
                    alt="Shaik Bashe GitHub Contribution Streak"
                    loading="lazy"
                  />
                </div>
                <div className="github-stat-card">
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=shaikbashe1&layout=compact&theme=dark&bg_color=0d1117&title_color=3b82f6"
                    alt="Shaik Bashe Top Languages Used"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Hackathons */}
      <section id="certifications" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-certificate"></i> Certifications & Hackathons
            </h2>
            <p className="section-subtitle">
              Validating concepts and verifying credentials earned through study and competitive hackathons.
            </p>
          </div>

          <div className="certs-grid">
            <div className="card reveal">
              <h3 className="cert-card-title">
                <i className="fa-solid fa-award"></i> Professional Credentials
              </h3>
              
              <div className="cert-badges-wrapper">
                <span className="cert-badge">
                  <i className="fa-solid fa-microchip"></i> NPTEL: Industry 4.0 & IIoT (Elite)
                </span>
                <span className="cert-badge">
                  <i className="fa-brands fa-google"></i> Google/Kaggle: AI Agents Intensive
                </span>
                <span className="cert-badge">
                  <i className="fa-solid fa-shield-halved"></i> Deloitte: Cyber Simulation (Forage)
                </span>
                <span className="cert-badge">
                  <i className="fa-solid fa-network-wired"></i> Cisco: Operating Systems Basics
                </span>
                <span className="cert-badge">
                  <i className="fa-solid fa-robot"></i> HCL GUVI: India AI Impact Buildathon 2026
                </span>
                <a
                  href="https://hackerrank.com/shaikbashe2222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-badge"
                >
                  <i className="fa-brands fa-hackerrank"></i> HackerRank: Java (Basic)
                </a>
                <span className="cert-badge">
                  <i className="fa-solid fa-square-code"></i> Sololearn: Java Basic
                </span>
              </div>
            </div>

            <div className="card reveal">
              <h3 className="cert-card-title">
                <i className="fa-solid fa-trophy"></i> Hackathons & Sports
              </h3>

              <ul className="hackathons-list">
                <li>
                  <strong>MumbaiHacks 2025</strong> - Round 2 Qualifier (Autonomous agent category)
                </li>
                <li>
                  <strong>India AI Impact Buildathon 2026</strong> - National Level Participant
                </li>
                <li>
                  <strong>Bio-E-Tech Hackathon</strong> - Built <em>Saliva Sense</em> (pediatric sensor monitor)
                </li>
                <li>
                  <strong>IDEATHON 2K25</strong> - Developed digital tracking prototypes (Hack2Skill)
                </li>
                <li>
                  <strong>Hack The Thread Hackathon</strong> - 180 Degrees Consulting NITK
                </li>
                <li>
                  <strong>ROBO X VR Hackathon</strong> - AR/VR Interface Design
                </li>
              </ul>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
                <a
                  href="https://ratings.fide.com/profile/537083740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-badge"
                  aria-label="Shaik Bashe FIDE Chess Profile"
                >
                  <i className="fa-solid fa-chess-queen"></i> FIDE Chess ID: 537083740
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">
              <i className="fa-solid fa-envelope-open-text"></i> Get In Touch
            </h2>
            <p className="section-subtitle">
              Reach out for internships, collaborative security builds, or general questions.
            </p>
          </div>

          <div className="contact-layout card reveal">
            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Internship opportunity / Collaboration / Question..."
                  className="form-control"
                ></textarea>
              </div>

              {formStatus === 'success' && (
                <div className="form-status success">
                  <i className="fa-solid fa-circle-check"></i> Message sent successfully! I'll contact you shortly.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-status error">
                  <i className="fa-solid fa-circle-xmark"></i> Submission failed. Please email directly.
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', border: 'none' }}
              >
                {formStatus === 'loading' ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-socials">
            <a href="https://linkedin.com/in/shaik-bashe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/shaikbashe1" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://leetcode.com/shaikbashe" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile">
              <i className="fa-solid fa-code"></i>
            </a>
            <a href="https://kaggle.com/shaikbashe" target="_blank" rel="noopener noreferrer" aria-label="Kaggle Profile">
              <i className="fa-brands fa-kaggle"></i>
            </a>
            <a href="https://ratings.fide.com/profile/537083740" target="_blank" rel="noopener noreferrer" aria-label="FIDE Profile">
              <i className="fa-solid fa-chess-queen"></i>
            </a>
          </div>
          <p>Designed and Built by Shaik Bashe &copy; 2026. Deployed on GitHub Pages.</p>
          <p className="footer-copyright">
            Custom domain: <a href="https://shaikbashe.dev" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>shaikbashe.dev</a>
          </p>
        </div>
      </footer>
    </div>
  );
}