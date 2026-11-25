import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projectImages = import.meta.glob('/src/assets/images/portfolio/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

function getProjectImage(imagePath) {
  const assetPath = `/src/assets/images/${imagePath.replace(/^main\/images\//, '')}`;
  const resolvedPath = projectImages[assetPath];
  if (!resolvedPath) throw new Error(`Missing project image: ${imagePath}`);
  return resolvedPath;
}

const pages = [
  { id: 'home', label: 'HOME', command: 'intro' },
  { id: 'portfolio', label: 'PORTFOLIO', command: 'portfolio' },
  { id: 'about', label: 'ABOUT', command: 'about' },
  { id: 'contact', label: 'CONTACT', command: 'contact' },
];

function PageIndicator({ pageIndex, pageCount, className = '', showScrollHint = false, showScrollCue = false }) {
  return (
    <>
      <div className={`page-indicator ${className}`} aria-label={`Page ${pageIndex + 1} of ${pageCount}`}>
        {showScrollHint && <span className="page-scroll-hint">↕ ARROWS / SCROLL</span>}
        <span>(page {pageIndex + 1}/{pageCount})</span>
      </div>
      {showScrollCue && (
        <span className="scroll-cue" role="img" aria-label="Scroll down for more content">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v15m-6-6 6 6 6-6" />
          </svg>
        </span>
      )}
    </>
  );
}

function HomePage() {
  return (
    <section className="terminal-page home-page" id="home" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">Matthew Menne</h1>
        <p className="hero-description">
          Virtual and immersive technologies developer <span className="hero-divider">/</span> Court Jester
        </p>
      </div>
      <PageIndicator pageIndex={0} pageCount={1} className="home-page-indicator" showScrollHint showScrollCue />
    </section>
  );
}

const projects = [
  {
    number: '01',
    name: 'Distracted Driving',
    types: ['GAME DEV / DESIGN'],
    description: 'Entry in the Computer Science Honor Society’s first annual game jam.',
    tags: ['GAME DEV', 'UNITY'],
    image: 'main/images/portfolio/DistractedDriving/cover.gif',
    href: '/games/distraced-driving/index.html',
  },
  {
    number: '02',
    name: 'Code For A While 2025',
    types: ['AI / DATA'],
    description: 'Regional high-school computing challenge entry: a decision tree model predicting voter outcomes from large datasets.',
    tags: ['DECISION TREE', 'AI'],
    image: 'main/images/portfolio/CodeForAWhile2025/Decision Tree.png',
  },
  {
    number: '03',
    name: 'The Survivors',
    types: ['WEB DEV / DESIGN'],
    description: 'Interactive media and proxy-services website, planned, designed, and programmed; reached about 200,000 visits annually.',
    tags: ['WEB', '200K VISITS / YR'],
    image: 'main/images/portfolio/TheSurvivors/TheSurvivorsWebsite.gif',
  },
  {
    number: '04',
    name: 'Driveway Sports Car',
    types: ['3D WORK'],
    description: 'A Blender 3D composite placing a sports car in the driveway.',
    tags: ['BLENDER', '3D'],
    image: 'main/images/portfolio/3DRenders/car.gif',
  },
  {
    number: '05',
    name: 'Personal Portfolio',
    types: ['WEB DEV / DESIGN'],
    description: 'This personal portfolio site, designed and programmed with interactive HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: 'main/images/portfolio/PortfolioSite/ThisSite.png',
  },
  {
    number: '06',
    name: 'Loon Render',
    types: ['3D WORK'],
    description: 'A 3D loon render.',
    tags: ['BLENDER', '3D'],
    image: 'main/images/portfolio/3DRenders/loon-render.png',
  },
  {
    number: '07',
    name: 'Team Fortress 2 Workshop',
    types: ['GAME DEV / DESIGN'],
    description: 'A 72-hour Team Fortress 2 game design challenge using Hammer World Editor; featured on the Steam Community Workshop.',
    tags: ['HAMMER EDITOR', 'TF2'],
    image: 'main/images/portfolio/TF2/TF2-workshop-page.png',
  },
  {
    number: '08',
    name: 'VRChat — Screen Space',
    types: ['3D WORK', 'VR WORK'],
    description: 'Modeled, programmed, and designed as part of VRChat worlds with 28.6K visits and official VRChat publication.',
    tags: ['UNITY', 'VRCHAT'],
    image: 'main/images/portfolio/VRChatWorlds/World-Screen-Space.png',
  },
  {
    number: '09',
    name: 'VRChat — Sunset Beach',
    types: ['3D WORK', 'VR WORK'],
    description: 'Modeled, programmed, and designed as part of VRChat worlds with 28.6K visits and official VRChat publication.',
    tags: ['UNITY', 'VRCHAT'],
    image: 'main/images/portfolio/VRChatWorlds/World-Sunset-Beach.png',
  },
  {
    number: '10',
    name: 'VRChat — Wii Play Billiards',
    types: ['3D WORK', 'VR WORK'],
    description: 'Modeled, programmed, and designed as part of VRChat worlds with 28.6K visits and official VRChat publication.',
    tags: ['UNITY', 'VRCHAT'],
    image: 'main/images/portfolio/VRChatWorlds/World-Wii-Play-Billiards.png',
  },
  {
    number: '11',
    name: 'VRChat — Forest Fire',
    types: ['3D WORK', 'VR WORK'],
    description: 'Modeled, programmed, and designed as part of VRChat worlds with 28.6K visits and official VRChat publication.',
    tags: ['UNITY', 'VRCHAT'],
    image: 'main/images/portfolio/VRChatWorlds/World-Forest-Fire.png',
  },
  {
    number: '12',
    name: 'SlimeVR Trackers',
    types: ['HARDWARE', 'VR WORK'],
    description: 'Planned, 3D-modeled, and developed multiple trackers for full-body VR tracking through SteamVR integration.',
    tags: ['3D MODELING', 'STEAMVR'],
    image: 'main/images/portfolio/SlimeVR/finished.JPG',
  },
  {
    number: '13',
    name: 'AI Python App',
    types: ['AI / DATA', 'SOFTWARE'],
    description: 'Python AI chat app using OpenAI’s API; switches language model engines at runtime while preserving chat history.',
    tags: ['PYTHON', 'OPENAI API'],
    image: 'main/images/portfolio/AIPythonApp/AIPythonApp.png',
  },
  {
    number: '14',
    name: 'VR Physics Demo',
    types: ['VR WORK', 'GAME DEV / DESIGN'],
    description: 'Unity VR demo using real-world object weights and physics-based interactions between player and environment.',
    tags: ['UNITY', 'VR', 'PHYSICS'],
    image: 'main/images/portfolio/VRPhysicsDemo/VRPhysicsDemo-UnityPreview.png',
  },
  {
    number: '15',
    name: 'VRChat — Modern Apartment',
    types: ['3D WORK', 'VR WORK'],
    description: 'Modeled, programmed, and designed as part of VRChat worlds with over 30K visits and official VRChat publication.',
    tags: ['UNITY', 'VRCHAT'],
    image: 'main/images/portfolio/VRChatWorlds/World-Modern-Apartment.png',
  },
  {
    number: '16',
    name: 'Protogen Composite',
    types: ['3D WORK'],
    description: 'A Blender 3D animation composited into real-world footage.',
    tags: ['BLENDER', 'COMPOSITING'],
    image: 'main/images/portfolio/3DRenders/after-proto.gif',
  },
  {
    number: '17',
    name: '1974 Kawasaki G5 100',
    types: ['CARS'],
    description: 'A fully restored 1974 Kawasaki G5 100 motorcycle.',
    tags: ['MOTORCYCLE', 'RESTORATION'],
    image: 'main/images/portfolio/Motorcycle/motorcycle.jpg',
  },
];

const projectsPerPage = 3;
const aboutPageCount = 2;
const projectTypes = [...new Set(projects.flatMap((project) => project.types))]
  .sort((first, second) => first.localeCompare(second));

function WorkPage({ pageIndex, pageSize, pageCount, selectedType, onSelectType, onBack, onOpenImage }) {
  const typeProjects = selectedType
    ? projects.filter((project) => project.types.includes(selectedType))
    : [];
  const pageProjects = typeProjects.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  return (
    <section className="terminal-page work-page" id="portfolio" aria-labelledby="work-title">
      {selectedType ? (
        <>
          <div className="work-heading">
            <button type="button" className="directory-back" onClick={onBack}>‹ ALL TYPES</button>
            <h2 id="work-title" className="section-title">{selectedType} <span className="project-count">({typeProjects.length})</span></h2>
          </div>
          <div className="project-list">
            {pageProjects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-topline"><span>{project.number} — {project.types.join(' / ')}</span></div>
                <div className="project-media-row">
                  <button
                    type="button"
                    className="project-image-button"
                    onClick={(event) => onOpenImage(project, event.currentTarget)}
                    aria-label={`View ${project.name} image fullscreen`}
                  >
                    <img className="project-image" src={getProjectImage(project.image)} alt={`${project.name} preview`} loading="lazy" />
                  </button>
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {project.href && <a className="project-link" href={project.href} target="_blank" rel="noreferrer">PLAY ↗</a>}
                  </div>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 id="work-title" className="section-title">Projects <span className="project-count">({projects.length})</span></h2>
          <div className="project-directory" aria-label="Project types">
            {projectTypes.map((type) => {
              const count = projects.filter((project) => project.types.includes(type)).length;
              return (
                <button type="button" className="project-folder" key={type} onClick={() => onSelectType(type)}>
                  <svg className="project-folder-icon" viewBox="0 0 16 18" aria-hidden="true">
                    <path d="M1.5 5.5v-2h4.8l1.8 2h6.4v9h-13z" />
                  </svg>
                  <span>{type}</span>
                  <span className="project-folder-count">({count})</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      <PageIndicator
        pageIndex={pageIndex}
        pageCount={pageCount}
        showScrollHint={Boolean(selectedType) && pageIndex < pageCount - 1}
        showScrollCue={Boolean(selectedType) && pageIndex < pageCount - 1}
      />
    </section>
  );
}

function AboutPage({ pageIndex }) {
  return (
    <section className="terminal-page about-page" id="about" aria-labelledby="about-title">
      {pageIndex === 0 && (
        <div className="about-overview">
          <h2 id="about-title" className="section-title">About</h2>
          <div className="about-copy">
            <p>I’m a person who wants to make cool stuff! I have a passion for creating engaging virtual experiences and a keen interest in game development.</p>
            <p>I take part in game design competitions, hackathons, and game jams. I’m especially interested in VR/AR and their potential to push the boundaries of interactive media.</p>
          </div>
          <h2 className="section-title skills-section-title">Skills &amp; Tech</h2>
          <div className="skills-tech-list">
            <section className="skills-tech-group">
              <h3>GAME DEVELOPMENT</h3>
              <p>Unity · Unreal · C# · C++</p>
              <p>Gameplay · Physics · Animation · Prototyping</p>
            </section>
            <section className="skills-tech-group">
              <h3>IMMERSIVE TECH</h3>
              <p>VR / AR · Oculus · HTC Vive · Mobile AR</p>
              <p>3D environments · Spatial audio · Interaction</p>
            </section>
            <section className="skills-tech-group">
              <h3>WEB DEVELOPMENT</h3>
              <p>HTML · CSS · JavaScript · Node.js</p>
              <p>Responsive · Accessibility · Git · CI/CD</p>
            </section>
            <section className="skills-tech-group">
              <h3>TOOLS</h3>
              <p>GitHub · Unity · Unreal · Godot · SteamVR · VS</p>
              <p>Blender · Animate · Photoshop · After Effects · Nuke · DaVinci</p>
            </section>
          </div>
        </div>
      )}
      {pageIndex === 1 && (
        <>
          <h2 id="about-title" className="section-title">Work Experience</h2>
          <div className="experience-list">
            <article className="experience-item">
              <h3>Cashier — Publix <span>2025—present</span></h3>
              <p>Truck unloading and stockroom organization; shelf maintenance; cleaning cases, shelves, sales floor, stockrooms, and dairy coolers.</p>
            </article>
            <article className="experience-item">
              <h3>Sales Associate — Palmetto Moon <span>2023—2024</span></h3>
              <p>Customer assistance, transactions, store organization, sales-floor restocking, and packaging merchandise and shipments.</p>
            </article>
          </div>
        </>
      )}
      <PageIndicator
        pageIndex={pageIndex}
        pageCount={aboutPageCount}
        showScrollHint={pageIndex < aboutPageCount - 1}
        showScrollCue={pageIndex < aboutPageCount - 1}
      />
    </section>
  );
}

function ContactPage({ onHome }) {
  return (
    <section className="terminal-page contact-page" id="contact" aria-labelledby="contact-title">
      <div className="contact-content">
        <h2 id="contact-title">Find me online.</h2>
        <p className="contact-copy">Contact anytime.</p>
        <a className="email-link" href="https://matthewmenne.com/" target="_blank" rel="noreferrer"><span>matthewmenne.com</span><span aria-hidden="true">↗</span></a>
        <a className="email-link" href="https://github.com/Pud-of-Mud" target="_blank" rel="noreferrer"><span>github.com/Pud-of-Mud</span><span aria-hidden="true">↗</span></a>
        <a className="email-link" href="https://www.linkedin.com/in/matthew-menne/" target="_blank" rel="noreferrer"><span>linkedin.com/in/matthew-menne/</span><span aria-hidden="true">↗</span></a>
        <a className="email-link" href="mailto:matthew@matthewmenne.com" target="_blank" rel="noreferrer"><span>matthew@matthewmenne.com</span><span aria-hidden="true">↗</span></a>
      </div>
      <PageIndicator pageIndex={0} pageCount={1} className="contact-page-indicator" />
      <footer className="terminal-footer"><span>MATTHEW MENNE</span><a href="#home" onClick={(event) => { event.preventDefault(); onHome(); }}>↑ HOME</a></footer>
    </section>
  );
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [workPage, setWorkPage] = useState(0);
  const [workPageSize, setWorkPageSize] = useState(projectsPerPage);
  const [aboutPage, setAboutPage] = useState(0);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [flickerKey, setFlickerKey] = useState(0);
  const [flickerLines, setFlickerLines] = useState([]);
  const stageRef = useRef(null);
  const openingTypewriter = useRef(true);
  const scrollLock = useRef(false);
  const transitionTimeout = useRef(null);
  const touchStartY = useRef(null);
  const imageViewerCloseRef = useRef(null);
  const imageTriggerRef = useRef(null);
  const visibleProjectCount = selectedProjectType
    ? projects.filter((project) => project.types.includes(selectedProjectType)).length
    : 0;
  const projectPageCount = selectedProjectType
    ? Math.max(1, Math.ceil(visibleProjectCount / workPageSize))
    : 1;

  const currentPrompt = activePage === 0
    ? { path: 'intro', command: './welcome.sh' }
    : activePage === 1
    ? { path: 'portfolio', command: selectedProjectType
    ? `ls ./portfolio/${selectedProjectType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')} --page=${workPage + 1}/${projectPageCount}`
      : 'ls ./portfolio' }
      : activePage === 2
        ? aboutPage === 0
          ? { path: 'other', command: 'cat ./README.md' }
          : { path: 'other', command: 'cat ./work-experience.txt' }
        : { path: 'other', command: 'open https://pud-of-mud.github.io/' };

  const triggerFlicker = useCallback(() => {
    const lineCount = 3 + Math.floor(Math.random() * 4);
    setFlickerLines(Array.from({ length: lineCount }, (_, index) => ({
      id: index,
      top: `${Math.floor(Math.random() * 98)}%`,
      left: `${Math.floor(Math.random() * 28)}%`,
      width: `${24 + Math.floor(Math.random() * 77)}%`,
      height: `${1 + Math.floor(Math.random() * 5)}px`,
      delay: `${Math.floor(Math.random() * 90)}ms`,
      alpha: (0.25 + Math.random() * 0.45).toFixed(2),
    })));
    setFlickerKey((key) => key + 1);
  }, []);

  const goToPage = useCallback((index) => {
    const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
    if (nextIndex === activePage) return;
    window.clearTimeout(transitionTimeout.current);
    setActivePage(nextIndex);
    if (nextIndex === 1) {
      setWorkPage(0);
      setSelectedProjectType(null);
    }
    if (nextIndex === 2) setAboutPage(0);
  }, [activePage]);

  const movePage = useCallback((direction) => {
    if (activePage === 1) {
      const nextWorkPage = workPage + direction;
      if (nextWorkPage >= 0 && nextWorkPage < projectPageCount) {
        window.clearTimeout(transitionTimeout.current);
        transitionTimeout.current = window.setTimeout(() => setWorkPage(nextWorkPage), 90);
      }
      return;
    } else if (activePage === 2) {
      const nextAboutPage = aboutPage + direction;
      if (nextAboutPage >= 0 && nextAboutPage < aboutPageCount) {
        window.clearTimeout(transitionTimeout.current);
        transitionTimeout.current = window.setTimeout(() => setAboutPage(nextAboutPage), 90);
      }
      return;
    }
    window.clearTimeout(transitionTimeout.current);
    transitionTimeout.current = window.setTimeout(() => goToPage(activePage + direction), 90);
  }, [aboutPage, activePage, goToPage, projectPageCount, workPage]);

  const openImage = (project, trigger) => {
    imageTriggerRef.current = trigger;
    setSelectedImage(project);
  };

  const closeImage = () => setSelectedImage(null);

  const handleWheel = useCallback((event) => {
    if (Math.abs(event.deltaY) < 15) return;
    triggerFlicker();
    if (scrollLock.current) return;
    event.preventDefault();
    scrollLock.current = true;
    movePage(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { scrollLock.current = false; }, 350);
  }, [movePage, triggerFlicker]);

  const handleTouchStart = (event) => {
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event) => {
    const startY = touchStartY.current;
    touchStartY.current = null;
    const endY = event.changedTouches[0]?.clientY;
    if (startY === null || endY === undefined || Math.abs(startY - endY) < 40) return;
    if (scrollLock.current) return;
    triggerFlicker();
    scrollLock.current = true;
    movePage(startY > endY ? 1 : -1);
    window.setTimeout(() => { scrollLock.current = false; }, 350);
  };

  useEffect(() => {
    if (!isStarted) return undefined;
    const updateWorkPageSize = () => {
      const isMobile = window.matchMedia('(max-width: 700px)').matches;
      const compact = window.innerHeight <= 650;
      const availableHeight = window.innerHeight - (
        isMobile ? (compact ? 143 : 214) : (compact ? 236 : 214)
      );
      const estimatedProjectHeight = !isMobile && compact
        ? 78
        : window.innerWidth <= 360
        ? (compact ? 112 : 150)
        : (compact ? 112 : 126);
      const fittingPageSize = Math.floor(availableHeight / estimatedProjectHeight);
      const nextSize = isMobile
        ? Math.max(1, fittingPageSize)
        : compact
          ? Math.max(1, Math.min(projectsPerPage, fittingPageSize))
          : projectsPerPage;
      setWorkPageSize(nextSize);
      setWorkPage((current) => Math.min(current, Math.ceil(projects.length / nextSize) - 1));
    };
    updateWorkPageSize();
    window.addEventListener('resize', updateWorkPageSize);
    return () => window.removeEventListener('resize', updateWorkPageSize);
  }, [isStarted]);

  useLayoutEffect(() => {
    if (!isStarted) return;
    if (selectedImage) {
      imageViewerCloseRef.current?.focus();
      return;
    }
    if (imageTriggerRef.current?.isConnected) {
      imageTriggerRef.current.focus();
      imageTriggerRef.current = null;
      return;
    }
    const activeViewport = stageRef.current?.querySelector('.page-viewport:not([hidden])');
    const firstControl = selectedProjectType && activePage === 1
      ? activeViewport?.querySelector('.project-image-button')
      : activeViewport?.querySelector('button:not(:disabled), a[href]');
    firstControl?.focus();
  }, [activePage, aboutPage, isStarted, selectedImage, selectedProjectType, workPage]);

  useEffect(() => {
    if (!isStarted) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;
    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isStarted]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      triggerFlicker();
      if (!isStarted) {
        if (event.key === 'Enter' || event.key.startsWith('Arrow')) {
          event.preventDefault();
          setIsStarted(true);
        }
        return;
      }
      if (selectedImage) {
        if (event.key === 'Escape' || event.key.startsWith('Arrow')) {
          event.preventDefault();
          closeImage();
        }
        return;
      }

      const direction = event.key === 'ArrowRight' ? 1
        : event.key === 'ArrowLeft' ? -1
          : event.key === 'ArrowDown' ? 1
            : event.key === 'ArrowUp' ? -1
              : 0;
      if (direction === 0) {
        if (event.key === 'Home') {
          event.preventDefault();
          goToPage(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          goToPage(pages.length - 1);
        } else if (event.key === 'PageDown') {
          event.preventDefault();
          movePage(1);
        } else if (event.key === 'PageUp') {
          event.preventDefault();
          movePage(-1);
        }
        return;
      }

      event.preventDefault();
      const activeViewport = stageRef.current?.querySelector('.page-viewport:not([hidden])');
      const pageControls = activeViewport
        ? Array.from(activeViewport.querySelectorAll('button:not(:disabled), a[href]'))
        : [];
      const focusedControl = document.activeElement;
      const navControls = Array.from(document.querySelectorAll('.terminal-nav .nav-item'));
      const focusedNavIndex = navControls.indexOf(focusedControl);
      if (focusedNavIndex >= 0) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          const nextNavIndex = focusedNavIndex + direction;
          if (navControls[nextNavIndex]) navControls[nextNavIndex].focus();
          else goToPage(activePage + direction);
        } else {
          const target = direction > 0 ? pageControls[0] : pageControls.at(-1);
          if (target) target.focus();
          else movePage(direction);
        }
        return;
      }

      const focusedIndex = pageControls.indexOf(focusedControl);
      if (focusedIndex >= 0) {
        if (
          activePage === 1
          && !selectedProjectType
          && focusedControl.matches('.project-folder')
        ) {
          const folders = Array.from(activeViewport.querySelectorAll('.project-folder'));
          const folderIndex = folders.indexOf(focusedControl);
          const columnCount = getComputedStyle(activeViewport.querySelector('.project-directory'))
            .gridTemplateColumns.split(' ').length;
          let nextFolderIndex = folderIndex;
          if (event.key === 'ArrowRight' && folderIndex % columnCount < columnCount - 1) {
            nextFolderIndex += 1;
          } else if (event.key === 'ArrowLeft' && folderIndex % columnCount > 0) {
            nextFolderIndex -= 1;
          } else if (event.key === 'ArrowDown') {
            nextFolderIndex += columnCount;
          } else if (event.key === 'ArrowUp') {
            nextFolderIndex -= columnCount;
          }
          if (folders[nextFolderIndex]) folders[nextFolderIndex].focus();
        } else if (event.key === 'ArrowRight') {
          focusedControl.click();
        } else if (event.key === 'ArrowLeft') {
          if (activePage === 1 && selectedProjectType) {
            setWorkPage(0);
            setSelectedProjectType(null);
          } else {
            goToPage(activePage - 1);
          }
        } else {
          const nextIndex = focusedIndex + direction;
          if (pageControls[nextIndex]) {
            pageControls[nextIndex].focus();
          } else if (
            activePage === 1
            && !selectedProjectType
            && ((direction > 0 && focusedIndex === pageControls.length - 1)
              || (direction < 0 && focusedIndex === 0))
          ) {
            goToPage(activePage + direction);
          } else if (
            activePage === 1
            && selectedProjectType
            && ((direction > 0 && workPage < projectPageCount - 1)
              || (direction < 0 && workPage > 0))
          ) {
            movePage(direction);
          } else {
            pageControls[direction > 0 ? 0 : pageControls.length - 1].focus();
          }
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        goToPage(activePage + direction);
      } else if (pageControls.length) {
        pageControls[direction > 0 ? 0 : pageControls.length - 1].focus();
      } else {
        movePage(direction);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, goToPage, isStarted, movePage, projectPageCount, selectedImage, selectedProjectType, triggerFlicker, workPage]);

  useLayoutEffect(() => {
    if (!isStarted) return undefined;
    const stage = stageRef.current;
    const activeViewport = stage?.querySelector('.page-viewport:not([hidden])');
    if (!activeViewport) return undefined;

    const includeInterface = openingTypewriter.current;
    openingTypewriter.current = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const roots = [activeViewport];
    if (includeInterface) {
      roots.push(
        document.querySelector('.terminal-topbar'),
        document.querySelector('.terminal-nav'),
      );
    }

    const textNodes = [];
    roots.filter(Boolean).forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        const isActivePageText = activeViewport.contains(node.parentElement);
        const isHeadingText = node.parentElement.closest('h1, h2, h3, h4, h5, h6');
        if (
          node.nodeValue.trim()
          && !node.parentElement.closest('.cursor, .page-indicator')
          && ((!isActivePageText && includeInterface) || isHeadingText)
        ) {
          textNodes.push({
            node,
            text: node.nodeValue,
            parent: node.parentElement,
            characterDelay: 14,
            startDelay: textNodes.length * 8,
          });
        }
        node = walker.nextNode();
      }
    });

    if (!textNodes.length) return undefined;
    textNodes.forEach(({ node }) => { node.nodeValue = ''; });

    let frameId;
    let startTime;
    const animateText = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let remaining = 0;
      textNodes.forEach(({ node, text, parent, startDelay, characterDelay }) => {
        const characterCount = Math.min(
          text.length,
          Math.max(0, Math.floor((elapsed - startDelay) / characterDelay) + 1),
        );
        if (characterCount > 0) {
          node.nodeValue = text.slice(0, characterCount);
          if (characterCount < text.length) {
            if (!parent.closest('h1, h2, h3')) parent.classList.add('typewriter-active');
            remaining += 1;
          } else {
            parent.classList.remove('typewriter-active');
          }
        } else {
          remaining += 1;
        }
      });
      if (remaining > 0) frameId = window.requestAnimationFrame(animateText);
      else textNodes.forEach(({ node, text }) => { node.nodeValue = text; });
    };
    frameId = window.requestAnimationFrame(animateText);

    return () => {
      window.cancelAnimationFrame(frameId);
      textNodes.forEach(({ node, text, parent }) => {
        node.nodeValue = text;
        parent.classList.remove('typewriter-active');
      });
    };
  }, [aboutPage, activePage, isStarted, workPage, workPageSize]);

  return (
    <main className="scene">
      <div className="monitor">
        <div className="monitor-screen">
          <div className={`terminal-shell ${isStarted ? 'is-started' : 'is-off'}`} onClickCapture={triggerFlicker}>
            <div key={flickerKey} className="scanline-flicker" aria-hidden="true">
              {flickerLines.map((line) => (
                <span
                  className="scanline"
                  key={line.id}
                  style={{
                    top: line.top,
                    left: line.left,
                    width: line.width,
                    height: line.height,
                    animationDelay: line.delay,
                    '--scanline-alpha': line.alpha,
                  }}
                />
              ))}
            </div>
            {!isStarted ? (
              <button className="startup-screen" onClick={() => setIsStarted(true)} aria-label="Start terminal portfolio">
                <span className="startup-status">MATTHEW MENNE / PORTFOLIO SYSTEM</span>
                <span className="startup-message">DISPLAY OFFLINE</span>
                <span className="startup-instruction">PRESS <kbd>ENTER</kbd> TO START</span>
                <span className="startup-subtext">or click anywhere in this screen</span>
              </button>
            ) : (
              <>
            <header className="terminal-topbar">
              <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goToPage(0); }} aria-label="Matthew Menne portfolio home">
                <span className="prompt-user">matthew@portfolio</span><span className="prompt-path">:~/{currentPrompt.path}</span><span className="prompt-symbol">$</span><span>{currentPrompt.command}</span>
              </a>
              <span className="topbar-status">interactive terminal</span>
            </header>
            <nav className="terminal-nav" aria-label="Portfolio sections">
              <span className="nav-label">NAVIGATE</span>
              {pages.map((page, index) => (
                <button className={`nav-item ${activePage === index ? 'active' : ''}`} key={page.id} onClick={() => goToPage(index)} aria-current={activePage === index ? 'page' : undefined}>
                  <span className="nav-caret">{activePage === index ? '›' : ' '}</span>{page.label}<span className="nav-shortcut">0{index + 1}</span>
                </button>
              ))}
              <span className="nav-keyhint">← →</span>
            </nav>
            <div
              className="page-stage"
              ref={stageRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Portfolio content"
            >
              {pages.map((page, index) => (
                <div
                  className="page-viewport"
                  key={page.id}
                  hidden={activePage !== index}
                  aria-hidden={activePage !== index}
                >
                  {index === 0 && <HomePage />}
                  {index === 1 && (
                    <WorkPage
                      pageIndex={workPage}
                      pageSize={workPageSize}
                      pageCount={projectPageCount}
                      selectedType={selectedProjectType}
                      onSelectType={(type) => { setWorkPage(0); setSelectedProjectType(type); }}
                      onBack={() => { setWorkPage(0); setSelectedProjectType(null); }}
                      onOpenImage={openImage}
                    />
                  )}
                  {index === 2 && <AboutPage pageIndex={aboutPage} />}
                  {index === 3 && <ContactPage onHome={() => goToPage(0)} />}
                </div>
              ))}
            </div>
              </>
            )}
          </div>
          {selectedImage && (
            <div
              className="image-viewer"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedImage.name} image`}
              onClick={closeImage}
            >
              <button
                type="button"
                className="image-viewer-close"
                ref={imageViewerCloseRef}
                autoFocus
                onClick={closeImage}
                aria-label="Close fullscreen image"
              >
                × CLOSE
              </button>
              <img
                className="image-viewer-image"
                src={getProjectImage(selectedImage.image)}
                alt={`${selectedImage.name} full-size preview`}
                onClick={(event) => event.stopPropagation()}
              />
              <p className="image-viewer-description" onClick={(event) => event.stopPropagation()}>
                <strong>{selectedImage.name}</strong> — {selectedImage.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
