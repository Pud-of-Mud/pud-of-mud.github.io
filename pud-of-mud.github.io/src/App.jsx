import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-faded'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-faded')
          observer.unobserve(entry.target)
        }
      })
    })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <div className="fade-in">
          <Opening />
        </div>
        <div className="fade-in">
          <Portfolio onSelectProject={setSelectedProject} />
        </div>
        <div className="fade-in">
          <Skills />
        </div>
        <div className="fade-in">
          <About />
        </div>
        <div className="fade-in">
          <Contact />
        </div>
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <header>
      <nav>
        <div>
          <img
            src="main/images/favicon/icon-96.png"
            alt="Logo"
            width="50"
            height="50"
          />
          <h1><a>Matthew Menne</a></h1>
        </div>
        <ul>
          <li><a href="#about">About Me</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Portfolio({ onSelectProject }) {
  const projects = [
    {
      id: 'model-img1',
      src: 'main/images/portfolio/DistractedDriving/cover.gif',
      alt: "Led the Computer Science Honor Society's first annual game jam; this is my entry!",
      playUrl: 'games/DistractedDriving/index.html',
    },
    {
      id: 'model-img17',
      src: 'main/images/portfolio/CodeForAWhile2025/Decision Tree.png',
      alt: 'Participated in a regional challenge for high schools with monetary prizes at the UNF School of Computing, utilizing large datasets, neural networks, and artificial intelligence to solve real-world problems. The solution we utilized was a decision tree model to predict voter outcomes.',
    },
    {
      id: 'model-img2',
      src: 'main/images/portfolio/TheSurvivors/TheSurvivorsWebsite.gif',
      alt: 'Planned, designed, and programmed a website of interactive media and proxy services; resulting in ~200,000 visits annually.',
    },
    {
      id: 'model-img14',
      src: 'main/images/portfolio/3DRenders/car.gif',
      alt: 'Used blender to create a 3D comp shot of a sports car in my driveway.',
    },
    {
      id: 'model-img3',
      src: 'main/images/portfolio/PortfolioSite/ThisSite.png',
      alt: "Planned, designed, and programmed a personal portfolio website, complete with interactive elements written in HTML, CSS, and JavaScript. The very website you're on now!",
    },
    {
      id: 'model-img15',
      src: 'main/images/portfolio/3DRenders/loon-render.png',
      alt: 'Loon render',
    },
    {
      id: 'model-img4',
      src: 'main/images/portfolio/TF2/TF2-workshop-page.png',
      alt: 'Participated in a 72-hour Game Design competition for Team Fortress 2 using the Hammer World Editor and was featured on the Steam Community Workshop.',
    },
    {
      id: 'model-img5',
      src: 'main/images/portfolio/VRChatWorlds/World-Screen-Space.png',
      alt: 'Modeled, programmed, and designed 3D interactive experiences for Virtual Reality using the Unity Engine; consisting of 28.6k visits and officially published by VRChat, Inc.',
    },
    {
      id: 'model-img6',
      src: 'main/images/portfolio/VRChatWorlds/World-Sunset-Beach.png',
      alt: 'Modeled, programmed, and designed 3D interactive experiences for Virtual Reality using the Unity Engine; consisting of 28.6k visits and officially published by VRChat, Inc.',
    },
    {
      id: 'model-img7',
      src: 'main/images/portfolio/VRChatWorlds/World-Wii-Play-Billiards.png',
      alt: 'Modeled, programmed, and designed 3D interactive experiences for Virtual Reality using the Unity Engine; consisting of 28.6k visits and officially published by VRChat, Inc.',
    },
    {
      id: 'model-img8',
      src: 'main/images/portfolio/VRChatWorlds/World-Forest-Fire.png',
      alt: 'Modeled, programmed, and designed 3D interactive experiences for Virtual Reality using the Unity Engine; consisting of 28.6k visits and officially published by VRChat, Inc.',
    },
    {
      id: 'model-img9',
      src: 'main/images/portfolio/SlimeVR/finished.JPG',
      alt: 'Planned, 3D-modeled, and developed multiple SlimeVR trackers capable of tracking the user’s full-body presence within Virtual Reality through SteamVR Integration.',
    },
    {
      id: 'model-img10',
      src: 'main/images/portfolio/AIPythonApp/AIPythonApp.png',
      alt: 'Created an AI application in Python using OpenAI’s API, capable of swapping Large Language Model Engine (LLMs) during runtime while keeping chat history.',
    },
    {
      id: 'model-img11',
      src: 'main/images/portfolio/VRPhysicsDemo/VRPhysicsDemo-UnityPreview.png',
      alt: 'Programmed and designed a Virtual Reality tech-demo utilizing the Unity Engine that showcases the use of real-world weights for objects and physics-based interactions between the player and the environment.',
    },
    {
      id: 'model-img12',
      src: 'main/images/portfolio/VRChatWorlds/World-Modern-Apartment.png',
      alt: 'Modeled, programmed, and designed 3D interactive experiences for Virtual Reality using the Unity Engine; consisting of over 30k visits and officially published by VRChat, Inc.',
    },
    {
      id: 'model-img13',
      src: 'main/images/portfolio/3DRenders/after-proto.gif',
      alt: 'Used blender to comp in a 3D animation of a protogen into the real world!',
    },
    {
      id: 'model-img16',
      src: 'main/images/portfolio/Motorcycle/motorcycle.jpg',
      alt: 'Fully restored a 1974 Kawasaki G5 100',
    },
  ]

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project-list">
        <div className="project-items">
          {projects.map((project) => (
            <div className="project-item-img-container" key={project.id}>
              {project.playUrl && <a href={project.playUrl}>Play here!</a>}
              <button
                type="button"
                className="project-image-button"
                aria-label={`View image: ${project.alt}`}
                onClick={() => onSelectProject(project)}
                style={{
                  border: 0,
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  lineHeight: 0,
                }}
              >
                <img
                  id={project.id}
                  src={project.src}
                  alt={project.alt}
                  width="300"
                  height="200"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Opening() {
  return (
    <section id="opening">
      <div>
        <h2>Matthew Menne</h2>
        <h3>Virtual and Immersive technologies Developer / Court Jester</h3>
      </div>
      <div>
        <img src="main/images/opening-image.jpg" alt="Portfolio Image" />
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills">
      <h2>Skills &amp; Experience</h2>
      <div className="skills-flex">
        <div className="skill-card">
          <div className="skill-card-inside">
            <h3>Game Development</h3>
            <ul>
              <li>Unity &amp; Unreal Engine wizardry</li>
              <li>C# &amp; C++ gameplay scripting</li>
              <li>Asset integration, physics, animation</li>
              <li>Rapid prototyping &amp; player experience</li>
            </ul>
          </div>
          <img src="main/images/icons/VRLogoCollage.png" alt="Game Development" />
        </div>
        <div className="skill-card">
          <div className="skill-card-inside">
            <h3>Immersive Technologies</h3>
            <ul>
              <li>VR/AR for Oculus, HTC Vive, mobile AR</li>
              <li>3D environments &amp; spatial audio</li>
              <li>User interaction &amp; experience design</li>
              <li>Cutting-edge immersive solutions</li>
            </ul>
          </div>
          <img src="main/images/icons/device.png" alt="Immersive technology devices" />
        </div>
        <div className="skill-card">
          <div className="skill-card-inside">
            <h3>Web Development</h3>
            <ul>
              <li>HTML, CSS, JavaScript, Node.js</li>
              <li>Responsive and accessible design</li>
              <li>Version control (Git), CI/CD</li>
              <li>Front-end design</li>
            </ul>
          </div>
          <img src="main/images/icons/HTMLLogoCollage.png" alt="Web development technologies" />
        </div>
      </div>

      <div id="skills-tools">
        <h3>Tools &amp; Technologies</h3>
        <ul>
          <li>Git &amp; GitHub</li>
          <li>Unity</li>
          <li>Adobe Animate</li>
          <li>SteamVR</li>
          <li>Unreal Engine</li>
          <li>Godot</li>
          <li>Visual Studio</li>
          <li>Blender</li>
          <li>DaVinci Resolve</li>
          <li>Adobe Photoshop</li>
          <li>Nuke</li>
          <li>After Effects</li>
        </ul>
      </div>

      <div id="experience">
        <h2>Employment</h2>
        <div className="experience-list">
          <div className="experience-item">
            <h3>Cashier - Publix</h3>
            <p><strong>2025 - present</strong></p>
            <ul>
              <li>Assisted with unloading product from trucks and organized stock room.</li>
              <li>Assisted with the maintenance of the shelf set.</li>
              <li>Cleaned cases and shelves, and mopped and swept the sales floor, stock rooms, and dairy coolers.</li>
              <li>Assisted with other duties as assigned.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Sales Associate - Palmetto Moon</h3>
            <p><strong>2023 - 2024</strong></p>
            <ul>
              <li>Assisted customers with product selection and inquiries</li>
              <li>Maintained store organization and cleanliness</li>
              <li>Processed transactions efficiently</li>
              <li>Replenished the sales floor</li>
              <li>Packaged customer merchandise and shipment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div>
        <h2>About</h2>
        <p>
          I'm a thing who wants to make cool stuff! I have a passion for creating
          engaging virtual experiences and a keen interest in game development;
          participating in game design competitions, hackathons, and game jams.
          I have a substantial love for VR/AR technologies and their potential,
          and I am eager to contribute to innovative projects that push the
          boundaries of interactive media.
        </p>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>
        If you would like to get in touch, feel free to reach out via email at{' '}
        <a href="mailto:mattbmenne@gmail.com">mattbmenne@gmail.com</a>
      </p>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="modal"
      role="presentation"
      onClick={onClose}
      style={{ display: 'block' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Project image"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="close"
          aria-label="Close image"
          onClick={onClose}
          style={{ border: 0, background: 'transparent' }}
        >
          &times;
        </button>
        <img className="modal-content" src={project.src} alt={project.alt} />
        <div id="caption">{project.alt}</div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <div className="social pull-left">
        <a href="#" aria-label="Twitter"><i className="fa fa-twitter" aria-hidden="true" /></a>
        <a href="#" aria-label="Facebook"><i className="fa fa-facebook" aria-hidden="true" /></a>
        <a href="#" aria-label="Dribbble"><i className="fa fa-dribbble" aria-hidden="true" /></a>
        <a href="#" aria-label="Flickr"><i className="fa fa-flickr" aria-hidden="true" /></a>
        <a href="https://github.com/Pud-of-Mud?tab=overview&from=2023-12-01&to=2023-12-31" aria-label="GitHub">
          <i className="fa fa-github" aria-hidden="true" />
        </a>
      </div>
      <p id="copyright">© Matthew Menne 2025 - All Rights Reserved</p>
      <nav aria-label="Footer">
        <a href="PrivacyPolicy.html">Privacy Policy</a>
        <span aria-hidden="true"> | </span>
        <a href="PrivacyPolicy.html#Terms">Terms of Service</a>
        <span aria-hidden="true"> | </span>
        <a href="#about">About Me</a>
        <span aria-hidden="true"> | </span>
        <a href="#skills">Skills</a>
        <span aria-hidden="true"> | </span>
        <a href="#projects">Projects</a>
        <span aria-hidden="true"> | </span>
        <a href="mailto:mattbmenne@gmail.com">Contact</a>
      </nav>
    </footer>
  )
}

export default App
