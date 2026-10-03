/**
 * Spirit Work — фронтенд без зависимостей.
 */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {

		/* Мобильное меню */
		var burger = document.getElementById('sw-burger');
		var nav = document.getElementById('sw-nav');

		if (burger && nav) {
			burger.addEventListener('click', function () {
				var open = nav.classList.toggle('sw-open');
				burger.classList.toggle('sw-open', open);
				burger.setAttribute('aria-expanded', open ? 'true' : 'false');
				document.body.style.overflow = open ? 'hidden' : '';
			});

			nav.addEventListener('click', function (e) {
				if (e.target.closest('a')) {
					nav.classList.remove('sw-open');
					burger.classList.remove('sw-open');
					burger.setAttribute('aria-expanded', 'false');
					document.body.style.overflow = '';
				}
			});

			document.addEventListener('keydown', function (e) {
				if ('Escape' === e.key && nav.classList.contains('sw-open')) {
					burger.click();
				}
			});
		}

		/* FAQ */
		document.querySelectorAll('.sw-faq__b').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var item = btn.closest('.sw-faq__i');
				var panel = item.querySelector('.sw-faq__p');
				var open = item.classList.toggle('sw-open');

				btn.setAttribute('aria-expanded', open ? 'true' : 'false');
				panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '';
			});
		});

		/* Появление блоков */
		var items = document.querySelectorAll('.sw-up');

		if (!('IntersectionObserver' in window)) {
			items.forEach(function (el) {
				el.classList.add('sw-in');
			});
			return;
		}

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('sw-in');
					io.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });

		items.forEach(function (el) {
			io.observe(el);
		});

		/* Активный пункт меню */
		var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
		var links = Array.prototype.slice.call(document.querySelectorAll('.sw-nav a[href*="#"]'));

		if (!sections.length || !links.length) {
			return;
		}

		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) {
					return;
				}

				links.forEach(function (link) {
					if (link.parentElement) {
						link.parentElement.classList.toggle('sw-on', link.hash === '#' + entry.target.id);
					}
				});
			});
		}, { rootMargin: '-45% 0px -50% 0px' });

		sections.forEach(function (section) {
			spy.observe(section);
		});
	});
})();
