const revealTargets = document.querySelectorAll(
  ".section-heading, .feature, .schema-image, .table-list article, .notebook-grid a, .principles > *, .citation > *"
);

for (const target of revealTargets) target.dataset.reveal = "";

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 }
  );
  for (const target of revealTargets) observer.observe(target);
} else {
  for (const target of revealTargets) target.classList.add("visible");
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counters = document.querySelectorAll("[data-count]");

if (!reduceMotion && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target;
        const target = Number(node.dataset.count);
        const start = performance.now();
        const duration = 900;
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = Math.round(target * eased).toLocaleString("en-US");
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(node);
      }
    },
    { threshold: 0.7 }
  );
  for (const counter of counters) counterObserver.observe(counter);
}

