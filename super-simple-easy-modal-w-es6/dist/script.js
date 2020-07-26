const buttons = document.querySelectorAll('.trigger[data-modal-trigger]');

for (let button of buttons) {
	modalEvent(button);
}

function modalEvent(button) {
	button.addEventListener('click', () => {
		const trigger = button.getAttribute('data-modal-trigger');
		const modal = document.querySelector(`[data-modal=${trigger}]`);
		const contentWrapper = modal.querySelector('.content-wrapper');
		const close = modal.querySelector('.close');

		close.addEventListener('click', () => modal.classList.remove('open'));
		modal.addEventListener('click', () => modal.classList.remove('open'));
		contentWrapper.addEventListener('click', (e) => e.stopPropagation());

		modal.classList.toggle('open');
	});
}







var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) { slideIndex = 1 }
	if (n < 1) { slideIndex = slides.length }
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}









var slideIndex2 = 1;
showSlides2(slideIndex2);

function plusSlides2(n) {
	showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
	showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
	var i;
	var slides2 = document.getElementsByClassName("mySlides2");
	if (n > slides2.length) { slideIndex2 = 1 }
	if (n < 1) { slideIndex2 = slides2.length }
	for (i = 0; i < slides2.length; i++) {
		slides2[i].style.display = "none";
	}
	slides2[slideIndex2 - 1].style.display = "block";
}






var slideIndex3 = 1;
showSlides3(slideIndex3);

function plusSlides3(n) {
	showSlides3(slideIndex3 += n);
}

function currentSlide3(n) {
	showSlides3(slideIndex3 = n);
}

function showSlides3(n) {
	var i;
	var slides3 = document.getElementsByClassName("mySlides3");
	if (n > slides3.length) { slideIndex3 = 1 }
	if (n < 1) { slideIndex3 = slides3.length }
	for (i = 0; i < slides3.length; i++) {
		slides3[i].style.display = "none";
	}
	slides3[slideIndex3 - 1].style.display = "block";
}