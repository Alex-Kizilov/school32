const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const body = document.querySelector('body');

burger.addEventListener('click', (event) => {

	burger.classList.toggle('active');
	menu.classList.toggle('active');
	body.classList.toggle('lock');
});

menu.addEventListener('click', (event) => {
	menu.classList.remove('active');
	burger.classList.remove('active');
	body.classList.remove('lock');
});