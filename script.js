let sections   = document.querySelectorAll('main, main >*'),   
    nav        = document.querySelector('.navigation'),
    hamburger  = document.querySelector('.header__hamburger'),
    mobileNav  = document.querySelector('.mobile-navigation__links'),
    asideBar   = document.querySelector('.mobile-navigation'),
    navLinks   = document.querySelectorAll('.navigation__link')
    slider     = document.querySelector('.slider__container'),
    slides     = [...document.querySelectorAll('.slider__slide')],
    arrows     = document.querySelectorAll('.slider__arrow'),
    portNav    = document.querySelector('.portfolio__navigation'),
    portLinks  = document.querySelectorAll('.portfolio__link'),
    portImages = document.querySelectorAll('.portfolio__gallery > img'),
    submit     = document.getElementById('submit'),
    closeBtn   = document.querySelector('.close-btn'), 
    position   = [`-50%`,`50%`]

document.addEventListener('scroll', onScroll)    

asideBar.addEventListener('click', e => {
    let target = e.target 

    if(target.className !== 'mobile-navigation mobile-navigation-active') return
    hamburger.click()
})

hamburger.addEventListener('click', function() {
    if(getComputedStyle(document.querySelector('.header__navigation')).display === 'none') {

        asideBar.style.height = document.documentElement.clientHeight + 'px'

        this.classList.toggle('hamburger-active')
        asideBar.classList.toggle('mobile-navigation-active')

        document.querySelector('.header > h1').classList.toggle('hidden')
    }
})

mobileNav.addEventListener('click', moveToSection) 

nav.addEventListener('click', moveToSection) 

slider.addEventListener('click', e => {

    let target = e.target  

        if(target.className === 'screen' || target.className === 'screen screen_horizontal') target.parentElement.classList.add('phone__screen_off')
        if(target.className !== 'phone') return 
        target.parentElement.lastElementChild.classList.toggle('phone__screen_off')
}) 

arrows[0].addEventListener('click', loadTime(function(){
    changeInitPosition(position[0])
    setTimeout(() => changeSlide(position[1]),100)
},600)) 

arrows[1].addEventListener('click', loadTime(function(){
    changeInitPosition(position[1])
    setTimeout(() => changeSlide(position[0]),100)
},600))

portNav.addEventListener('click', e => {
    
    let target = e.target
        e.preventDefault()
        if(target.tagName != 'A' || target.className === 'portfolio__link portfolio-active') return

        portLinks.forEach(el => el.classList.remove('portfolio-active'))
        target.classList.add('portfolio-active')
        //Change img position
        changeImagePosition()
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

fname.onblur = () => {
    let regexpName  = /[A-Za-z]/gi
    if(!regexpName.test(fname.value)) {
        fname.classList.add('invalid')
        error__name.style.display = 'inline'
    }
}

fname.onfocus = function() {
    if(this.classList.contains('invalid')) {
        this.classList.remove('invalid')
        error__name.style.display = 'none'
    }
}

email.onblur = () => {
    let regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regexpEmail.test(email.value)) {
        email.classList.add('invalid')
        error__email.style.display = 'inline'
    }
}

email.onfocus = function() {
    if(this.classList.contains('invalid')) {
        this.classList.remove('invalid')
        error__email.style.display = 'none'
    }
}

submit.addEventListener('click', () => {

    let mess        = document.getElementById('message-block'),
        form        = document.forms.quote,
        subject     = form.subject.value,
        textarea    = document.querySelector('.form__text').value,
        regexpName  = /[A-Za-z]/gi,
        regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    form.onsubmit = e => e.preventDefault()

    if(!fname.value || !regexpName.test(fname.value)) {
        fname.classList.add('invalid')
        error__name.style.display = 'inline'
        return
    }
    if(!email.value || !regexpEmail.test(email.value)) {
        email.classList.add('invalid')
        error__email.style.display = 'inline'
        return
    }
    
    createText(subject, textarea)

    mess.classList.toggle('hidden')
})

closeBtn.addEventListener('click', () => {
    let messageBlock = document.getElementById('message-block')
        messageBlock.classList.toggle('hidden')
        fname.value = ''
        email.value = ''
        subject.value = ''
        document.querySelector('.form__text').value = ''
})

function onScroll(e) {
    let curPos = window.scrollY 
        
        sections.forEach(section => {
            if(section.offsetTop <= curPos && (section.offsetTop + section.offsetHeight) > curPos) {
                navLinks.forEach(link => {
                    link.classList.remove('active')
                    if(section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active')
                    }
                })
            }
        })

}

function moveToSection(e) {
    e.preventDefault()
    let target = e.target
        if(target.tagName != 'A') return
        
        sections.forEach(section => {
            if(target.getAttribute('href').substr(1) === section.getAttribute('id')) {

                //Defines necessary bottom offset in dependency of the device screen height.
                //Purpose: add accurate offsetTop for contact section.
                if(document.documentElement.clientHeight > document.getElementById('get-a-quote').offsetHeight + footer.offsetHeight + header.offsetHeight) {
                    footer.style.marginBottom = document.documentElement.clientHeight - (document.getElementById('get-a-quote').offsetHeight + footer.offsetHeight + header.offsetHeight) + 'px'
                } else footer.style.marginBottom = 0 + 'px'

                window.scrollTo(0,section.offsetTop)
                hamburger.click()
            }
        })
}

const changeImagePosition = () => {
    let imgArr = Array.from(document.querySelectorAll('.portfolio__gallery > img')),
         poped = imgArr.pop()
   
         imgArr.unshift(poped)

    document.querySelector('.portfolio__gallery').append(...imgArr) 
}

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
    if(slides[1].style.left !== pos) {
        setTimeout(() => {
            slides[1].remove();
            slides[1].style.left = pos;
            slider.append(slides[1]);
        },0)
    }
}

function loadTime(f, ms) {

    return function freeze() {

      if(Date.now() - freeze.lastCall < ms) return;
      else {
        f.apply(this, arguments)
        freeze.lastCall = Date.now()
      }
    }

    freeze.lastCall = 0
  }