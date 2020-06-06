
//===PRELOAD==
const images = document.images;
const	imagesTotalCount = images.length;
let imagesLoadedCount = 0;
let percDisplay = document.querySelector('#load_perc');
const preloader = document.querySelector('#page-preloader');
const header = document.querySelector('.header');

for(let i = 0; i < imagesTotalCount; i++) {

	imageClone = new Image();
	imageClone.onload = imageLoaded;
	imageClone.onerror = imageLoaded;
	imageClone.src = images[i].src;
}


function imageLoaded() {
	imagesLoadedCount++;
	percDisplay.innerHTML = (((100 / imagesTotalCount) * imagesLoadedCount) << 0) + '%';

	if (imagesLoadedCount >= imagesTotalCount) {
		setTimeout(function() {
			if (!preloader.classList.contains('done')) {
				preloader.classList.add('done');
			}
		}, 1000);

	}
}
//===PRELOAD==

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;


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

function bodyLock () {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPaddingValue.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(() => {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, timeout);
}

const directorsRow = document.querySelector('.directors__row');
const imgClassOpen = document.querySelector('.open-img');

const openImg = (event) => {
	const directorItem = event.target.closest('.directors__row-item');

	if (directorItem) {
		const img = directorItem.querySelector('.directors__row-img');
		const openImage = document.querySelector('.open-img__image');

		if(img.src) {
			openImage.src = img.src;
			if (!imgClassOpen.classList.contains('open')) {
				imgClassOpen.classList.add('open');
			}
			bodyLock();
		}
	}
};

const closeImg = (e) => {
	if(!e.target.classList.contains('open-img__image')) {
		imgClassOpen.classList.remove('open');
		bodyUnLock();
	}
}

directorsRow.addEventListener('click', openImg);
imgClassOpen.addEventListener('click', closeImg);