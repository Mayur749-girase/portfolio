const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

async function loadProjects() {
  try {
    const response = await fetch("https://portfolio-khno.onrender.com/api/projects");
    const projects = await response.json();

    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-card");
      projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      container.appendChild(projectDiv);
    });
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

loadProjects();