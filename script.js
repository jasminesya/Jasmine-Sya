document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const list = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");

  // Mobile menu
  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Smooth scroll + close mobile menu
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      const section = document.querySelector(id);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      list.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight current section in nav
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));

  // Involvement filter
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll("#involvement-grid .card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      cards.forEach((c) => (c.hidden = f !== "all" && c.dataset.group !== f));
    });
  });
});
