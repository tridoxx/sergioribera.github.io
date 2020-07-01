ScrollReveal({ reset:true }).reveal('.skills-item', {
    delay: 75,
    duration: 1500,
    afterReveal: function(e){
        e.setAttribute("animate", e.getAttribute("porcentage"));
    }
});