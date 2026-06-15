// Scroll animations
ScrollReveal().reveal('section', {
    delay:200,
    distance:'50px',
    origin:'bottom',
    duration:800
});

// Floating particles
const particles = document.getElementById("particles");

for(let i=0;i<40;i++){
    let p = document.createElement("div");
    p.style.position="absolute";
    p.style.width="4px";
    p.style.height="4px";
    p.style.background="#ff6b00";
    p.style.borderRadius="50%";
    p.style.top=Math.random()*100+"%";
    p.style.left=Math.random()*100+"%";
    p.style.opacity=Math.random();
    p.style.animation=`float ${3+Math.random()*5}s infinite ease-in-out`;
    particles.appendChild(p);
}