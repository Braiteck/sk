$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Клиенты
	const clientsSliders = []

	$('.clients .swiper').each(function (i) {
		$(this).addClass('clients_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: 36,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 36,
					slidesPerView: 2
				},
				1024: {
					spaceBetween: 40,
					slidesPerView: 3
				},
				1280: {
					spaceBetween: 100,
					slidesPerView: 3
				}
			}
		}

		clientsSliders.push(new Swiper('.clients_s' + i, options))
	})


	// Услуги
	$('.services .service .details, .services .service .bar .back_btn').click(function (e) {
		e.preventDefault()

		$(this).closest('.service').toggleClass('active')
	})


	// Личный бренд
	$('.brand .item .details, .brand .item .bar .back_btn').click(function (e) {
		e.preventDefault()

		$(this).closest('.item').toggleClass('active')
	})


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				$('.overlay').fadeOut(200)
				$('body').removeClass('menu_open')
				$('.menu').removeClass('show')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Меню
	$('header .menu_btn, .menu .close_btn').click((e) => {
		e.preventDefault()

		$('body').toggleClass('menu_open')
		$('.menu').toggleClass('show')

		$('body').hasClass('menu_open')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Заявка
	let currentStep = 1

	$('.first_section .btn, .order .close_btn').click((e) => {
		e.preventDefault()

		$('body').toggleClass('menu_open no')
		$('.order').toggleClass('show')

		$('body').hasClass('menu_open')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Заявка - Шаг 1
	$('.order .step_info.step1 .val label').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.order .step_info')

		$('.order .steps .number[data-step="' + currentStep + '"]').removeClass('active').addClass('finished')

		currentStep += 1

		$('.order .steps .number[data-step="' + currentStep + '"]').addClass('active')

		$('.order .step_info.step1 .val input').prop('checked', false)
		$(this).find('input').prop('checked', true)

		parent.hide()
		$('.order .step_info.step' + currentStep).fadeIn(300)
	})


	// Заявка - Шаг 3
	$('.order .step_info.step3 .val label').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.order .step_info')

		$('.order .step_info.step3 .val input').prop('checked', false)
		$(this).find('input').prop('checked', true)

		$(this).closest('.line').hide()

		if ($(this).find('input').val() == 'phone') {
			$('.order .step_info.step3 .form .phone').fadeIn(300)
		}

		if ($(this).find('input').val() == 'email') {
			$('.order .step_info.step3 .form .email').fadeIn(300)
		}
	})


	// Заявка - Следующий
	$('.order .step_info .form .next_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.order .step_info')

		$('.order .steps .number[data-step="' + currentStep + '"]').removeClass('active').addClass('finished')

		currentStep += 1

		$('.order .steps .number[data-step="' + currentStep + '"]').addClass('active')

		parent.hide()
		$('.order .step_info.step' + currentStep).fadeIn(300)
	})


	$('.overlay').click((e) => {
		e.preventDefault()

		$('body').removeClass('menu_open')
		$('.menu, .order').removeClass('show')
		$('.overlay').fadeOut(200)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+ 7 999 999 99 99')


	// Выбор файла
	$('body').on('change', '.form input[type=file]', function (e) {
		$(this).closest('.file').find('label .path').text($(this).val())
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!firstResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			firstResize = true
		} else {
			firstResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})