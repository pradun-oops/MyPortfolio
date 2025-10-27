import React, { useState, useEffect } from 'react';
import profileImage from './assets/profile.png';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Briefcase, GraduationCap, Award, ChevronDown, Smartphone, Brain, Database, Server, Terminal, Shield, Cpu, Zap, Quote, Bug, Network, GitBranch, GithubIcon, GitBranchPlusIcon, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const titles = ['Flutter Developer', 'Cyber Security Analyst'];

  // --- Effect 1: Scroll, Active Section, and Mouse Position ---
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- Effect 2: Typing Animation Smoothing and Mobile Scroll Lock FIX ---
  useEffect(() => {
    // FIX: Mobile Scroll Restriction Logic
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto'; 
    }

    // Typing animation logic
    const currentTitle = titles[titleIndex];
    let timeout;
    
    // Smoothness parameters
    const TYPING_SPEED = 120; 
    const DELETING_SPEED = 60; 

    // Dynamic speed variation
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && displayText === currentTitle) {
      // Longer pause after typing
      timeout = setTimeout(() => setIsDeleting(true), 2500); 
    } else if (isDeleting && displayText === '') {
      // Quick pause after deletion before starting next title
      timeout = setTimeout(() => {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length); 
      }, 500);
      
    } else {
      // Actual typing/deleting step
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    // Cleanup for both the typing timeout and the scroll lock
    return () => {
        clearTimeout(timeout);
        document.body.style.overflow = 'auto'; 
    };
  }, [displayText, isDeleting, titleIndex, titles, isMenuOpen]); // Added isMenuOpen dependency for scroll lock

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close menu and re-enable scroll after selection on mobile
      setIsMenuOpen(false); 
      document.body.style.overflow = 'auto'; 
    }
  };

  // --- Data (Kept as is) ---
  const projects = [
    {
      title: "Appointment Pro",
      period: "May 2025 - Aug 2025",
      desc: "Flutter and Express JS booking app with secure authentication and optimized scheduling algorithms for healthcare.",
      tags: ["Flutter", "Express JS", "Authentication"],
      repoLink: "https://github.com/pradun-oops/appointment_pro.git"
    },
    {
      title: "PureBite",
      period: "Feb 2025 - Apr 2025",
      desc: "Advanced food packet ingredients analyzer using LLM for ingredient transparency and healthier choices.",
      tags: ["Flutter", "LLM", "AI"],
      repoLink: "https://github.com/pradun-oops/PureBite.git"
    },
    {
      title: "AI Chat Bot",
      period: "Oct 2024 - Nov 2024",
      desc: "AI chatbot application powered by Gemini AI API with natural language processing.",
      tags: ["Flutter", "Gemini AI", "API"],
      repoLink: "https://github.com/pradun-oops/chat_bot.git"
    },
    {
      title: "Expense Tracker",
      period: "Jun 2024 - Aug 2024",
      desc: "Full-featured expense tracking app with Firebase for robust data management.",
      tags: ["Flutter", "Firebase"],
      repoLink: "https://github.com/pradun-oops/expensify.git"
    },
    {
      title: "Weather App",
      period: "Aug 2024 - Sep 2024",
      desc: "A simple weather app using open weather API.",
      tags: ["Flutter", "Open Weather API"],
      repoLink: "https://github.com/pradun-oops/weather.git"
    },
    {
      title: "Wallpaper App",
      period: "Jun 2024 - Aug 2024",
      desc: "Slick and modern looking wallpaper app using pixels wallpaper API",
      tags: ["Flutter", "Pixels Wallpaper API"],
      repoLink: "https://github.com/pradun-oops/pixels.git"
    },
    {
      title: "Personal Chat App",
      period: "Jan 2024 - mar 2024",
      desc: "Personal Chat app using firebase as backend.",
      tags: ["Flutter", "Firebase"],
      repoLink: "https://github.com/pradun-oops/linkd.git"
    },
    {
      title: "My Portfolio Page",
      period: "Aug 2025 - Sep 2025",
      desc: "Personal Portfolio Page using react and tailwind CSS",
      tags: ["React JS", "Tailwind CSS"],
      repoLink: "https://github.com/pradun-oops/pixels.git"
    },
  ];

  const skills = [
    { name: "Flutter Development", icon: Smartphone },
    { name: "Dart", icon: Code },
    { name: "Machine Learning", icon: Brain },
    { name: "Python", icon: Code },
    { name: "Firebase", icon: Database },
    { name: "Linux/Kali Linux", icon: Terminal }, 
    { name: "MetaSploit", icon: Bug },
    { name: "NMap", icon: Network},
    { name: "Shell Scripting", icon: Terminal },    
    { name: "AI", icon: Cpu },
    { name: "Git", icon: GitBranchPlusIcon },
    { name: "GitHub", icon: GithubIcon },
  ];

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white overflow-x-hidden">
      {/* Background Blobs (Kept as is) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 -left-4"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-0 right-4"></div>
        <div className="absolute w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-20"></div>
      </div>

      {/* --- Responsive Navigation Bar with Glass Morphism --- */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={{
        background: scrollY > 50 || isMenuOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        backdropFilter: scrollY > 50 || isMenuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 || isMenuOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection('home')}>
            PK
          </div>
          
          {/* Desktop Navigation (Visible on md and up) */}
          <div className="hidden md:flex gap-2">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"> 
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 relative overflow-hidden group ${activeSection === item.id
                    ? 'bg-white/30 text-white shadow-lg'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                    }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    border: activeSection === item.id ? '1px solid rgba(255, 255, 255, 0.5)' : '1px solid transparent'
                  }}>
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {activeSection === item.id && (
                    <div className="absolute inset-0 animate-liquid-glass"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button (Visible on small screens) */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu (Dropdown) - ALIGNED TO THE LEFT */}
        <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out origin-top-left ${isMenuOpen ? 'max-h-screen opacity-100 scale-y-100 py-4' : 'max-h-0 opacity-0 scale-y-95 overflow-hidden'}`}
             style={{
                 // Enhanced Glassmorphism Background
                 background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))', 
                 backdropFilter: 'blur(30px) brightness(80%)', 
                 border: '1px solid rgba(255, 255, 255, 0.15)', 
                 borderRadius: '0 0 1.5rem 1.5rem', 
                 boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', 
                 paddingBottom: isMenuOpen ? '1rem' : '0', 
             }}>
          {/* Flex container to push elements to the LEFT */}
          <div className="flex flex-col gap-2 px-4 items-start"> {/* Changed items-end to items-start */}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-11/12 text-left px-6 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden 
                            ${activeSection === item.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border border-white/30'
                                : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'
                            }`}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Visual effect for active item */}
                {activeSection === item.id && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse rounded-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- Main Content Container (Apply blur when menu is open) --- */}
      <main className={`transition-filter duration-300 ${isMenuOpen ? 'filter blur-sm md:blur-none' : ''}`}>
        {/* --- Home Section --- */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 pt-28 pb-12">
          <div className="text-center z-10 max-w-4xl w-full flex flex-col items-center">
            <div className="mb-8 flex justify-center animate-fade-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Pradun Kumar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="animate-fade-in px-2 sm:px-4"> 
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
                Pradun Kumar
              </h1>
              {/* FIX: Reduced font size and added whitespace-nowrap to prevent wrapping/overlap */}
              <div className="h-8 sm:h-10 mb-4 sm:mb-6 flex items-center justify-center">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white drop-shadow-lg whitespace-nowrap"> 
                  <span className="inline-block text-center">
                    {displayText}
                    <span className="animate-blink ml-1">|</span>
                  </span>
                </p>
              </div>
              {/* FIX: Increased max-w for better description wrapping */}
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-sm mx-auto mb-6 sm:mb-8 drop-shadow-md font-medium leading-normal mt-4"> 
                Dynamic cross-platform developer driving mobile applications with focus on user engagement,
                data privacy, and machine learning optimization
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
                <a href="https://github.com/pradun-oops" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                  <Github size={20} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/pradun-kumar-3846b3260" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                  <Linkedin size={20} /> LinkedIn
                </a>
                <a href="mailto:pradunkumar63@gmail.com"
                  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-pink-500/30">
                  <Mail size={20} /> Gmail
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- About Section (Content Kept as is) --- */}
        <section id="about" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Experience</h3>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-semibold text-purple-300">Machine Learning Specialist</h4>
                  <p className="text-gray-300">Ardent Computech Private Limited</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Kolkata</p>
                  <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                    <li>• Enhanced model accuracy by 25% through feature engineering</li>
                    <li>• Improved data processing efficiency by 30% using Python & Pandas</li>
                    <li>• Reduced prediction errors by 15% through optimization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Education</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-300">Master of Computer Applications</h4>
                    <p className="text-gray-300">Cyber Security Specialization</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Amity University, Noida • 2027</p>
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-blue-300">Bachelor of Computer Applications</h4>
                    <p className="text-gray-300">Bokaro Steel City College</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Bokaro, Jharkhand • 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 group">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Certifications</h3>
                </div>

                <div className="space-y-3 sm:space-y-4">

                  <a href="https://drive.google.com/file/d/1WI0p1r2v3mr7GEBgz2TRToORuVtlrX1q/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="block p-2 sm:p-3 -m-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-yellow-300">Flutter Development</h4>
                      <p className="text-gray-300 text-sm">WS Cube Tech</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Nov 2024 - Jul 2025</p>
                    </div>
                  </a>

                  <a href="https://drive.google.com/file/d/1FCElsiqPM2k7dKgy79l76Xs7NxWgIa6o/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="block p-2 sm:p-3 -m-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-yellow-300">Machine Learning</h4>
                      <p className="text-gray-300 text-sm">Ardent Computech PVT. LTD</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Apr 2024 - May 2024</p>
                    </div>
                  </a>

                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 group">
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Get In Touch</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-green-400" />
                    <a href="mailto:pradunkumar63@gmail.com" className="hover:text-green-400 transition-colors">
                      pradunkumar63@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-green-400" />
                    <span>+91 9693552544</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-green-400" />
                    <span>Bokaro Steel City, Jharkhand, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section (Content Kept as is) --- */}
        <section id="projects" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => {
                const shadowColors = [
                  'hover:shadow-pink-500/20',
                  'hover:shadow-green-500/20',
                  'hover:shadow-blue-500/20',
                  'hover:shadow-yellow-500/20',
                  'hover:shadow-red-500/20',
                ];
                const iconGradients = [
                  'from-purple-500 to-pink-500', 
                  'from-green-400 to-emerald-500', 
                  'from-blue-500 to-cyan-500', 
                  'from-yellow-500 to-orange-500', 
                  'from-red-500 to-pink-600', 
                ];

                const currentShadow = shadowColors[idx % shadowColors.length];
                const currentIconGradient = iconGradients[idx % iconGradients.length];

                return (
                  <a
                    key={idx}
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:no-underline"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl ${currentShadow} group h-full`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${currentIconGradient} rounded-xl group-hover:rotate-12 transition-transform duration-300`}
                        >
                          <Code size={20} />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 mb-3">{project.period}</p>
                      <p className="text-gray-300 text-sm mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Skills Section (Content Kept as is) --- */}
        <section id="skills" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, idx) => {
                  const IconComponent = skill.icon;
                  
                  const themes = [
                      { 
                          from: 'from-pink-500/20', to: 'to-red-500/20', 
                          border: 'hover:border-red-400/50', shadow: 'hover:shadow-red-500/30', 
                          icon: 'text-red-400 group-hover:text-pink-400' 
                      },
                      { 
                          from: 'from-blue-500/20', to: 'to-cyan-500/20', 
                          border: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/30', 
                          icon: 'text-cyan-400 group-hover:text-blue-400' 
                      },
                      { 
                          from: 'from-green-500/20', to: 'to-emerald-500/20', 
                          border: 'hover:border-emerald-400/50', shadow: 'hover:shadow-green-500/30', 
                          icon: 'text-emerald-400 group-hover:text-green-400' 
                      },
                      { 
                          from: 'from-yellow-500/20', to: 'to-orange-500/20', 
                          border: 'hover:border-orange-400/50', shadow: 'hover:shadow-yellow-500/30', 
                          icon: 'text-orange-400 group-hover:text-yellow-400' 
                      },
                  ];

                  const currentTheme = themes[idx % themes.length];

                  return (
                      <div key={idx}
                          className={`group px-4 py-3 sm:px-6 sm:py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-gradient-to-br ${currentTheme.from} ${currentTheme.to} hover:scale-105 md:hover:scale-110 ${currentTheme.border} transition-all duration-300 hover:shadow-xl ${currentTheme.shadow} cursor-pointer relative overflow-hidden`}
                          style={{ animationDelay: `${idx * 50}ms` }}
                          onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              e.currentTarget.style.setProperty('--mouse-x', `${mousePosition.x - rect.left}px`);
                              e.currentTarget.style.setProperty('--mouse-y', `${mousePosition.y - rect.top}px`);
                          }}>
                          
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                  background: 'radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent)'
                              }}>
                          </div>
                          
                          <div className="flex items-center gap-3 relative z-10 text-sm sm:text-base">
                              <IconComponent size={20} className={`${currentTheme.icon} transition-colors duration-300 group-hover:rotate-12 group-hover:scale-110`} />
                              <span className="font-semibold group-hover:text-white transition-colors duration-300">{skill.name}</span>
                          </div>
                          
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: 'linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                                backgroundSize: '200% 200%',
                                animation: 'shimmer 2s infinite'
                              }}>
                          </div>

                      </div>
                  );
              })}
            </div>
          </div>
        </section>

        {/* --- Contact Section (Content Kept as is) --- */}
        <section id="contact" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto w-full text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12">
              Have a project in mind? Let's create something amazing together!
            </p>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 hover:bg-white/15 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:pradunkumar63@gmail.com" className="text-sm sm:text-base text-white hover:text-purple-400 transition-colors">
                      pradunkumar63@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Phone</p>
                    <span className="text-sm sm:text-base text-white">+91 9693552544</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6 justify-center">
                <a href="https://github.com/pradun-oops" target="_blank" rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/pradun-kumar-3846b3260" target="_blank" rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:pradunkumar63@gmail.com"
                  className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-110 transition-all hover:shadow-lg hover:shadow-pink-500/30">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer (Kept as is - it's fine) --- */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Pradun Kumar. Built with React & Tailwind CSS
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/pradun-oops" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/pradun-kumar-3846b3260" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:pradunkumar63@gmail.com"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        /* Styles remain the same, ensuring animations and responsiveness are intact */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes liquid-glass {
          0% { 
            background: radial-gradient(circle at 0% 0%, rgba(100, 149, 237, 0.2), transparent 50%);
          }
          25% { 
            background: radial-gradient(circle at 100% 0%, rgba(173, 216, 230, 0.2), transparent 50%);
          }
          50% { 
            background: radial-gradient(circle at 100% 100%, rgba(100, 149, 237, 0.2), transparent 50%);
          }
          75% { 
            background: radial-gradient(circle at 0% 100%, rgba(173, 216, 230, 0.2), transparent 50%);
          }
          100% { 
            background: radial-gradient(circle at 0% 0%, rgba(100, 149, 237, 0.2), transparent 50%);
          }
        }
        .animate-liquid-glass {
          animation: liquid-glass 3s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        /* Custom scrollbar hide for horizontal nav on desktop if needed */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}