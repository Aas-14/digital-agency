// HERO BUTTON

document.getElementById('btn')?.addEventListener('click', () => {
    document.querySelector('#contact')
    .scrollIntoView({
        behavior:'smooth'
    });
});


// CONTACT FORM

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {

        const res = await fetch(
           "http://localhost:5000/contact", 
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        // no response.json()

        if(res.ok){
            alert("Message Saved Successfully ✅");
            form.reset();
        } else {
            alert("Failed to send ❌");
        }

    } catch(err){
        console.log(err);
        alert("Backend not connected ❌");
    }
});

// REVEAL ANIMATION

const cards =
document.querySelectorAll(
    '.card'
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(
(entry)=>{

if(entry.isIntersecting){

entry.target.style.opacity =
'1';

entry.target.style.transform =
'translateY(0)';

}

});

},

{
threshold:.2
}

);

cards.forEach((card)=>{

card.style.opacity='0';

card.style.transform=
'translateY(50px)';

card.style.transition=
'.7s';

observer.observe(card);

});

// MOBILE MENU

const menuToggle =
document.querySelector('.menu-toggle');

const navLinks =
document.querySelector('.nav-links');

menuToggle.addEventListener(
'click',
()=>{
    navLinks.classList.toggle('active');
}
);

// REVEAL ANIMATION

const reveals =
document.querySelectorAll('.reveal');

window.addEventListener(
'scroll',
()=>{

reveals.forEach(section=>{

const top =
section.getBoundingClientRect().top;

if(top < window.innerHeight-100){
section.classList.add('active');
}

});

});

// PREMIUM COUNTER
/*
const counters =
document.querySelectorAll(
'.stat-box h2'
);

const speed = 120;

counters.forEach(
(counter)=>{

const target =
counter.innerText;

const number =
parseInt(
target.replace(/\D/g,'')
);

let count = 0;

const updateCounter = ()=>{

const increment =
Math.ceil(number/speed);

if(count < number){

count += increment;

if(count > number){
count = number;
}

if(target.includes('%')){
counter.innerText =
count + '%';
}
else{
counter.innerText =
count + '+';
}

requestAnimationFrame(
updateCounter
);

}
};

updateCounter();

});*/


