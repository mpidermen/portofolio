// Projects Data Architecture
const projectsData = [
    {
        id: 1,
        title: "SocialBoost AI",
        category: "ai",
        badge: "AI & Automation",
        thumbnail: "assets/images/Project1.png",
        description: "An AI-powered social media content platform designed to simplify content creation and management. It integrates AI capabilities to assist users in generating content ideas and social media materials through an intuitive dashboard.",
        fullDescription: "SocialBoost AI is a social media content automation platform developed to help users streamline their content creation and management processes. The platform integrates artificial intelligence to assist in generating content ideas and social media materials through an intuitive dashboard. Built with Laravel and modern web technologies, the project focuses on combining AI capabilities with practical content management features to create a more efficient social media workflow.",
        techStack: ["Laravel", "AI API Integration", "PHP", "CSS", "MySQL", "JavaScript"],
        demoUrl: "#",
        githubUrl: "https://github.com/mpidermen/socialboost-frontend"
    },
    {
        id: 2,
        title: "ESP32 Mini Robot",
        category: "iot",
        badge: "Embedded & IoT",
        thumbnail: "assets/images/Project2.jpeg",
        description: "An interactive mini robot powered by ESP32, combining embedded programming with a compact visual interface. The project features a navigation display, music control, simple animated expressions, and a real-time clock.",
        fullDescription: "ESP32 Mini Robot is an embedded systems project built around the ESP32 microcontroller, combining hardware integration and programming to create an interactive mini robot. The project features an OLED-based display for navigation information, music control functionality, simple animated eye expressions, and a real-time clock. It explores the integration of electronic components, microcontroller programming, and interactive features into a compact device.",
        techStack: ["C/C++", "ESP32 Architecture", "Arduino IDE", "OLED Display", "I2C Protocol"],
        demoUrl: "#",
        githubUrl: "https://github.com/mpidermen/ESP32-Mini-RobotNavigasi"
    },
    {
        id: 3,
        title: "AR Interactive Keychain",
        category: "ar",
        badge: "Augmented Reality",
        thumbnail: "assets/images/Project3.PNG",
        description: "An interactive AR keychain that combines physical design with digital experiences, allowing users to access immersive photo displays through a QR code.",
        fullDescription: "AR Interactive Keychain is a creative project that combines a physical keychain design with an augmented reality experience. The visual design assets were created using Photopea, while WebAR Studio was used to build and configure the AR experience. By scanning the QR code attached to the keychain, users can access an interactive digital experience featuring a floating photo. This project explores how accessible no-code tools can be used to connect physical objects with digital experiences in a creative and engaging way.",
        techStack: ["web-ar.studio", "Photopea", "QR Code", "Augmented Reality"],
        demoUrl: "#",
    },
    {
        id: 4,
        title: "Petopia",
        category: "ai",
        badge: "Full-Stack Web Development",
        thumbnail: "assets/images/Project4.png",
        description: "An online pet marketplace designed to connect pet owners with sellers, providing a convenient platform to explore pet products and related services.",
        fullDescription: "Petopia is an online marketplace project designed to connect pet owners with sellers through a digital shopping platform focused on pet-related needs. The platform aims to provide a convenient experience for discovering pet products, browsing product catalogs, and managing shopping activities. This project explores the development of an e-commerce platform, including user interfaces, marketplace functionality, and the integration of frontend and backend components to create an organized online shopping experience.",
        techStack: ["React", "Vite", "Node.js", "Express.js", "PostgreSQL"],
        demoUrl: "#",
        githubUrl: "https://github.com/mpidermen/marketplace_online_pet"
    },
    {
        id: 5,
        title: "Wedding Invitation Website",
        category: "ai",
        badge: "Web Development",
        thumbnail: "assets/images/Project5.png",
        description: "A full-stack digital wedding invitation website featuring an elegant design, interactive features, and a backend system for storing wedding wishes from guests.",
        fullDescription: "Wedding Invitation Website is a full-stack web application designed to provide an elegant and interactive digital wedding invitation experience. The website features a welcoming cover section, couple profiles, a love story timeline, wedding event details, a countdown timer, and an interactive photo gallery. It also includes a backend system that allows guests to submit wedding wishes, which are stored in a database and displayed on the website. This project demonstrates the integration of frontend development and backend functionality to create an interactive digital invitation platform.",
        techStack: ["HTML5", "CSS3", "JavaScript", "Backend", "Database"],
        demoUrl: "#",
        githubUrl: "https://github.com/mpidermen/wedding"
    }
];

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-thumb">
                <img src="${project.thumbnail}" alt="${project.title}">
                <span class="project-badge">${project.badge}</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
                <div class="project-footer">
                    <span class="link-btn" onclick="openProjectModal(${project.id})">
                        View Details <i class="fa-solid fa-arrow-right"></i>
                    </span>
                    <a href="${project.githubUrl}" target="_blank" class="link-btn" style="color: var(--text-secondary)">
                        <i class="fa-brands fa-github"></i> Source
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <span class="project-badge" style="position:static; display:inline-block; margin-bottom:12px">${project.badge}</span>
        <h2 style="font-size:1.75rem; margin-bottom:12px">${project.title}</h2>
        <img src="${project.thumbnail}" alt="${project.title}" style="width:100%; height:260px; object-fit:cover; border-radius:8px; margin-bottom:20px">
        <p style="color:var(--text-secondary); margin-bottom:20px; line-height:1.7">${project.fullDescription}</p>
        <h4 style="margin-bottom:10px">Tech Stack Applied:</h4>
        <div class="project-tech" style="margin-bottom:24px">
            ${project.techStack.map(tech => `<span class="tech-item" style="font-size:0.85rem">${tech}</span>`).join('')}
        </div>
        <div style="display:flex; gap:12px">
            <a href="${project.githubUrl}" target="_blank" class="btn btn-primary-orange btn-sm">
                <i class="fa-brands fa-github"></i> Repository
            </a>
            <button class="btn btn-secondary-slate btn-sm" onclick="closeProjectModal()">Close</button>
        </div>
    `;

    modal.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();

    // Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // Close Modal Events
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }
});
