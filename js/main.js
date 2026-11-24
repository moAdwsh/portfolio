/* ==========================================================================
   MAIN SCRIPT
   1. Builds the link buttons inside each project (data from projects-links.js)
   2. Shows one section at a time, based on the URL hash (#home, #projects …)
   ========================================================================== */

(() => {
  "use strict";

  const SECTIONS = ["home", "experience", "projects", "education", "about", "contact"];

  const BUTTONS = [                      // [key in PROJECT_LINKS, label, extra class]
    ["project",   "View Project ↗",   ""],
    ["dashboard", "View Dashboard ↗", "alt"],
    ["github",    "GitHub ↗",         "alt"],
    ["video",     "Watch Demo ↗",     "alt"],
    ["report",    "Read Report ↗",    "alt"]
  ];

  const isHttps = (url) => typeof url === "string" && /^https:\/\//.test(url);

  /* ----- 1. Project links -------------------------------------------------- */
  function renderProjectLinks() {
    document.querySelectorAll("#v-projects details[data-id]").forEach((project) => {
      const links = PROJECT_LINKS[project.dataset.id] || {};
      const body  = project.querySelector(".dbody");

      const row = document.createElement("div");
      row.className = "links";

      BUTTONS.forEach(([key, label, extraClass]) => {
        if (!isHttps(links[key])) return;
        const a = document.createElement("a");
        a.href = links[key];
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = label;
        if (extraClass) a.className = extraClass;
        row.appendChild(a);
      });
      if (row.children.length) body.appendChild(row);

      if (isHttps(links.embed)) {
        const frame = document.createElement("iframe");
        frame.className = "embed";
        frame.src = links.embed;
        frame.title = project.querySelector("summary").firstChild.textContent.trim();
        frame.loading = "lazy";
        frame.setAttribute("allowfullscreen", "");
        body.appendChild(frame);
      }
    });
  }

  /* ----- 2. Section switching ---------------------------------------------- */
  function showSection() {
    let current = (location.hash || "#home").slice(1);
    if (!SECTIONS.includes(current)) current = "home";

    SECTIONS.forEach((name) => {
      document.getElementById("v-" + name).classList.toggle("on", name === current);
    });
    document.querySelectorAll("#nav a").forEach((link) => {
      link.classList.toggle("on", link.getAttribute("href") === "#" + current);
    });
    document.getElementById("loc").textContent = current.toUpperCase();
    window.scrollTo(0, 0);
  }

  renderProjectLinks();
  window.addEventListener("hashchange", showSection);
  showSection();
})();
