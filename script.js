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
    position   = ['-1020px','1020px']

nav.addEventListener('click', e => {
    let target = e.target
        if(target.tagName != 'A') return

        navLinks.forEach(el => el.classList.remove('active'))
        target.classList.add('active')
}) 

slider.addEventListener('click', e => {
    let target = e.target   
        if(target.className != 'phone') return 

        target.parentElement.lastElementChild.classList.toggle('phone__screen_off')
}) 

portNav.addEventListener('click', e => {
    let target = e.target
        if(target.tagName != 'A') return

        portLinks.forEach(el => el.classList.remove('portfolio-active'))
        target.classList.add('portfolio-active')
        portImages.forEach(el => el.style.order = Math.trunc(Math.random() * 10))
}) 

portfolio.addEventListener('click', e => {
    let target = e.target
        if(target.tagName != 'IMG') {
            portImages.forEach(el => el.classList.remove('img-selected'))
            return
        }

        portImages.forEach(el => el.classList.remove('img-selected'))
        target.classList.toggle('img-selected')
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

    function createText(sub, text) {

        message__text.innerText = ''
        message__text.innerText = `Тема:  ${sub} 
                                   Описание:  ${text}`

        if(!sub)          message__text.innerText = `Без темы 
                                                     Описание:  ${text}`

        if(!text)         message__text.innerText = `Тема:  ${sub}
                                                     Без описания `

        if(!sub && !text) message__text.innerText = `Без темы
                                                     Без описания`
    }

     createText(subject, textarea)

    mess.classList.toggle('hidden')
})

closeBtn.addEventListener('click', () => {
    let messageBlock = document.getElementById('message-block')
    messageBlock.classList.toggle('hidden')
})

function changeSlide(pos) {
    slides[0].style.left = pos 
    slides[1].style.left = '0px'
    slides = slides.reverse(); 
        setTimeout(() => {
            slides[1].remove();
            slides[1].style.left = pos;
            slider.append(slides[1]);
        },500)
}

function changeInitPosition(pos){
    slides.forEach(el => el.classList.add('animate'))
    if(slides[1].style.left !== pos) {
        setTimeout(() => {
            slides[1].remove();
            slides[1].style.left = pos;
            slider.append(slides[1]);
        },100)
    }
}

arrows[0].addEventListener('click', function(){
    changeInitPosition(position[0])
    setTimeout(() => changeSlide(position[1]),120)
})

arrows[1].addEventListener('click', function(){
    changeInitPosition(position[1])
    setTimeout(() => changeSlide(position[0]),120)
})

