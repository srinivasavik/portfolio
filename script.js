const projectData = {
  insomnia: {title:"INSOMNIA — Energy Drink",category:"MARKETING · BRAND DEVELOPMENT & DIGITAL STRATEGY",description:"Conceptualised and developed an energy drink brand for Gen Z, students, gamers, fitness enthusiasts and young professionals. The brand voice is fearless, energetic and a little rebellious — built around the thought 'Sleep is overrated.'",details:"MY CONTRIBUTION|Brand positioning, market segmentation, product strategy, pricing, Instagram-first promotional strategy, content concepts, influencer-style storytelling and limited-edition product ideas.|FOCUS|Gen Z marketing · Brand identity · Digital campaigns"},
  sabyasachi: {title:"Sabyasachi — Brand Intelligence",category:"RESEARCH · CONSUMER MINDSET",description:"A brand intelligence study exploring Sabyasachi's positioning, consumer perceptions, competitive landscape and marketing strategy. Designed and interpreted a primary research survey with 25 respondents.",details:"MY CONTRIBUTION|Survey design and interpretation; analysis of brand awareness, purchasing perceptions, celebrity influence and word-of-mouth marketing.|FRAMEWORKS|4Vs · Herd Marketing · Consumer perception · Reputation risks"},
  mppt: {title:"Fuzzy Logic-Based MPPT in SEPIC Converter",category:"ENGINEERING · RENEWABLE ENERGY",description:"Developed and implemented a Fuzzy Logic-based Maximum Power Point Tracking algorithm using a SEPIC converter to enhance solar energy harvesting under varying irradiation and load conditions.",details:"MY CONTRIBUTION|Modelled and validated the system in MATLAB Simulink, studying power losses and voltage oscillations against conventional Perturb & Observe techniques.|PERIOD|January 2025 – May 2025"},
  fertilizer: {title:"Nutrient-Based Fertilizer Distribution System",category:"ENGINEERING · SMART AGRICULTURE",description:"Developed a concept to provide real-time information about crop and soil nutrition needs by detecting NPK values in soil and applying fuzzy logic to determine nutritional requirements.",details:"MY CONTRIBUTION|Worked on the system concept connecting soil nutrient detection with a logic-based recommendation for crop nutrition.|PERIOD|March 2023 – May 2023"},
  marketrix: {title:"Marketrix — Crescendo 2026",category:"ACHIEVEMENT · MARKETING COMPETITION",description:"Winner at Marketrix, part of Crescendo 2026, the MBA fest organised by CHRIST (Deemed to be University). The competition moved through rapid brand identification, campaign creation, pitching and selling to strangers.",details:"TEAM|Participated with Rupendu R Nair.|WHAT IT TESTED|Speed of thought · Pitching · Brand understanding · Selling · Teamwork"},
  bengaluru: {title:"Battle for Bengaluru",category:"FINALIST · SOCIAL IMPACT MARKETING",description:"Finalist at the Battle for Bengaluru marketing competition under the Chaturanga vertical, hosted by Alliance University. The challenge was to act as a marketing agency and develop a strategy to reduce water consumption in Bengaluru community apartments.",details:"MY CONTRIBUTION|Co-created an eight-week strategic roadmap, campaign concepts and advertisements, and pitched the strategy to the client with Esha Salvi.|WHAT IT TAUGHT ME|Behaviour change · Strategic communication · Creative execution"}
};

window.addEventListener("load", () => setTimeout(() => document.querySelector(".loader")?.classList.add("done"), 550));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false");
}));

// Reveal elements as they enter the viewport.
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Keep the navigation indicator in sync with the visible section.
const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  }
}), {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section => navObserver.observe(section));

// Timeline expanders.
document.querySelectorAll(".expand-btn").forEach(button => button.addEventListener("click", () => {
  const card = button.closest(".timeline-card");
  const open = card.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
  button.firstChild.textContent = open ? "A little less " : "A little more ";
}));

// Project category filters.
document.querySelectorAll(".filter-btn").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  const filter = button.dataset.filter;
  document.querySelectorAll(".project-card").forEach(card => {
    card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
  });
}));

// Project detail modal.
const modal = document.querySelector(".modal");
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; };
document.querySelectorAll(".project-card").forEach(card => {
  const open = () => {
    const data = projectData[card.dataset.project]; if (!data) return;
    document.querySelector("#modal-title").textContent = data.title;
    document.querySelector(".modal-category").textContent = data.category;
    document.querySelector(".modal-description").textContent = data.description;
    document.querySelector(".modal-details").innerHTML = data.details.split("|").map((part,i) => i%2===0 ? `<strong>${part}</strong>` : `<p>${part}</p>`).join("");
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
    document.querySelector(".modal-close").focus();
  };
  card.querySelector(".project-open").addEventListener("click", open);
  card.querySelector(".project-visual").addEventListener("click", open);
});
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if(e.key==="Escape" && modal.classList.contains("open")) closeModal(); });

// Lightweight custom cursor on pointer devices.
if (window.matchMedia("(pointer:fine)").matches) {
  const dot = document.querySelector(".cursor-dot"), ring = document.querySelector(".cursor-ring");
  let x=0,y=0,rx=0,ry=0;
  window.addEventListener("mousemove", e => { x=e.clientX; y=e.clientY; dot.style.opacity=1; ring.style.opacity=1; dot.style.left=x+"px"; dot.style.top=y+"px"; });
  const animate = () => { rx += (x-rx)*.16; ry += (y-ry)*.16; ring.style.left=rx+"px"; ring.style.top=ry+"px"; requestAnimationFrame(animate); };
  animate();
  document.querySelectorAll("a,button,.project-visual").forEach(el => {
    el.addEventListener("mouseenter",()=>ring.classList.add("hover"));
    el.addEventListener("mouseleave",()=>ring.classList.remove("hover"));
  });
}

// Gentle pointer parallax on the hero collage.
const art = document.querySelector(".hero-art");
if (art && window.matchMedia("(pointer:fine)").matches) {
  art.addEventListener("mousemove", e => {
    const r=art.getBoundingClientRect(), dx=(e.clientX-r.left)/r.width-.5, dy=(e.clientY-r.top)/r.height-.5;
    art.querySelectorAll(".art-sun,.art-disc,.art-card,.sticker-blue").forEach((el,i)=> {
      const factor=(i+1)*5; el.style.translate=`${dx*factor}px ${dy*factor}px`;
    });
  });
  art.addEventListener("mouseleave",()=>art.querySelectorAll(".art-sun,.art-disc,.art-card,.sticker-blue").forEach(el=>el.style.translate="0 0"));
}
