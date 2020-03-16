let nav        = document.querySelector('.navigation'),
    navLinks   = document.querySelectorAll('.navigation__link')
    slider     = document.querySelector('.slider'),
    slides     = [...document.querySelectorAll('.slider__list')],
    arrows     = document.querySelectorAll('.slider__arrow'),
    portNav    = document.querySelector('.portfolio__navigation'),
    portLinks  = document.querySelectorAll('.portfolio__link'),
    portImages = document.querySelectorAll('.portfolio__gallery > img'),
    submit     = document.getElementById('submit'),
    closeBtn   = document.querySelector('.close-btn') 
    position   = [`-${slider.getBoundingClientRect().width}px`,`${slider.getBoundingClientRect().width}px`]

nav.addEventListener('click', e => {

    let target = e.target
        if(target.tagName != 'A') return

        navLinks.forEach(el => el.classList.remove('active'))
        target.classList.add('active')
}) 

slider.addEventListener('click', e => {

    let target = e.target  

        if(target.className === 'phone__screen' || target.className === 'phone__screen phone__screen_horizontal') target.classList.add('phone__screen_off')
        if(target.className !== 'phone') return 
        target.parentElement.lastElementChild.classList.toggle('phone__screen_off')
}) 

arrows[0].addEventListener('click', () => {
    changeInitPosition(position[0])
    setTimeout(() => changeSlide(position[1]),100)
})

arrows[1].addEventListener('click', () => {
    changeInitPosition(position[1])
    setTimeout(() => changeSlide(position[0]),100)
})

portNav.addEventListener('click', e => {

    let target = e.target
        if(target.tagName != 'A') return

        portLinks.forEach(el => el.classList.remove('portfolio-active'))
        target.classList.add('portfolio-active')
        //Change img position
        portImages.forEach(el => el.style.order = Math.trunc(Math.random() * 12))   
}) 

portfolio.addEventListener('click', e => {

    let target = e.target
        if(target.tagName != 'IMG') return
        if(target.className === 'img-selected') {
           target.classList.remove('img-selected')
           return
        } 
        portImages.forEach(el => el.classList.remove('img-selected'))
        target.classList.add('img-selected')
})

submit.addEventListener('click', () => {

    let mess     = document.getElementById('message-block'),
        form     = document.forms.quote,
        name     = form.fname.value,
        email    = form.email.value,
        subject  = form.subject.value,
        textarea = document.querySelector('.form__text').value,
        regexp   = /[A-Za-z]/gi

    form.onsubmit = e => e.preventDefault()

    if(!name || !email || !regexp.test(name)) return

    createText(subject, textarea)

    mess.classList.toggle('hidden')
})

closeBtn.addEventListener('click', () => {

    let messageBlock = document.getElementById('message-block')
        messageBlock.classList.toggle('hidden')
})

const createText = (sub, text) => {

    message__head.innerText = ''
    message__text.innerText = ''
    sub  ? message__head.innerText = `Тема: ${sub}`      : message__head.innerText = `Без темы`
    text ? message__text.innerText = `Описание: ${text}` : message__text.innerText = `Без описания`
}

const changeSlide = pos => {

    let delay = parseFloat(getComputedStyle(slides[0]).transition.slice(4,7))*1000
         
    slides[0].style.left = pos 
    slides[1].style.left = '0px'
    slides = slides.reverse(); 
        setTimeout(() => {
            slides[1].remove();
            slides[1].style.left = pos;
            slider.append(slides[1]);
        },delay)
}

const changeInitPosition = pos => {

    slides.forEach(el => el.classList.add('animate'))             
    if(slides[1].style.left !== pos) {
        setTimeout(() => {
            slides[1].remove();
            slides[1].style.left = pos;
            slider.append(slides[1]);
        },0)
    }
}


