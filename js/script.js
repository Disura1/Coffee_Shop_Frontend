//Search box & Navigation icon & Categories section
let search = document.querySelector(".search-box");
let navbar = document.querySelector(".navbar");
let categories = document.querySelector(".categories");

document.querySelector("#search-icon").onclick =()=>{
    search.classList.toggle("active");
    navbar.classList.remove("active");
    categories.classList.remove("active");
}

document.querySelector("#menu-icon").onclick =()=>{
    navbar.classList.toggle("active");
    search.classList.remove("active");
    categories.classList.remove("active");
}

document.querySelector("#products").addEventListener("mouseover", ()=>{
    categories.classList.add("active");
    navbar.classList.remove('active');
})

window.onscroll =()=>{
    navbar.classList.remove('active');
    search.classList.remove('active');
    categories.classList.remove("active");
}

//Product Sliders
const product_containers = document.querySelectorAll(".product-container");

product_containers.forEach(product_container => {
    let initialposition = 0;
    let pressedinside = false;

    const sliderContainer = product_container.closest(".slider-container");
    const scrollLeftButton = sliderContainer.querySelector(".scroll-left");
    const scrollRightButton = sliderContainer.querySelector(".scroll-right");
    
    // Mouse drag functionality
    product_container.addEventListener("mousedown",function(e){
        this.style.cursor = "grabbing";
        initialposition = e.clientX;
        pressedinside = true;
    })
    product_container.addEventListener("mouseup",function(e){
        this.style.cursor = "grab"
        pressedinside = false;
    })
    product_container.addEventListener("mouseleave",function(e){
        pressedinside = false;
    })
    product_container.addEventListener("mousemove",function(e){
        if(!pressedinside){
            return;
        }
        this.scrollLeft += initialposition - e.clientX;
    })
    
    // Button Scroll Functionality
    const scrollAmount = 300;
    
    if(scrollLeftButton){
        scrollLeftButton.addEventListener("click", () => {
            product_container.scrollLeft -= scrollAmount;
        });
    }
    
    if(scrollRightButton){
        scrollRightButton.addEventListener("click", () => {
            product_container.scrollLeft += scrollAmount;
        });
    }
});

//Feedbacks auto slider
const customer_container = document.querySelector(".customers-container");

const autoSlideInterval = 3000;
const slideDistance = 300;

let totalOriginalItems = 0;
let firstFewClonedWidth = 0;
const itemsToClone = 3;

let slideTimer;


const setupSlider = () => {
    const originalBoxes = customer_container.querySelectorAll(".box");
    totalOriginalItems = originalBoxes.length;

    if (totalOriginalItems === 0) {
        console.warn("No product boxes found in .product-container.");
        return; 
    }

    for (let i = 0; i < Math.min(itemsToClone, totalOriginalItems); i++) {
        const clonedBox = originalBoxes[i].cloneNode(true); 
        customer_container.appendChild(clonedBox);

        const boxWidth = originalBoxes[i].offsetWidth;
        const boxMarginRight = parseFloat(window.getComputedStyle(originalBoxes[i]).marginRight);
        firstFewClonedWidth += (boxWidth + boxMarginRight);
    }

    customer_container.scrollLeft = 0;

    slideTimer = setInterval(performAutoSlide, autoSlideInterval);
};

const performAutoSlide = () => { 
    if (customer_container.scrollLeft >= (customer_container.scrollWidth - customer_container.clientWidth - (firstFewClonedWidth - slideDistance))) {
        customer_container.style.scrollBehavior = "auto";
        customer_container.scrollLeft = 0; 
        setTimeout(() => {
            customer_container.style.scrollBehavior = "smooth";
        }, 50); 
    } else {
        customer_container.scrollLeft += slideDistance;
    }
};

customer_container.addEventListener('mouseenter', () => {
    clearInterval(slideTimer); 
});

customer_container.addEventListener('mouseleave', () => {
    slideTimer = setInterval(performAutoSlide, autoSlideInterval);
});

document.addEventListener('DOMContentLoaded', setupSlider);

//Map location
const map = L.map('map').setView([7.034960, 79.990580], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([7.034960, 79.990580]).addTo(map)
  .bindPopup('Coffee Shop')
  .openPopup();