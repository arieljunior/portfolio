const elements = document.querySelectorAll(".collapsible");

elements.forEach(element => {
    element.addEventListener("click", function(){

        this.classList.toggle("active-collapse");
        var content = this.nextElementSibling;

        content.classList.toggle("content-hidden");
        // if (content.style.display === "flex") {
        //     content.style.display = "none";
        // } else {
        //     content.style.display = "flex";
        // }
    })
})