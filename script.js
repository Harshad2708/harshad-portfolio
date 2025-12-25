// DARK MODE
document.getElementById("themeToggle").onclick =
  () => document.body.classList.toggle("dark");

// MOBILE MENU
document.getElementById("hamburger").onclick =
  () => document.getElementById("navLinks").classList.toggle("active");

// SCROLL REVEAL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1;
      e.target.style.transform="translateY(0)";
    }
  });
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el=>{
  el.style.transition="0.6s";
  observer.observe(el);
});

// GITHUB AUTO FETCH + LIVE DEMO BADGES
fetch("https://api.github.com/users/Harshad2708/repos")
.then(r=>r.json())
.then(repos=>{
  const c=document.getElementById("github-projects");
  repos.slice(0,6).forEach(repo=>{
    const div=document.createElement("div");
    div.className="project-card";
    div.innerHTML=`
      <h4>${repo.name}</h4>
      <p>${repo.description||"No description"}</p>
      <a href="${repo.html_url}" target="_blank">GitHub</a>
      ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Live Demo</a>` : ""}
    `;
    c.appendChild(div);
  });
});

// EMAILJS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form").addEventListener("submit",function(e){
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this)
    .then(()=>{
      document.getElementById("form-status").innerText="Message sent successfully!";
      this.reset();
    },()=>{
      document.getElementById("form-status").innerText="Failed to send message.";
    });
});
