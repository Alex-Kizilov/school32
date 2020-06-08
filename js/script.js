
const body = document.querySelector('body');

//===PRELOAD==

const images = document.images;
const	imagesTotalCount = images.length;
let imagesLoadedCount = 0;
let percDisplay = document.querySelector('#load_perc');
const preloader = document.querySelector('#page-preloader');

for(let i = 0; i < imagesTotalCount; i++) {

	imageClone = new Image();
	imageClone.onload = imageLoaded;
	imageClone.onerror = imageLoaded;
	imageClone.src = images[i].src;
}


/*function imageLoaded () {
	imagesLoadedCount++;
	percDisplay.innerHTML = (((100 / imagesTotalCount) * imagesLoadedCount) << 0) + '%';
	body.classList.add('lock');

	if (imagesLoadedCount >= imagesTotalCount) {
		setTimeout(function() {
			if (!preloader.classList.contains('done')) {
				preloader.classList.add('done');
			}
			if (preloader.classList.contains('done')) {
				body.classList.remove('lock');

				const raw = localStorage.getItem('show');
				const show = JSON.parse(raw);
				show.show = false;
				console.log(show.show);
			}
		}, 1000);
	}
}
*/
function imageLoaded () {
	imagesLoadedCount++;
	percDisplay.innerHTML = (((100 / imagesTotalCount) * imagesLoadedCount) << 0) + '%';
	body.classList.add('lock');

	if (JSON.parse(localStorage.getItem('isLoader'))) {
		preloader.classList.add('done');
		document.querySelector('.preloader-2').style.transition = '0s';
		document.querySelector('.preloader-2').style.zIndex = '0';
		return;
	}
	localStorage.setItem('isLoader', true);

	if (imagesLoadedCount >= imagesTotalCount) {
		setTimeout(function() {
			if (!preloader.classList.contains('done')) {
				preloader.classList.add('done');
			}
			if (preloader.classList.contains('done')) {
				body.classList.remove('lock');

				const raw = localStorage.getItem('show');
				const show = JSON.parse(raw);
				show.show = false;
				console.log(show.show);
			}
		}, 1000);
	}
}
//===PRELOAD==

//===BURGER===

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const lockPadding = document.querySelectorAll('.lock-padding');
const cross = document.querySelector('.img__close');


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

//===BURGER===


let unlock = true;

const timeout = 800;

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

/*const directorsRow = document.querySelector('.directors__row');
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
*/

const directorsRow = document.querySelector('.directors__row');
const imgClassOpen = document.querySelector('.open-img');

const openImg = (event) => {
	const directorItem = event.target.closest('.directors__row-img');

	if (directorItem) {
		const openImage = document.querySelector('.open-img__image');

		if(directorItem.src) {
			openImage.src = directorItem.src;
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

const closeImgOnСross = (e) => {
	imgClassOpen.classList.remove('open');
	bodyUnLock();
	e.preventDefault();
}

directorsRow.addEventListener('click', openImg);
imgClassOpen.addEventListener('click', closeImg);
cross.addEventListener('click', closeImgOnСross);

(function() {
	//роверяем поддержку
	if (!Element.prototype.closest) {
		//реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	//проверяем поддержку
	if (!Element.prototype.matches) {
		//определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();