// //Start scroll up 
// let scrollUp = document.querySelector(".up");
// window.onscroll = function () {
//     this.scrollY >= 400 ? scrollUp.classList.add("show") : scrollUp.classList.remove("show");
// };
// scrollUp.onclick = function () {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//     });
// }
// //End scroll up
//  Start open and Spin class on gear icon
document.querySelector(".toggle-settings .gear-icon").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};
//  End open and Spin class on gear icon
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start switch colors
let mainColors = localStorage.getItem("color_option");
if(mainColors !== null){
    document.documentElement.style.setProperty('--main-color', mainColors);
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors){
            element.classList.add("active");
        }
    });
}
const colorsLi=document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});
// End switch colors
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start switch random background option
let backgroundOption = true;
let backgroundInterval; // i'll do clear interval with it

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
//the type of value of backgroundLocalItem is STRING
    if(backgroundLocalItem === 'true'){ //this condition is for store the value in the localstorage
        backgroundOption = true;        // but those values below is to just user usage
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

const randomBackEl=document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
    span.addEventListener("click",(e)=>{
        handleActive(e);
        if(e.target.dataset.background==='yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});
// End switch random background option
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start changing the background image
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["image1.jpg","image2.jpg","img3.jpg"];
length=0;
function randomizeImgs(){
    if (backgroundOption === true) {
        backgroundInterval = setInterval( ()=> {
            landingPage.style.backgroundImage = `url(../imgs/${imgsArray[length]})`;
            length++;
            if (length >= imgsArray.length){
                length = 0;
            }
        },1500);
    }
}
randomizeImgs();
// End changing the background image
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start animate suv model
    const ourModel = document.querySelector("#our-model");
    let scrollUp = document.querySelector(".up");
    const title = document.querySelector(".title");
    window.onscroll = function () {
        //this coming line is for the scroll up button 
        this.scrollY >= 400 ? scrollUp.classList.add("show") : scrollUp.classList.remove("show");

        let modelsOffsetTop = ourModel.offsetTop;
        let modelsOuterHeight = ourModel.offsetHeight;
        let windowHeight = this.innerHeight;
        let windowScrollTop = this.pageYOffset; 
        if (windowScrollTop > (modelsOffsetTop + modelsOuterHeight - windowHeight)) {
            let allModels = document.querySelectorAll(".model-box .model-progress span");
            allModels.forEach(spanModel => {
                spanModel.style.width = spanModel.dataset.progress;
            });
        } else {
            let allModels = document.querySelectorAll(".model-box .model-progress span");
            allModels.forEach(spanModel => {
                spanModel.style.width = 0;
            });
        }

        let titleOffsetTop = title.offsetTop;
        let titleOuterHeight = title.offsetHeight;
        // let titleWindowHeight = this.innerHeight;
        // let titlewindowScrolltop = this.pageYOffset;
        if (windowScrollTop > (titleOffsetTop + titleOuterHeight - windowHeight)) {
            document.querySelectorAll(".title .icons span i").forEach(i =>{
                i.style.color = "black";
            });
            document.querySelector(".title h2").style.height = "57.5px";
        } 
        else {
            document.querySelectorAll(".title .icons span i").forEach(i =>{
                i.style.color = "white";
            });
            document.querySelector(".title h2").style.height = "0px";
        }
    };
    scrollUp.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
//End animate suv model
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start image slider
let imageSlider = Array.from(document.querySelectorAll('.slider img'));
let slidesCount = imageSlider.length;
let currentSlide = 1;
let slideNumberElement = document.getElementById('slide-number');
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;
let paginationElement = document.createElement('ul');
paginationElement.setAttribute('id', 'pagination-ul');
for (let i = 1; i <= slidesCount; i++) {
    let paginationItem = document.createElement('li');
    paginationItem.setAttribute('data-index', i);
    paginationItem.appendChild(document.createTextNode(i));
    paginationElement.appendChild(paginationItem);
}
document.getElementById('indicators').appendChild(paginationElement);
// Get The New Created UL
let paginationCreatedUl = document.getElementById('pagination-ul');
// Get Pagination Items
let paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));
for (let i = 0; i < paginationsBullets.length; i++) {
    paginationsBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute('data-index'));
    theChecker();
    }
} 
theChecker();
function nextSlide() {
    if (nextButton.classList.contains('disabled')) {
        return false;
    } else {
        currentSlide++;
        theChecker();
    }
}
function prevSlide() {
    if (prevButton.classList.contains('disabled')) {
        return false;
    } else {
        currentSlide--;
        theChecker();
    }
}
function theChecker() {
    // Set The Slide Number
    slideNumberElement.textContent = 'Model ' + (currentSlide) + ' of ' + (slidesCount);
    removeAllActive();
    imageSlider[currentSlide - 1].classList.add('active');
    paginationCreatedUl.children[currentSlide - 1].classList.add('active');
    if (currentSlide == 1) {
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
    }
    if (currentSlide == slidesCount) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}
    function removeAllActive() {
    imageSlider.forEach(function (img) {
        img.classList.remove('active');
    });
    paginationsBullets.forEach(function (bullet) {
        bullet.classList.remove('active');
    });
}
// End image slider
//////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//Start Gallery
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click' , (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if ( img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let popupImage = document.createElement('img');
        //the img that i loop on it in the forEach
        popupImage.src = img.src; //img
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});
document.addEventListener("click",(e)=>{
    if (e.target.className === 'close-button' || e.target.className === 'popup-overlay'){
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
});
//End Gallery
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Start 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".landing-page .links a");
function gotoSection(elements){
    elements.forEach(ele=>{
        ele.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
}
gotoSection(allBullets);
gotoSection(allLinks);
// End 
/////////////////////////////////////////////////////////////////////////////
//Handle active function
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}
//Handle active function
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Start show and hide bullets
    let bulletsSpan = document.querySelectorAll(".bullets-option span");
    let bulletsContainer = document.querySelector(".nav-bullets");
    let bulletLocalItem = localStorage.getItem("bullets_option");
    if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
    }
    bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
        bulletsContainer.style.display = 'block';
        localStorage.setItem("bullets_option", 'block');
        } else {
        bulletsContainer.style.display = 'none';
        localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
    });
//Start show and hide bullets
////////////////////////////////////////////////////
//Reset button
document.querySelector(".reset-options").onclick = function (){
    // localStorage.clear();
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");
    const localItems = ["color_option","background_option","bullets_option"];
    for (const loc in localItems){
        localStorage.removeItem(localItems[loc]);
    }
    window.location.reload();
}
//Reset button
//////////////////////////////////////////////////////////////////////////////////////////////////////
// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}
//click anywhere outside menu toggle button
document.addEventListener("click",(e)=>{
    if (e.target !== toggleBtn && e.target !== tLinks){
        if (tLinks.classList.contains('open')){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});
tLinks.onclick = function (e){
    e.stopPropagation();
}
//Toggle menu
//////////////////////////////////////////////////////////////////////////////////////////////////
// Head room
var myElement = document.querySelector(".navbar");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
// Head room
