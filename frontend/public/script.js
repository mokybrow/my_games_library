const menu = document.querySelector('.menu-body')
const menuBtn = document.querySelector('.menu-icon')

const body = document.body;

const mediaQuery = window.matchMedia('(min-width: 1000px)')

if (menu && menuBtn) {
    menuBtn.addEventListener('click', e => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })


    menu.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        })
    })

}

function handleTabletChange(e) {
    if (e.matches) {
        menu.classList.remove('active')
        menuBtn.classList.remove('active')
        body.classList.remove('lock')
    }
}

mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)