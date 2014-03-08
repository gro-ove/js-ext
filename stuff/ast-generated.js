function __pe (c, p, t){                                                           // dispatcher.jsxi:45
	t = function (){};                                                             // ...
	t.prototype = p.prototype;                                                     // ...
	c.prototype = new t ();                                                        // ...
	c.prototype.constructor = c;                                                   // ...
}
function __ca (from, to, result){                                                  // preferencesWindow.jsxi:218
	if (typeof from === 'string')                                                  // ...
		from = from.charCodeAt (0);                                                // ...
	if (typeof to === 'string')                                                    // ...
		to = to.charCodeAt (0);                                                    // ...
	result = new Array (Math.abs (to - from) + 1);                                 // ...
	if (from < to)                                                                 // ...
		for (var i = 0; i < result.length; i ++)                                   // ...
			result[i] = i + from;                                                  // ...
	else
		for (var i = result.length - 1; i >= 0; i --)                              // ...
			result[i] = from - i;                                                  // ...
	return result;                                                                 // ...
}
function __bo (obj, name){                                                         // storage.jsxi:12
	if (!obj.hasOwnProperty ('__bt'))                                              // ...
		obj.__bt = {};                                                             // ...
	if (!obj.__bt.hasOwnProperty (name))                                           // ...
		obj.__bt[name] = obj[name].bind (obj);                                     // ...
	return obj.__bt[name];                                                         // ...
}
Number.prototype.postfix = function (){                                            // numbers.jsxi:1
	if (Math.round (this) != this)                                                 // numbers.jsxi:2
		return arguments[1];                                                       // numbers.jsxi:3
	return arguments[(this == Number.POSITIVE_INFINITY || this % 10 > 4 && this % 10 <= 9 || this % 10 == 0 || this % 100 > 10 && this % 100 < 20 ? 2 : this % 10 > 1 ? 1 : 0)];
};
Number.prototype.toLongString = function (g, r){                                   // numbers.jsxi:7
	var e = [ '', 'а', 'ов' ],                                                     // numbers.jsxi:8
		f = [
			{ s: 'тысяч', g: 2, e: [ 'а', 'и', '' ] },                             // numbers.jsxi:9
			'миллион',                                                             // numbers.jsxi:10
			'миллиард',                                                            // ...
			'триллион',                                                            // ...
			'квадриллион',                                                         // ...
			'квинтиллион',                                                         // ...
			'секстиллион',                                                         // ...
			'септиллион',                                                          // ...
			'октиллион',                                                           // ...
			'нониллион',                                                           // ...
			'дециллион',                                                           // ...
			'андециллион',                                                         // ...
			'дуодециллион',                                                        // ...
			'тредециллион',                                                        // ...
			'кваттордециллион',                                                    // ...
			'квиндециллион',                                                       // ...
			'сексдециллион',                                                       // ...
			'септемдециллион',                                                     // ...
			'октодециллион',                                                       // ...
			'новемдециллион',                                                      // ...
			'вигинтиллион',                                                        // ...
			'анвигинтиллион',                                                      // ...
			'дуовигинтиллион',                                                     // ...
			'тревигинтиллион',                                                     // ...
			'кватторвигинтиллион',                                                 // ...
			'квинвигинтиллион',                                                    // ...
			'сексвигинтиллион',                                                    // ...
			'септемвигинтиллион',                                                  // ...
			'октовигинтиллион',                                                    // ...
			'новемвигинтиллион',                                                   // ...
			'тригинтиллион',                                                       // ...
			'антригинтиллион'                                                      // ...
		];
	for (var i = f.length; i >= 0; i --){                                          // numbers.jsxi:12
		var n = Math.pow (1000, i + 1), c = f[i];                                  // numbers.jsxi:13
		if (n <= this){                                                            // numbers.jsxi:14
			if (!c)                                                                // numbers.jsxi:15
				return '<ОЧЕНЬ БОЛЬШОЕ ЧИСЛО>';                                    // ...
			var big = Math.round (this / n);                                       // numbers.jsxi:16
			return (big.toLongString (c.g) + ' ' + (c.s || c) + big.postfix ((c.e || e)[0], (c.e || e)[1], (c.e || e)[2]) + ' ' + (this % n).toLongString (g, true)).trim ();
		}
	}
	g = g || 0;                                                                    // numbers.jsxi:21
	var n = this | 0;                                                              // numbers.jsxi:22
	var d2 = [
			'',                                                                    // numbers.jsxi:23
			'сто',                                                                 // ...
			'двести',                                                              // ...
			'триста',                                                              // ...
			'четыреста',                                                           // ...
			'пятьсот',                                                             // ...
			'шестьсот',                                                            // ...
			'семьсот',                                                             // ...
			'восемьсот',                                                           // ...
			'девятьсот'                                                            // ...
		], 
		d1 = [
			'',                                                                    // numbers.jsxi:24
			'десять',                                                              // ...
			'двадцать',                                                            // ...
			'тридцать',                                                            // ...
			'сорок',                                                               // ...
			'пятьдесят',                                                           // ...
			'шестьдесят',                                                          // ...
			'семьдесят',                                                           // ...
			'восемьдесят',                                                         // ...
			'девяносто'                                                            // ...
		], 
		dd = [
			'один',                                                                // numbers.jsxi:25
			'две',                                                                 // ...
			'три',                                                                 // ...
			'четыр',                                                               // ...
			'пят',                                                                 // ...
			'шест',                                                                // ...
			'сем',                                                                 // ...
			'восем',                                                               // ...
			'девят'                                                                // ...
		];
	d0 = [
		'ноль',                                                                    // numbers.jsxi:26
		[ 'один', 'одно', 'одна' ][g],                                             // ...
		[ 'два', 'два', 'две' ][g],                                                // ...
		'три',                                                                     // ...
		'четыре',                                                                  // ...
		'пять',                                                                    // ...
		'шесть',                                                                   // ...
		'семь',                                                                    // ...
		'восемь',                                                                  // ...
		'девять'                                                                   // ...
	];
	if (n % 100 > 10 && n % 100 < 20)                                              // numbers.jsxi:27
		return (d2[(n / 100 | 0)] + ' ' + dd[(n % 100 - 11)] + 'надцать').trim ();
	return [
		d2[(n / 100 | 0)],                                                         // numbers.jsxi:28
		d1[(n % 100 / 10 | 0)],                                                    // ...
		n == 0 && !r || n % 10 != 0 ? d0[(n % 10)] : ''                            // ...
	].filter (function (a){                                                        // ...
		return a.length;                                                           // ...
	}).join (' ');                                                                 // ...
};
function nextTick (fn){                                                            // utils.jsxi:3
	return setTimeout (fn, 1);                                                     // utils.jsxi:4
}
$.extend ($.fn,                                                                    // zepto.jsxi:1
	{
		timeout: function (fn, ms){                                                // zepto.jsxi:2
			setTimeout (fn.bind (this), ms || 1);                                  // zepto.jsxi:3
			return this;                                                           // zepto.jsxi:4
		}, 
		draggable: function (right, bottom){                                       // zepto.jsxi:6
			function style (element, rule){                                        // zepto.jsxi:7
				if (document.defaultView && document.defaultView.getComputedStyle)
					return document.defaultView.getComputedStyle (element, '').getPropertyValue (rule);
				else if (element.currentStyle)                                     // zepto.jsxi:10
					return element.currentStyle[$.camelCase (rule)];               // zepto.jsxi:11
			}
			var xRule = right ? 'right' : 'left',                                  // zepto.jsxi:13
				yRule = bottom ? 'bottom' : 'top',                                 // zepto.jsxi:14
				moving;                                                            // zepto.jsxi:15
			$ (this).on ('mousedown', mousedown);                                  // zepto.jsxi:17
			return this;                                                           // zepto.jsxi:18
			function mousedown (event){                                            // zepto.jsxi:20
				if (event.which === 1 && (event.target.hasAttribute ('data-draggable') || $ (event.target).closest ('[data-draggable]').length)){
					var position = style (this, 'position');                       // zepto.jsxi:22
					if (position !== 'fixed' && position !== 'absolute')           // zepto.jsxi:24
						return;                                                    // zepto.jsxi:25
					event.preventDefault ();                                       // zepto.jsxi:27
					event.stopPropagation ();                                      // zepto.jsxi:28
					moving = {
						element: $ (this),                                         // zepto.jsxi:31
						beforeX: parseInt (this.style[xRule]),                     // zepto.jsxi:32
						beforeY: parseInt (this.style[yRule]),                     // zepto.jsxi:33
						fromX: event.pageX,                                        // zepto.jsxi:34
						fromY: event.pageY,                                        // zepto.jsxi:35
						noclick: false                                             // zepto.jsxi:36
					};
					$ (document).mousemove (mousemove).mouseup (mouseup);          // zepto.jsxi:41
					moving.element.click (click);                                  // zepto.jsxi:43
				}
			}
			function mousemove (event){                                            // zepto.jsxi:46
				var dx = (event.pageX - moving.fromX) * (right ? - 1 : 1),         // zepto.jsxi:47
					dy = (event.pageY - moving.fromY) * (bottom ? - 1 : 1);        // zepto.jsxi:48
				if (Math.abs (dx) > 5 || Math.abs (dy) > 5)                        // zepto.jsxi:50
					moving.noclick = true;                                         // zepto.jsxi:51
				moving.element.css (xRule, moving.beforeX + dx).css (yRule, moving.beforeY + dy);
			}
			function mouseup (){                                                   // zepto.jsxi:58
				$ (document).off ('mousemove', mousemove).off ('mouseup', mouseup);
				nextTick (function (arg){                                          // zepto.jsxi:62
					moving.element.off ('click', click);                           // zepto.jsxi:63
					moving = null;                                                 // zepto.jsxi:64
				});
			}
			function click (event){                                                // zepto.jsxi:68
				if (moving.noclick){                                               // zepto.jsxi:69
					event.preventDefault ();                                       // zepto.jsxi:70
					event.stopPropagation ();                                      // zepto.jsxi:71
				}
			}
		}, 
		findId: function (id){                                                     // zepto.jsxi:74
			return $ (this).find ('[data-id=\"' + id + '\"]');                     // zepto.jsxi:75
		}
	});
if (!window.Mustache)                                                              // default.jsx:37
	window.Mustache = {};
Mustache.footer = function (){                                                     // default.jsx:38
	return '<div><div data-element=sections-list></div><center><a href=\"#\">Вверх</a></center><div data-element=status></div><div class=ponyaba-bottom><a href=\"/\">Поняба</a></div><a name=bottom></a></div>';
};
Mustache.staticContent = function (){                                              // default.jsx:39
	return '<div class=static-content><div data-id=content></div></div>';          // ...
};
Mustache.messageHost = function (){                                                // default.jsx:40
	return '<div class=message-host></div>';                                       // ...
};
Mustache.messageLoading = function (){                                             // default.jsx:41
	return '<div class=message><div class=\"reply popup\"><div class=loading></div></div></div>';
};
Mustache.panel = function (){                                                      // default.jsx:42
	return '<div data-id=panel class=panel><span data-button=logo class=\"panel-icon icon-logo\" title=\"Зафиксировать пост в раскрытом состоянии\"></span><span data-id=buttons class=panel-buttons></span></div>';
};
Mustache.panelIndex = function (){                                                 // default.jsx:43
	return '<span><a data-button=preferences class=\"panel-icon icon-preferences\" title=\"Настройки\" href=\"#\"></a></span><span><a data-button=hiddens class=\"panel-icon icon-hidden\" title=\"Скрытое\" href=\"#\"></a></span><span><a data-button=favorites class=\"panel-icon icon-favorites\" title=\"Избранное\" href=\"#\"></a></span><span><a data-button=refresh class=\"panel-icon icon-refresh\" title=\"Обновить\" href=\"#\"></a></span>';
};
Mustache.postPopupHost = function (){                                              // default.jsx:44
	return '<div class=popup-host></div>';                                         // ...
};
Mustache.postLoading = function (){                                                // default.jsx:45
	return '<div class=post><div class=reply><div class=loading></div></div></div>';
};
Mustache.postNotFound = function (){                                               // default.jsx:46
	return '<div class=reply><blockquote><p class=post-error>Пост не найден (возможно, он удалён)</p></blockquote></div>';
};
Mustache.abstractPageLoading = function (){                                        // default.jsx:47
	return '<div class=\"loading center\"></div>';                                 // ...
};
Mustache.abstractPageDefaultError = function (){                                   // default.jsx:48
	return 'Ой  Увы, при загрузке произошла ошибка. Проверьте соединение с интернетом и попробуйте обновить страницу.';
};
Mustache.abstractPagePreprocessingFailed = function (){                            // default.jsx:49
	return 'Упс!  При обработке данных возникла ошибка.';                          // ...
};
Mustache.abstractPageUnsupported = function (){                                    // default.jsx:50
	return 'ಠ_ಠ  Сервер ответил чем-то загадочным.';                               // ...
};
Mustache.abstractPageEverythingIsBad = function (){                                // default.jsx:51
	return ':(  Серверу плохо. Остаётся надеяться, что временно.';                 // ...
};
Mustache.abstractPageNotFound = function (){                                       // default.jsx:52
	return 'Хм...  Ничего не найдено. Проверьте пути, по которым зашли сюда, но если вы уверены, что тут что-то должно быть, свяжитесь с кем-нибудь из администраторов.';
};
Mustache.abstractPageVersionsMismatch = function (){                               // default.jsx:53
	return 'ʕ•ᴥ•ʔ  Вероятнее всего, сервер обновился. Перезагрузите страницу, чтобы перейти на обновлённую версию интерфейса.';
};
Mustache.authorizePageExit = function (){                                          // default.jsx:54
	return '<div class=success><p class=success-icon> Вы вышли из системы </p></div>';
};
Mustache.hiddensWindowClass = function (){                                         // default.jsx:55
	return 'hiddens';                                                              // ...
};
Mustache.hiddensWindowCaption = function (){                                       // default.jsx:56
	return '<span>Скрытое</span>';                                                 // ...
};
Mustache.hiddensWindowBar = function (){                                           // default.jsx:57
	return '<div class=\"reply window-tab-back\" data-button=tab:posts><div class=window-tab>Посты на странице</div></div><div class=\"reply window-tab-back\" data-button=tab:threads><div class=window-tab>Треды</div></div>';
};
Mustache.hiddensWindowFooter = function (){                                        // default.jsx:58
	return '<input type=button data-button=unhide-all value=\"Разблокировать всё\"><input type=button data-button=unhide-selected value=\"Разблокировать выбранное\">';
};
Mustache.favoritesWindowClass = function (){                                       // default.jsx:59
	return 'favorites';                                                            // ...
};
Mustache.favoritesWindowCaption = function (){                                     // default.jsx:60
	return '<span>Избранное</span>';                                               // ...
};
Mustache.favoritesWindowFooter = function (){                                      // default.jsx:61
	return '<input type=button data-button=remove-selected title=\"Удалить отмеченное из избранного\" value=\"Удалить\">';
};
Mustache.preferencesWindowClass = function (){                                     // default.jsx:62
	return 'preferences';                                                          // ...
};
Mustache.preferencesWindowCaption = function (){                                   // default.jsx:63
	return '<span>Настройки</span>';                                               // ...
};
Mustache.preferencesWindowBar = function (){                                       // default.jsx:64
	return '<div class=\"reply window-tab-back\" data-button=tab:filters><div class=window-tab>Фильтры</div></div><div class=\"reply window-tab-back\" data-button=tab:posts><div class=window-tab>Сообщения</div></div><div class=\"reply window-tab-back\" data-button=tab:images><div class=window-tab>Картинки</div></div><div class=\"reply window-tab-back\" data-button=tab:links><div class=window-tab>Ссылки</div></div><div class=\"reply window-tab-back\" data-button=tab:form><div class=window-tab>Форма</div></div><div class=\"reply window-tab-back\" data-button=tab:common><div class=window-tab>Общее</div></div><div class=\"reply window-tab-back\" data-button=tab:keyboard><div class=\"window-tab window-tab-multiline\">Клавиатурные<br>сокращения</div></div><div class=\"reply window-tab-back\" data-button=tab:info><div class=window-tab>Статистика</div></div>';
};
Mustache.preferencesWindowFooter = function (){                                    // default.jsx:65
	return '<input type=button value=\"Сброс\" data-button=preferences-reset title=\"Сбросить настройки\">';
};
Mustache.preferencesWindowFilters = function (){                                   // default.jsx:66
	return '<div wip class=preferences-links> [ <a href=\"http://javascript.ru/tutorial/foundation\" class=preferences-link target=\"_blank\">Справка</a> ] </div><label wip class=block><input data-setting=filter-by-names type=checkbox> Фильтры по именам: </label><div wip class=preferences-textarea><div class=preferences-textarea-rows></div><textarea data-setting=filtered-names class=preferences-textarea-input wrap=off></textarea></div><label wip class=block><input data-setting=filter-by-posts type=checkbox> Фильтры по содержимому постов: </label><div wip class=preferences-textarea><div class=preferences-textarea-rows></div><textarea data-setting=filtered-posts class=preferences-textarea-input wrap=off></textarea></div><label wip class=block><input data-setting=hide-button-menu type=checkbox> Дополнительное меню кнопок скрытия </label><label wip class=block><input data-setting=hide-answers type=checkbox> Скрывать ответы на скрытые сообщения </label><label wip class=block><input data-setting=hide-hidden type=checkbox> Прятать скрытые сообщения </label>';
};
Mustache.preferencesWindowPosts = function (){                                     // default.jsx:67
	return '<label title=\"Ускорит отрисовку, но браузер может подвисать\" class=block><input data-setting=all-posts-at-a-time type=checkbox> При отрисовке выводить одновременно все посты треда </label><span><label><input data-setting=autoupdate type=checkbox> Автообновление </label><label title=\"Введите число больше пяти и меньше девяти тысяч девятисот девяноста девяти\"><input data-setting=autoupdate-interval type=text size=4 pattern=\"0*([1-9]\\d{1,3}|[5-9])\"> (сек.) </label></span><div class=preferences-depend><label wip class=block><input data-setting=autoupdate-errors-in-title type=checkbox> Показывать номер ошибки в заголовке </label><label class=block><input data-setting=autoupdate-favicon-blink type=checkbox> Использовать иконку для оповещения о новых сообщениях </label><label class=block><input data-setting=autoupdate-mark-new type=checkbox> Выделять новые сообщения при переключении на тред </label><label class=block><input data-setting=autoupdate-desktop-notifications data-required=Notification type=checkbox> Показывать уведомления на рабочем столе </label></div><label class=block><input data-setting=text-spoilers-open type=checkbox> Открывать текстовые спойлеры </label><label class=block><input data-setting=hide-names type=checkbox> Скрывать имена </label>';
};
Mustache.preferencesWindowImages = function (){                                    // default.jsx:68
	return '<label class=block> После клика по изображению <select data-setting=expand-type><option value=\"\">Открыть в новой вкладке</option><option value=center>Открыть по центру</option><option value=expand>Развернуть в сообщении</option></select></label><div class=preferences-depend><label><input data-setting=resize-images type=checkbox> Уменьшать большие изображения до размера экрана </label></div><!--label class=block><input data-setting=\"preLoadImgs\" type=checkbox>Предварительно загружать изображения </label><div class=preferences-depend><label class=block><input data-setting=\"findImgFile\" type=checkbox disabled=\"\"> Распознавать встроенные файлы в изображениях </label></div--><label class=block><input data-setting=use-full-images type=checkbox> Загружать полные изображения вместо превьюшек </label><div class=preferences-depend><label><input data-setting=use-full-gifs type=checkbox> Только для gif-изображений </label></div><label class=block><input data-setting=search-buttons type=checkbox> Добавлять кнопки для поиска изображений </label>';
};
Mustache.preferencesWindowLinks = function (){                                     // default.jsx:69
	return '<label class=block> Всплывающие сообщения для ссылок <select data-setting=popup-posts><option value=\"\">Отключены</option><option value=on>Включены</option><option value=refmap>С ответами</option></select></label><div class=preferences-depend><div><input class=first data-setting=popup-posts-in type=text size=6 pattern=\"\\d{1,6}\"> Задержка появления (мс.) </div><div><input class=first data-setting=popup-posts-out type=text size=6 pattern=\"\\d{1,6}\"> Задержка пропадания (мс.) </div><!--label wip class=block><input data-setting=popup-posts-mark-viewed type=checkbox> Отмечать просмотренные сообщения </label--><label class=block><input data-setting=popup-posts-ignore-hidden type=checkbox> Выключить для скрытых постов </label></div><label class=block><input data-setting=links-strike-hidden type=checkbox> Зачеркивать ссылки на скрытые сообщения </label><label class=block><input data-setting=links-insert type=checkbox> Вставлять ссылку на сообщение при клике по его номеру </label><label class=block><input data-setting=links-detect type=checkbox> Автоматически искать ссылки на другие сообщения </label><label class=block title=\"Осторожнее: пока опция включена, любой может узнать ваш IP-адрес и не только!\"><input data-setting=links-audio-detect type=checkbox> Добавлять плейер к ссылкам на аудиофайлы </label><label class=block><input data-setting=links-image-detect type=checkbox> Добавлять превьюшки к ссылкам на изображения </label><label class=block><input data-setting=links-embed-detect type=checkbox> Загружать названия и превьюшки к ссылкам на YouTube и прочим </label><div class=preferences-depend><label class=block><select class=first data-setting=embed-size><option value=\"\">144p</option><option value=240>240p</option><option value=360>360p</option><option value=480>480p</option><option value=det>360×270 (DET)</option></select> Размер </label><label class=block><input data-setting=embed-player type=checkbox> После клика по превьюшке заменять её на плеер </label></div>';
};
Mustache.preferencesWindowForm = function (){                                      // default.jsx:70
	return '<!--label class=block><input data-setting=\"postSameImg\" type=checkbox> Возможность отправки одинаковых изображений </label--><label class=block> Форма ответа в треде <select data-setting=form-position><option value=top data-disable-next=true>Сверху</option><option value=bottom data-disable-next=true>Внизу</option><option value=hidden>Скрытая</option><option value=popup>Отдельная</option></select></label><div class=preferences-depend><label><input data-setting=hide-reply type=checkbox> Спрятать кнопки «Ответить» и «Создать тред» </label></div><label class=block title=\"Аккуратней, эта штука ещё сыровата!\"><input data-setting=form-remove-exif type=checkbox> Удалять EXIF из отправляемых jpeg-изображений </label><label class=block><input data-setting=form-hide-filename type=checkbox> Скрывать имя у отправляемых файлов </label><label class=block><input data-setting=scroll-after-send type=checkbox> После отправки прокручивать страницу в конец </label><label wip class=block><input data-setting=highlight-sended type=checkbox> Подсвечивать отправленные сообщения </label><label class=block><input data-setting=form-add-to-favotites type=checkbox> При ответе добавлять тред в избранное </label><label class=block><input data-setting=sage-button-enabled type=checkbox> Сажа вместо почтового адреса </label><div class=preferences-depend><input data-setting=sage-button-save type=checkbox> Запоминать сажу </div><label class=block><input data-setting=detect-tripcode type=checkbox> Предупреждать, если трип-код окажется в поле «Тема» </label><label wip class=block> Язык ввода каптчи <select data-setting=captcha-language><option value=\"\">Не менять</option><option value=english>Английский</option><option value=russian>Русский</option></select></label><label> Кнопки форматирования текста <select data-setting=form-formatting-buttons><option value=\"\">Отключить</option><option value=simple>Упрощённые</option><option value=default>Стандартные</option></select></label><div class=preferences-depend><label><input data-setting=form-formatting-buttons-at-bottom type=checkbox> Переместить кнопки форматирования вниз </label></div><div><input class=preferences-depend-near data-setting=form-fixed-name type=text size=20><label><input data-setting=form-fixed-name-enabled type=checkbox> Постоянное имя </label></div><div><input class=preferences-depend-near data-setting=form-signature type=text size=20><label><input data-setting=form-signature-enabled type=checkbox> Постоянная подпись </label></div>';
};
Mustache.preferencesWindowCommon = function (){                                    // default.jsx:71
	return '<label class=block> Стиль <select data-custom-setting=theme disabled=true><option value=photon>Загрузка...</option></select></label><label class=block><input data-setting=panel-attach type=checkbox> Прикрепить главную панель </label><label class=block><input data-setting=panel-information type=checkbox> Счетчик постов и изображений на главной панели </label><label class=block><input data-setting=old-style-title type=checkbox> Заголовки вкладок в стиле DET </label><label class=block><input data-setting=animation type=checkbox> Включить анимацию </label><label class=block><input data-setting=debug-mode type=checkbox> Отладочный режим </label>';
};
Mustache.preferencesWindowKeyboard = function (){                                  // default.jsx:72
	return '<label class=block><input data-setting=keyboard-shortcuts type=checkbox> Включить клавиатурные сокращения </label><div wip class=preferences-depend><label class=block><input class=input-key type=text size=26 value=\"Ctrl + ←\"> Предыдущая страница </label><label class=block><input class=input-key type=text size=26 value=\"Ctrl + →\"> Следующая страница </label><label class=block><input class=input-key type=text size=26 value=\"H\"> Скрыть текущий пост/тред </label><label class=block><input class=input-key type=text size=26 value=\"R\"> Быстрый ответ (или создать тред) </label><label class=block><input class=input-key type=text size=26 value=\"Ctrl + Enter\"> Отправить сообщение </label><label class=block><input class=input-key type=text size=26 value=\"J\"> Следующий тред (в разделе) </label><label class=block><input class=input-key type=text size=26 value=\"K\"> Предыдущий тред (в разделе) </label><label class=block><input class=input-key type=text size=26 value=\"N\"> Следующее сообщение </label><label class=block><input class=input-key type=text size=26 value=\"M\"> Предыдущее сообщение </label><label class=block><input class=input-key type=text size=26 value=\"V\"> Открыть тред </label><label class=block><input class=input-key type=text size=26 value=\"Alt + S\"> Настройки </label><label class=block><input class=input-key type=text size=26 value=\"Alt + F\"> Избранное </label><label class=block><input class=input-key type=text size=26 value=\"Alt + H\"> Скрытые сообщения </label><label class=block><input class=input-key type=text size=26 value=\"P\"> Панель </label><label class=block><input class=input-key type=text size=26 value=\"B\"> Маскировка изображений </label><label class=block><input class=input-key type=text size=26 value=\"U\"> Обновить тред </label><label class=block><input class=input-key type=text size=26 value=\"I\"> Раскрыть изображение текущего поста </label><label class=block><input class=input-key type=text size=26 value=\"Alt + B\"> Жирный </label><label class=block><input class=input-key type=text size=26 value=\"Alt + I\"> Курсив </label><label class=block><input class=input-key type=text size=26 value=\"Alt + T\"> Зачеркнутый </label><label class=block><input class=input-key type=text size=26 value=\"Alt + P\"> Спойлер </label><label class=block><input class=input-key type=text size=26 value=\"Alt + C\"> Код </label></div>';
};
(function (){                                                                      // default.jsx:74
	var entityMap = {
			'&': '&amp;',                                                          // default.jsx:75
			'<': '&lt;',                                                           // ...
			'>': '&gt;',                                                           // ...
			'\"': '&quot;',                                                        // ...
			'\'': '&#39;',                                                         // ...
			'/': '&#x2F;'                                                          // ...
		}, 
		escapeRegExp = new RegExp ('[&<>\"\'\\/]', 'g'),                           // default.jsx:76
		contexts = new Array (32),                                                 // default.jsx:77
		contextsSize,                                                              // default.jsx:78
		pos,                                                                       // default.jsx:79
		size;                                                                      // default.jsx:80
	function sub (key, fn){                                                        // default.jsx:82
		var target = get (key, true), result, current;                             // default.jsx:85
		if (target !== null && target !== undefined && target !== false){          // default.jsx:87
			current = contextsSize;                                                // default.jsx:88
			contextsSize ++;                                                       // default.jsx:89
			if (target instanceof Array){                                          // default.jsx:91
				result = '';                                                       // default.jsx:92
				for (var i = 0, n = target.length; i < n; i ++){                   // default.jsx:94
					pos = i;                                                       // default.jsx:95
					size = n;                                                      // default.jsx:96
					contexts[current] = target[i];                                 // default.jsx:98
					result += typeof fn === 'string' ? fn : fn ();                 // default.jsx:99
				}
			} else {
				contexts[current] = target;                                        // default.jsx:102
				result = typeof fn === 'string' ? fn : fn ();                      // default.jsx:103
			}
			contextsSize --;                                                       // default.jsx:106
			return result;                                                         // default.jsx:107
		} else
			return '';                                                             // default.jsx:109
	}
	function empty (value, extended){                                              // default.jsx:112
		return value === undefined || value === null || extended && (value === false || value instanceof Array && value.length === 0);
	}
	function string (value, raw){                                                  // default.jsx:115
		return raw ? value : empty (value) ? '' : String (value);                  // default.jsx:116
	}
	function yes (key, fn, other){                                                 // default.jsx:118
		var temp = get (key, true);                                                // default.jsx:119
		if (!empty (temp, true))                                                   // default.jsx:120
			return fn ? typeof fn === 'string' ? fn : fn () : '';                  // default.jsx:121
		else
			return other ? typeof other === 'string' ? other : other () : '';      // default.jsx:123
	}
	function no (key, fn, other){                                                  // default.jsx:126
		return yes (key, other, fn);                                               // default.jsx:127
	}
	function get (key, raw){                                                       // default.jsx:129
		if (key[0] === '%')                                                        // default.jsx:130
			switch (key){                                                          // default.jsx:131
				case '%first':                                                     // default.jsx:132
					return string (pos === 0, raw);                                // default.jsx:133
				case '%second':                                                    // default.jsx:134
					return string (pos > 0, raw);                                  // default.jsx:135
				case '%last':                                                      // default.jsx:136
					return string (pos === size - 1, raw);                         // default.jsx:137
			}
		if (key instanceof Array){                                                 // default.jsx:140
			var temp = get (key[0], true);                                         // default.jsx:141
			for (var i = 1; i < key.length && temp; i ++)                          // default.jsx:142
				temp = temp[key[i]];                                               // default.jsx:143
			return string (temp, raw);                                             // default.jsx:144
		} else if (key === '.'){                                                   // default.jsx:145
			return string (contexts[(contextsSize - 1)], raw);                     // default.jsx:146
		} else {
			for (var i = contextsSize - 1; i >= 0; i --)                           // default.jsx:148
				if (contexts[i] && contexts[i][key] !== undefined)                 // default.jsx:149
					return string (contexts[i][key], raw);                         // default.jsx:150
			return raw ? undefined : '';                                           // default.jsx:151
		}
	}
	function html (key){                                                           // default.jsx:155
		return get (key).replace (escapeRegExp,                                    // default.jsx:156
			function (arg){                                                        // ...
				return entityMap[arg];                                             // ...
			});
	}
	Mustache.header = function (){                                                 // default.jsx:157
		contextsSize = 0;                                                          // default.jsx:158
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:159
			if (arguments[i] !== undefined){                                       // default.jsx:160
				contexts[contextsSize] = arguments[i];                             // default.jsx:161
				contextsSize ++;                                                   // default.jsx:162
			}
		return '<div class=header><div data-element=sections-list></div><div class=header-content data-id=content>' + get ('title') + '</div><hr></div>';
	};
	Mustache.headerContent = function (){                                          // default.jsx:166
		contextsSize = 0;                                                          // default.jsx:167
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:168
			if (arguments[i] !== undefined){                                       // default.jsx:169
				contexts[contextsSize] = arguments[i];                             // default.jsx:170
				contextsSize ++;                                                   // default.jsx:171
			}
		return '<a href=\"' + get ('url') + '\">' + get ('description') + '</a>' + yes ('logo',
			function (){                                                           // default.jsx:173
				return '<center class=header-logo><img src=\"' + get ('logo') + '\"></center>';
			}, 
			'<div class=header-margin></div>');                                    // ...
	};
	Mustache.postsList = function (){                                              // default.jsx:175
		contextsSize = 0;                                                          // default.jsx:176
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:177
			if (arguments[i] !== undefined){                                       // default.jsx:178
				contexts[contextsSize] = arguments[i];                             // default.jsx:179
				contextsSize ++;                                                   // default.jsx:180
			}
		return '<div class=reply-block><div> [<a href=\"#\" data-button=reply data-reply-mode=send-post>Ответить</a>] </div><hr></div><div>' + get ('posts') + '</div><div class=reply-block><div> [<a href=\"#\" data-button=reply data-reply-mode=send-post>Ответить</a>] </div><hr></div>';
	};
	Mustache.sectionsList = function (){                                           // default.jsx:184
		contextsSize = 0;                                                          // default.jsx:185
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:186
			if (arguments[i] !== undefined){                                       // default.jsx:187
				contexts[contextsSize] = arguments[i];                             // default.jsx:188
				contextsSize ++;                                                   // default.jsx:189
			}
		return '<div>' + sub ('error',                                             // default.jsx:191
			function (){                                                           // ...
				return ' [ <a href=\"#\" data-message-type=error data-message=\"' + html ('error') + '\">Ошибка при загрузке</a> ] ';
			}) + no ('error',                                                      // ...
			function (){                                                           // ...
				return sub ('menu',                                                // ...
					function (){                                                   // ...
						return ' [ ' + sub ('.',                                   // ...
							function (){                                           // ...
								return yes ('%second', ' / ') + '<a href=\"' + html ('url') + '\" title=\"' + html ('description') + '\" ' + yes ('target',
									function (){                                   // ...
										return ' target=\"' + get ('target') + '\"';
									}) + yes ('ghost', ' data-menu=add-custom-section') + yes ('custom', ' data-menu=remove-custom-section') + ' >' + get ('name') + '</a>';
							}) + ' ] ';                                            // ...
					}) + no ('menu', ' [ <div class=loading></div> ] ');           // ...
			}) + '</div>';                                                         // ...
	};
	Mustache.status = function (){                                                 // default.jsx:193
		contextsSize = 0;                                                          // default.jsx:194
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:195
			if (arguments[i] !== undefined){                                       // default.jsx:196
				contexts[contextsSize] = arguments[i];                             // default.jsx:197
				contextsSize ++;                                                   // default.jsx:198
			}
		return '<div class=status>' + no ('online',                                // default.jsx:200
			'<center>Скорость /b/: <div class=loading></div></center><center>На сайте: <div class=loading></div></center>') + sub ('online',
			function (){                                                           // ...
				return '<center>Скорость /b/: ' + html ('speed') + ' пост' + html ('speedPostfix') + ' в час</center><center>На сайте: ' + html ('online') + ' пони</center>';
			}) + '</div>';                                                         // ...
	};
	Mustache.threadsList = function (){                                            // default.jsx:202
		contextsSize = 0;                                                          // default.jsx:203
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:204
			if (arguments[i] !== undefined){                                       // default.jsx:205
				contexts[contextsSize] = arguments[i];                             // default.jsx:206
				contextsSize ++;                                                   // default.jsx:207
			}
		return '<div class=create-thread><div> [<a href=\"#\" data-button=reply data-reply-mode=create-thread>Создать тред</a>] </div><hr></div><div>' + get ('threads') + '</div>' + sub ('pages',
			function (){                                                           // default.jsx:209
				return '<div class=pages>' + sub ('previousPage',                  // ...
					function (){                                                   // ...
						return '<a href=\"/' + html ('section') + '/' + html ('previousPage') + '.html\">Назад</a>';
					}) + no ('previousPage', '<span>Назад</span>') + sub ('pages',
					function (){                                                   // ...
						return sub ('current',                                     // ...
							function (){                                           // ...
								return ' [<span>' + html ('number') + '</span>] ';
							}) + no ('current',                                    // ...
							function (){                                           // ...
								return '[<a href=\"/' + html ('section') + '/' + html ('number') + '.html\">' + html ('number') + '</a>]';
							});
					}) + sub ('nextPage',                                          // ...
					function (){                                                   // ...
						return '<a href=\"/' + html ('section') + '/' + html ('nextPage') + '.html\">Вперёд</a>';
					}) + no ('nextPage', '<span>Вперёд</span>') + '</div>';        // ...
			});
	};
	Mustache.embedYoutube = function (){                                           // default.jsx:211
		contextsSize = 0;                                                          // default.jsx:212
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:213
			if (arguments[i] !== undefined){                                       // default.jsx:214
				contexts[contextsSize] = arguments[i];                             // default.jsx:215
				contextsSize ++;                                                   // default.jsx:216
			}
		return '<div class=embed data-value=\"' + get ('href') + '\"><a data-button=\"embed-player:youtube:' + get ('id') + '\" href=\"' + get ('href') + '\" target=\"_blank\"><div class=embed-thumbinal style=\"background-image:url(//img.youtube.com/vi/' + get ('id') + '/hqdefault.jpg)\"></div></a></div>';
	};
	Mustache.embedYoutubePlayer = function (){                                     // default.jsx:220
		contextsSize = 0;                                                          // default.jsx:221
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:222
			if (arguments[i] !== undefined){                                       // default.jsx:223
				contexts[contextsSize] = arguments[i];                             // default.jsx:224
				contextsSize ++;                                                   // default.jsx:225
			}
		return '<iframe src=\"//www.youtube.com/embed/' + get ('id') + '?autoplay=1\" frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	};
	Mustache.embedVimeo = function (){                                             // default.jsx:229
		contextsSize = 0;                                                          // default.jsx:230
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:231
			if (arguments[i] !== undefined){                                       // default.jsx:232
				contexts[contextsSize] = arguments[i];                             // default.jsx:233
				contextsSize ++;                                                   // default.jsx:234
			}
		return '<div class=embed data-value=\"' + get ('href') + '\"><a data-button=\"embed-player:vimeo:' + get ('id') + '\" href=\"' + get ('href') + '\" target=\"_blank\"><div class=embed-thumbinal data-embed=vimeo-thumbinal data-embed-param=\"' + get ('id') + '\"></div></a></div>';
	};
	Mustache.embedVimeoPlayer = function (){                                       // default.jsx:238
		contextsSize = 0;                                                          // default.jsx:239
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:240
			if (arguments[i] !== undefined){                                       // default.jsx:241
				contexts[contextsSize] = arguments[i];                             // default.jsx:242
				contextsSize ++;                                                   // default.jsx:243
			}
		return '<iframe src=\"//player.vimeo.com/video/' + get ('id') + '?autoplay=1\" frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	};
	Mustache.embedCoub = function (){                                              // default.jsx:247
		contextsSize = 0;                                                          // default.jsx:248
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:249
			if (arguments[i] !== undefined){                                       // default.jsx:250
				contexts[contextsSize] = arguments[i];                             // default.jsx:251
				contextsSize ++;                                                   // default.jsx:252
			}
		return '<div class=embed data-value=\"' + get ('href') + '\"><a data-button=\"embed-player:coub:' + get ('id') + '\" href=\"' + get ('href') + '\" target=\"_blank\"><div class=embed-thumbinal data-embed=coub-thumbinal data-embed-param=\"' + get ('id') + '\"></div></a></div>';
	};
	Mustache.embedCoubPlayer = function (){                                        // default.jsx:256
		contextsSize = 0;                                                          // default.jsx:257
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:258
			if (arguments[i] !== undefined){                                       // default.jsx:259
				contexts[contextsSize] = arguments[i];                             // default.jsx:260
				contextsSize ++;                                                   // default.jsx:261
			}
		return '<iframe src=\"//coub.com/embed/' + get ('id') + '?autostart=true\" frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	};
	Mustache.menu = function (){                                                   // default.jsx:265
		contextsSize = 0;                                                          // default.jsx:266
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:267
			if (arguments[i] !== undefined){                                       // default.jsx:268
				contexts[contextsSize] = arguments[i];                             // default.jsx:269
				contextsSize ++;                                                   // default.jsx:270
			}
		return '<div class=\"popup-menu fading reply popup\" ' + yes ('param',     // default.jsx:272
			function (){                                                           // ...
				return ' data-param=\"' + get ('param') + '\"';                    // ...
			}) + yes ('context',                                                   // ...
			function (){                                                           // ...
				return ' data-context=\"' + get ('context') + '\"';                // ...
			}) + '>' + sub ('menu',                                                // ...
			function (){                                                           // ...
				return '<div class=popup-menu-item data-button=\"' + html ('action') + '\">' + yes ('icon',
					function (){                                                   // ...
						return '<span class=popup-menu-item-icon style=\"background-image:url(' + get ('icon') + ')\"></span>';
					}) + get ('label') + '</div>';                                 // ...
			}) + '</div>';                                                         // ...
	};
	Mustache.form = function (){                                                   // default.jsx:274
		contextsSize = 0;                                                          // default.jsx:275
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:276
			if (arguments[i] !== undefined){                                       // default.jsx:277
				contexts[contextsSize] = arguments[i];                             // default.jsx:278
				contextsSize ++;                                                   // default.jsx:279
			}
		return '<div class=\"form reply fading\" data-id=form><table class=postform><tr class=form-popup-only data-draggable><td class=postblock></td><td><span data-button=form-close class=form-close>×</span></td></tr><tr><td class=postblock>Имя</td><td><input type=text data-id=name size=30 maxlength=75>  <span class=sage-button data-id=sage><span class=state-off>(no sage)</span><span class=state-on><span data-icon=sage></span>SAGE</span></span></td></tr><tr class=email-field><td class=postblock>E-mail</td><td><input type=text data-id=email size=30 maxlength=75></td></tr><tr><td class=postblock>Тема</td><td><input type=text data-id=subject size=30 maxlength=75>  <input type=submit data-id=submit value=\"Ответ\"><span data-id=style class=style>' + get ('buttons') + '</span></td></tr><tr><td class=postblock>Пост</td><td><textarea data-id=message cols=60 rows=7></textarea></td></tr><tr><td class=postblock>Подтверждение</td><td><div>Вам не нужно вводить капчу.</div></td></tr><tr><td class=postblock>Файл</td><td><form data-id=file-form><input class=hidden-file-input type=file data-id=file-input ><button class=file-button>Выберите файл</button>  <span class=file-name data-id=file-name></span>  <span data-id=file-info><output data-id=file-details></output>  <button data-id=file-clear>Очистить</button>  <!--select data-id=file-spolier><option value=\"\"></option><option value=\"10\">Спойлер</option><option value=\"9\">Хитрота</option></select-->  <span class=error data-id=file-error></span></span></form></td></tr></table></div>';
	};
	Mustache.formButtonsSimple = function (){                                      // default.jsx:283
		contextsSize = 0;                                                          // default.jsx:284
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:285
			if (arguments[i] !== undefined){                                       // default.jsx:286
				contexts[contextsSize] = arguments[i];                             // default.jsx:287
				contextsSize ++;                                                   // default.jsx:288
			}
		return '[ ' + sub ('.',                                                    // default.jsx:290
			function (){                                                           // ...
				return yes ('%second', ' / ') + '<a href=\"#\" class=style-link title=\"' + get ('title') + '\" data-tag=\"' + get ('tag') + '\">' + get ('label') + '</a>';
			}) + ' ]';                                                             // ...
	};
	Mustache.formButtonsDefault = function (){                                     // default.jsx:292
		contextsSize = 0;                                                          // default.jsx:293
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:294
			if (arguments[i] !== undefined){                                       // default.jsx:295
				contexts[contextsSize] = arguments[i];                             // default.jsx:296
				contextsSize ++;                                                   // default.jsx:297
			}
		return sub ('.',                                                           // default.jsx:299
			function (){                                                           // ...
				return '<input type=button title=\"' + get ('title') + '\" data-tag=\"' + get ('tag') + '\" value=\"' + get ('label') + '\"></input>';
			});
	};
	Mustache.message = function (){                                                // default.jsx:301
		contextsSize = 0;                                                          // default.jsx:302
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:303
			if (arguments[i] !== undefined){                                       // default.jsx:304
				contexts[contextsSize] = arguments[i];                             // default.jsx:305
				contextsSize ++;                                                   // default.jsx:306
			}
		return '<div class=message><div class=\"reply popup\"><div class=\"icon ' + html ('type') + '\"></div><p>' + html ('message') + '</p></div></div>';
	};
	Mustache.panelSection = function (){                                           // default.jsx:310
		contextsSize = 0;                                                          // default.jsx:311
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:312
			if (arguments[i] !== undefined){                                       // default.jsx:313
				contexts[contextsSize] = arguments[i];                             // default.jsx:314
				contextsSize ++;                                                   // default.jsx:315
			}
		return '<span><a data-button=preferences class=\"panel-icon icon-preferences\" title=\"Настройки\" href=\"#\"></a></span><span><a data-button=hiddens class=\"panel-icon icon-hidden\" title=\"Скрытое\" href=\"#\"></a></span><span><a data-button=favorites class=\"panel-icon icon-favorites\" title=\"Избранное\" href=\"#\"></a></span><span><a data-button=refresh class=\"panel-icon icon-refresh\" title=\"Обновить\" href=\"#\"></a></span>' + sub ('backUrl',
			function (){                                                           // default.jsx:317
				return '<span><a class=\"panel-icon icon-back\" title=\"Назад\" href=\"' + html ('backUrl') + '\"></a></span>';
			}) + sub ('forwardUrl',                                                // ...
			function (){                                                           // ...
				return '<span><a class=\"panel-icon icon-next\" title=\"Вперёд\" href=\"' + html ('forwardUrl') + '\"></a></span>';
			}) + '<span><a data-button=scrollup class=\"panel-icon icon-scrollup\" title=\"Наверх\" href=\"#\"></a></span><span><a data-button=scrolldown class=\"panel-icon icon-scrolldown\" title=\"В конец\" href=\"#\"></a></span><!--span><a data-button=expand-images class=\"panel-icon icon-expand-images\" title=\"Раскрыть картинки\" href=\"#\"></a></span><span><a data-button=download-images class=\"panel-icon icon-download-images\" title=\"Предзагрузка картинок\" href=\"#\"></a></span--><span><a data-button=mask-images class=\"panel-icon icon-mask-images\" title=\"Маскировать картинки\" href=\"#\"></a></span>';
	};
	Mustache.panelThread = function (){                                            // default.jsx:319
		contextsSize = 0;                                                          // default.jsx:320
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:321
			if (arguments[i] !== undefined){                                       // default.jsx:322
				contexts[contextsSize] = arguments[i];                             // default.jsx:323
				contextsSize ++;                                                   // default.jsx:324
			}
		return '<span><a data-button=preferences class=\"panel-icon icon-preferences\" title=\"Настройки\" href=\"#\"></a></span><span><a data-button=hiddens class=\"panel-icon icon-hidden\" title=\"Скрытое\" href=\"#\"></a></span><span><a data-button=favorites class=\"panel-icon icon-favorites\" title=\"Избранное\" href=\"#\"></a></span><span><a data-button=refresh class=\"panel-icon icon-refresh\" title=\"Обновить\" href=\"#\"></a></span><span><a class=\"panel-icon icon-back\" title=\"Назад\" href=\"' + html ('backUrl') + '\"></a></span><span><a data-button=scrollup class=\"panel-icon icon-scrollup\" title=\"Наверх\" href=\"#\"></a></span><span><a data-button=scrolldown class=\"panel-icon icon-scrolldown\" title=\"В конец\" href=\"#\"></a></span><!--span><a data-button=expand-images class=\"panel-icon icon-expand-images\" title=\"Раскрыть картинки\" href=\"#\"></a></span><span><a data-button=download-images class=\"panel-icon icon-download-images\" title=\"Предзагрузка картинок\" href=\"#\"></a></span--><span><a data-button=mask-images class=\"panel-icon icon-mask-images\" title=\"Маскировать картинки\" href=\"#\"></a></span><span><a data-button=autoupdate class=\"panel-icon icon-autoupdate\" title=\"Автообновление\" href=\"#\"></a></span><!--span><a data-button=audio class=\"panel-icon icon-audio\" title=\"Звуковые уведомления\" href=\"#\"></a></span><span><a data-button=download-all class=\"panel-icon icon-download-all\" title=\"Сохранить изображения из треда\" href=\"#\"></a></span-->' + sub ('postsCount',
			function (){                                                           // default.jsx:326
				return '<div class=information><span title=\"Число постов и изображений в треде\" data-id=information>' + html ('postsCount') + '/' + html ('imagesCount') + '</span></div>';
			});
	};
	Mustache.post = function (){                                                   // default.jsx:328
		contextsSize = 0;                                                          // default.jsx:329
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:330
			if (arguments[i] !== undefined){                                       // default.jsx:331
				contexts[contextsSize] = arguments[i];                             // default.jsx:332
				contextsSize ++;                                                   // default.jsx:333
			}
		return '<div class=\"' + yes ('threadMode', 'thread', 'post') + yes ('deleted', ' deleted') + yes ('hidden',
			function (){                                                           // default.jsx:335
				return no ('visible', ' hidden');                                  // ...
			}) + '\"' + yes ('hidden', ' data-hidden=true') + '>' + yes ('threadMode',
			function (){                                                           // ...
				return '<div class=\"thread-hidden reply\"> Скрытый тред:  <a data-button=hide data-display-hidden=true href=\"/' + html ('section') + '/res/' + get ('thread') + '.html#' + get ('id') + '\">№' + get ('id') + '</a><span class=thread-note> (' + get ('subjectForced') + ')</span></div>';
			}) + '<div class=\"content' + no ('threadMode', ' reply') + sub ('newPost', ' new') + '\" data-post=\"' + get ('section') + '/' + get ('id') + '\"><a name=\"' + html ('id') + '\"></a>' + sub ('file',
			function (){                                                           // ...
				return yes ('threadMode',                                          // ...
					function (){                                                   // ...
						return '<span class=filesize' + yes ('originalName',       // ...
							function (){                                           // ...
								return ' title=\"' + html ('originalName') + '\"';
							}) + '> Файл <span class=\"icon search-icon\" data-menu=image-search></span><a target=\"_blank\" href=\"' + get ('fullpath') + '\"' + yes ('originalName',
							function (){                                           // ...
								return ' download=\"' + get ('originalName') + '\"';
							}, 
							function (){                                           // ...
								return ' download=\"' + get ('name') + '\"';       // ...
							}) + '>' + get ('name') + '</a> — (' + get ('sizeFormatted') + ', ' + get ([ 'dimensions', 'width' ]) + '×' + get ([ 'dimensions', 'height' ]) + yes ('displayName',
							function (){                                           // ...
								return ', ' + get ('displayName');                 // ...
							}) + ')  </span><a class=thumb-link data-type=image draggable=false unselectable=on target=\"_blank\" href=\"' + get ('fullpath') + '\"><span><img class=thumb src=\"' + get ('thumbinal') + '\" data-src=\"' + get ('fullpath') + '\" height=\"' + get ([ 'thumbinalDimensions', 'height' ]) + '\" width=\"' + get ([ 'thumbinalDimensions', 'width' ]) + '\" data-height=\"' + get ([ 'dimensions', 'height' ]) + '\" data-width=\"' + get ([ 'dimensions', 'width' ]) + '\"></span></a>';
					});
			}) + '<label><input type=checkbox name=\"post[]\" value=\"' + html ('id') + '\">  ' + yes ('subject',
			function (){                                                           // ...
				return '<span class=filetitle>' + get ('subject') + ' </span>';    // ...
			}) + '<span class=postername>' + yes ('email',                         // ...
			function (){                                                           // ...
				return '<a ' + sub ('sage', 'class=sage') + ' href=\"mailto:' + get ('email') + '\">';
			}) + get ('name') + no ('name',                                        // ...
			function (){                                                           // ...
				return no ('tripcode', 'Аноним');                                  // ...
			}) + yes ('email', '</a>') + '</span>' + yes ('tripcode',              // ...
			function (){                                                           // ...
				return '<span class=postertrip>!' + get ('tripcode') + ' </span>';
			}) + '   <span data-draggable>' + get ('date') + ' </span><span class=reflink><a data-button=insert-id data-display-hidden=true href=\"/' + get ('section') + '/res/' + get ('thread') + '.html#' + get ('id') + '\">No. ' + get ('id') + '</a>   </span><span class=post-buttons data-button=empty><span class=\"icon ' + sub ('hidden',
			function (){                                                           // ...
				return sub ('visible', 'hidden-hide-icon') + no ('visible', 'hidden-show-icon');
			}) + no ('hidden', 'hide-icon') + '\" data-button=hide></span><span class=\"icon reply-icon\" data-button=reply></span>' + yes ('sage', '<span class=\"icon sage-icon\"></span>') + yes ('threadInListMode',
			'<span class=\"icon expand-icon\" data-menu=thread-expand></span>') + yes ('threadMode',
			function (){                                                           // ...
				return '<span class=\"icon favorite-icon' + yes ('favorited', ' favorite-marked-icon') + '\" data-button=favorite></span>';
			}, 
			function (){                                                           // ...
				return '<span class=post-number>' + get ('postNumber') + '</span>';
			}) + '<span class=post-state></span></span></label>' + yes ('threadInListMode',
			function (){                                                           // ...
				return ' [<a href=\"/' + get ('section') + '/res/' + get ('thread') + '.html\">Ответ</a>] ';
			}) + '<br>' + sub ('file',                                             // ...
			function (){                                                           // ...
				return no ('threadMode',                                           // ...
					function (){                                                   // ...
						return '<span class=filesize' + yes ('originalName',       // ...
							function (){                                           // ...
								return ' title=\"' + html ('originalName') + '\"';
							}) + '> Файл <span class=\"icon search-icon\" data-menu=image-search></span><a target=\"_blank\" href=\"' + get ('fullpath') + '\"' + yes ('originalName',
							function (){                                           // ...
								return ' download=\"' + get ('originalName') + '\"';
							}, 
							function (){                                           // ...
								return ' download=\"' + get ('name') + '\"';       // ...
							}) + '>' + get ('name') + '</a> — (' + get ('sizeFormatted') + ', ' + get ([ 'dimensions', 'width' ]) + '×' + get ([ 'dimensions', 'height' ]) + yes ('displayName',
							function (){                                           // ...
								return ', ' + get ('displayName');                 // ...
							}) + ')  </span><a class=thumb-link data-type=image draggable=false unselectable=on target=\"_blank\" href=\"' + get ('fullpath') + '\"><span><img class=thumb src=\"' + get ('thumbinal') + '\" data-src=\"' + get ('fullpath') + '\" height=\"' + get ([ 'thumbinalDimensions', 'height' ]) + '\" width=\"' + get ([ 'thumbinalDimensions', 'width' ]) + '\" data-height=\"' + get ([ 'dimensions', 'height' ]) + '\" data-width=\"' + get ([ 'dimensions', 'width' ]) + '\"></span></a>';
					});
			}) + '<span data-id=embeds-host>' + get ('embedsHtml') + '</span><blockquote>' + get ('message') + '</blockquote><div data-id=answers>' + get ('answersHtml') + '</div>' + yes ('threadMode',
			function (){                                                           // ...
				return '<div class=bottom data-id=childs>' + yes ('omitted',       // ...
					function (){                                                   // ...
						return '<span class=omittedposts>' + html ('omitted') + '</span>';
					}) + get ('childs') + '</div>';                                // ...
			}) + '</div>' + yes ('threadMode', '<br clear=left><hr>') + '</div>';
	};
	Mustache.postChilds = function (){                                             // default.jsx:337
		contextsSize = 0;                                                          // default.jsx:338
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:339
			if (arguments[i] !== undefined){                                       // default.jsx:340
				contexts[contextsSize] = arguments[i];                             // default.jsx:341
				contextsSize ++;                                                   // default.jsx:342
			}
		return yes ('omitted',                                                     // default.jsx:344
			function (){                                                           // ...
				return '<span class=omittedposts>' + html ('omitted') + '</span>';
			}) + '<div data-id=childs>' + get ('childs') + '</div>';               // ...
	};
	Mustache.postAnswers = function (){                                            // default.jsx:346
		contextsSize = 0;                                                          // default.jsx:347
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:348
			if (arguments[i] !== undefined){                                       // default.jsx:349
				contexts[contextsSize] = arguments[i];                             // default.jsx:350
				contextsSize ++;                                                   // default.jsx:351
			}
		return '<div class=refmap> Ответы: ' + sub ('next',                        // default.jsx:353
			function (){                                                           // ...
				return '<a data-link=\"' + get ('section') + '/' + get ('id') + '\" href=\"/' + get ('section') + '/res/' + get ('thread') + '.html#' + get ('id') + '\">&gt;&gt;' + get ('id') + '</a>' + no ('%last', ', ');
			}) + '</div>';                                                         // ...
	};
	Mustache.postError = function (){                                              // default.jsx:355
		contextsSize = 0;                                                          // default.jsx:356
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:357
			if (arguments[i] !== undefined){                                       // default.jsx:358
				contexts[contextsSize] = arguments[i];                             // default.jsx:359
				contextsSize ++;                                                   // default.jsx:360
			}
		return '<div class=reply><blockquote><p>Не удалось загрузить сообщение</p><div class=details> Подробная информация: <p style=\"margin-top:0\"><i>Ошибка #' + html ('errorCode') + ': ' + html ('errorDescription') + '</i></p></div></blockquote></div>';
	};
	Mustache.postImagelinkThumbinal = function (){                                 // default.jsx:364
		contextsSize = 0;                                                          // default.jsx:365
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:366
			if (arguments[i] !== undefined){                                       // default.jsx:367
				contexts[contextsSize] = arguments[i];                             // default.jsx:368
				contextsSize ++;                                                   // default.jsx:369
			}
		return '<a href=\"' + get ('url') + '\" target=\"_blank\"><img class=image-preview ' + no ('enabled', 'data-') + 'src=\"' + get ('proxyUrl') + '\"></a>';
	};
	Mustache.postAudiolinkThumbinal = function (){                                 // default.jsx:373
		contextsSize = 0;                                                          // default.jsx:374
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:375
			if (arguments[i] !== undefined){                                       // default.jsx:376
				contexts[contextsSize] = arguments[i];                             // default.jsx:377
				contextsSize ++;                                                   // default.jsx:378
			}
		return '<audio class=audio-preview controls><source ' + no ('enabled', 'data-') + 'src=\"' + get ('url') + '\" type=\"audio/' + get ('type') + '\"></audio>';
	};
	Mustache.abstractPage = function (){                                           // default.jsx:382
		contextsSize = 0;                                                          // default.jsx:383
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:384
			if (arguments[i] !== undefined){                                       // default.jsx:385
				contexts[contextsSize] = arguments[i];                             // default.jsx:386
				contextsSize ++;                                                   // default.jsx:387
			}
		return '<div class=\"page fading\">' + get ('html') + '</div>';            // default.jsx:389
	};
	Mustache.abstractPageFailed = function (){                                     // default.jsx:391
		contextsSize = 0;                                                          // default.jsx:392
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:393
			if (arguments[i] !== undefined){                                       // default.jsx:394
				contexts[contextsSize] = arguments[i];                             // default.jsx:395
				contextsSize ++;                                                   // default.jsx:396
			}
		return '<div class=page-failed><h1>' + html ('caption') + '</h1><div class=\"block reply\"><p>' + get ('description') + '</p>' + sub ('errorCode',
			function (){                                                           // default.jsx:398
				return '<div class=details> Подробная информация: <p class=italic> Ошибка #' + html ('errorCode') + ': ' + html ('errorDescription') + '</p></div>';
			}) + '</div><p data-element=sections-list data-loaded=true></p></div>';
	};
	Mustache.authorizePage = function (){                                          // default.jsx:400
		contextsSize = 0;                                                          // default.jsx:401
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:402
			if (arguments[i] !== undefined){                                       // default.jsx:403
				contexts[contextsSize] = arguments[i];                             // default.jsx:404
				contextsSize ++;                                                   // default.jsx:405
			}
		return '<div class=page-autorize><h1>Авторизация</h1><div class=\"block reply\"><div class=\"sub-main fading\" data-id=form><p><span class=what>Логин:</span><input class=autorize-input type=text></p><p><span class=what>Пароль:</span><input class=autorize-input type=password></p><p><span class=what></span><span class=wrapper><span class=loading></span><input class=\"autorize-input fading visible\" type=button value=\"Войти\"></span></p></div><div class=\"sub fading visible\" data-id=loading><div class=loading></div></div><div class=\"sub fading\" data-id=done></div><p class=italic>' + html ('phrase') + '</p></div><p data-element=sections-list data-loaded=true></p></div>';
	};
	Mustache.authorizePageSuccess = function (){                                   // default.jsx:409
		contextsSize = 0;                                                          // default.jsx:410
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:411
			if (arguments[i] !== undefined){                                       // default.jsx:412
				contexts[contextsSize] = arguments[i];                             // default.jsx:413
				contextsSize ++;                                                   // default.jsx:414
			}
		return '<div class=success><p class=success-icon> Вы ' + sub ('already', 'уже') + ' вошли как ' + html ('login') + '</p><span class=wrapper><span class=loading></span><input class=\"autorize-input fading visible\" type=button value=\"Выйти\"></span></div>';
	};
	Mustache.indexPage = function (){                                              // default.jsx:418
		contextsSize = 0;                                                          // default.jsx:419
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:420
			if (arguments[i] !== undefined){                                       // default.jsx:421
				contexts[contextsSize] = arguments[i];                             // default.jsx:422
				contextsSize ++;                                                   // default.jsx:423
			}
		return '<div class=page-index><h1>Поня.ч <span class=new-mark>[НОВЫЙ]</span></h1><div class=\"block reply\"><p> Добро пожаловать на <a href=\"/\">' + html ('host') + '</a> с новым экспериментальным интерфейсом. Он называется «Clin» и должен быть максимально похож на привычный интерфейс имиджборд. Надеемся, он вам понравится. </p><p class=italic> Enjoy your friendship. :) </p></div><p data-element=sections-list data-loaded=true></p></div>';
	};
	Mustache.sectionPage = function (){                                            // default.jsx:427
		contextsSize = 0;                                                          // default.jsx:428
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:429
			if (arguments[i] !== undefined){                                       // default.jsx:430
				contexts[contextsSize] = arguments[i];                             // default.jsx:431
				contextsSize ++;                                                   // default.jsx:432
			}
		return '<div class=page-section><div data-element=header data-set-title=true data-section=\"' + html ('section') + '\" ></div><div class=section-content data-element=threads-list data-section=\"' + html ('section') + '\" data-page-number=\"' + html ('pageNumber') + '\" ></div><div data-element=footer ></div></div>';
	};
	Mustache.staticPage = function (){                                             // default.jsx:436
		contextsSize = 0;                                                          // default.jsx:437
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:438
			if (arguments[i] !== undefined){                                       // default.jsx:439
				contexts[contextsSize] = arguments[i];                             // default.jsx:440
				contextsSize ++;                                                   // default.jsx:441
			}
		return '<div class=page-static><div data-element=header data-set-title=true data-section=\"' + html ('path') + '\" ></div><div data-element=static-content data-path=\"' + html ('path') + '\" ></div><div data-element=sections-list ></p></div>';
	};
	Mustache.threadPage = function (){                                             // default.jsx:445
		contextsSize = 0;                                                          // default.jsx:446
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:447
			if (arguments[i] !== undefined){                                       // default.jsx:448
				contexts[contextsSize] = arguments[i];                             // default.jsx:449
				contextsSize ++;                                                   // default.jsx:450
			}
		return '<div class=page-section><div data-element=header data-section=\"' + html ('section') + '\" ></div><div data-element=posts-list data-section=\"' + html ('section') + '\" data-thread=\"' + html ('thread') + '\" data-set-title=true ></div><div data-element=footer ></div></div>';
	};
	Mustache.hiddensWindowPosts = function (){                                     // default.jsx:454
		contextsSize = 0;                                                          // default.jsx:455
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:456
			if (arguments[i] !== undefined){                                       // default.jsx:457
				contexts[contextsSize] = arguments[i];                             // default.jsx:458
				contextsSize ++;                                                   // default.jsx:459
			}
		return yes ('posts',                                                       // default.jsx:461
			function (){                                                           // ...
				return '<div class=window-block>' + sub ('posts',                  // ...
					function (){                                                   // ...
						return '<div class=\"post' + yes ('deleted', ' deleted') + yes ('hidden',
							function (){                                           // ...
								return no ('visible', ' hidden');                  // ...
							}) + '\"><div class=\"window-entry content reply popup\" data-post=\"' + get ('section') + '/' + get ('id') + '\"><label><input type=checkbox data-target=\"' + get ('section') + '/' + get ('id') + '\">' + yes ('subject',
							function (){                                           // ...
								return '<span class=filetitle>' + get ('subject') + '</span>';
							}) + '<span class=postername>' + yes ('email',         // ...
							function (){                                           // ...
								return '<a ' + sub ('sage', 'class=sage') + ' href=\"mailto:' + get ('email') + '\">';
							}) + get ('name') + no ('name',                        // ...
							function (){                                           // ...
								return no ('tripcode', 'Аноним');                  // ...
							}) + yes ('email', '</a>') + '</span>' + yes ('tripcode',
							function (){                                           // ...
								return '<span class=postertrip>!' + get ('tripcode') + '</span>';
							}) + get ('date') + '<span class=reflink><a href=\"#' + get ('id') + '\">No. ' + get ('id') + '</a></span><span class=post-buttons data-button=empty><span class=\"icon ' + sub ('hidden',
							function (){                                           // ...
								return sub ('visible', 'hidden-hide-icon') + no ('visible', 'hidden-show-icon');
							}) + no ('hidden', 'hide-icon') + '\" data-button=hide></span>' + yes ('sage', '<span class=\"icon sage-icon\"></span>') + '</span></label></div></div>';
					}) + '</div>';                                                 // ...
			}, 
			'<p>На этой странице нет скрытых постов.</p>');                        // ...
	};
	Mustache.hiddensWindowThreads = function (){                                   // default.jsx:463
		contextsSize = 0;                                                          // default.jsx:464
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:465
			if (arguments[i] !== undefined){                                       // default.jsx:466
				contexts[contextsSize] = arguments[i];                             // default.jsx:467
				contextsSize ++;                                                   // default.jsx:468
			}
		return yes ('threads',                                                     // default.jsx:470
			function (){                                                           // ...
				return '<div class=window-block>' + sub ('threads',                // ...
					function (){                                                   // ...
						return '<div data-id=group><div class=window-entry><input type=checkbox data-checkbox=section><b>/' + get ('section') + '/</b></div>' + sub ('entries',
							function (){                                           // ...
								return '<div class=\"window-entry reply popup\"><input type=checkbox data-checkbox=thread data-target=\"' + get ('section') + '/' + get ('id') + '\"><a href=\"/' + get ('section') + '/res/' + get ('id') + '.html\" target=\"_blank\">№' + get ('id') + '</a> — ' + get ('subject') + '</div>';
							}) + '</div>';                                         // ...
					}) + '</div>';                                                 // ...
			}, 
			'<p>Скрытых тредов нет.</p>');                                         // ...
	};
	Mustache.favoritesWindowBody = function (){                                    // default.jsx:472
		contextsSize = 0;                                                          // default.jsx:473
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:474
			if (arguments[i] !== undefined){                                       // default.jsx:475
				contexts[contextsSize] = arguments[i];                             // default.jsx:476
				contextsSize ++;                                                   // default.jsx:477
			}
		return yes ('threads',                                                     // default.jsx:479
			function (){                                                           // ...
				return '<div class=window-block>' + sub ('threads',                // ...
					function (){                                                   // ...
						return '<div data-id=group><div class=window-entry><input type=checkbox data-checkbox=section><b>/' + get ('section') + '/</b></div>' + sub ('entries',
							function (){                                           // ...
								return '<div class=\"window-entry reply popup\"><input type=checkbox data-checkbox=thread data-target=\"' + get ('section') + '/' + get ('id') + '\"><a href=\"/' + get ('section') + '/res/' + get ('id') + '.html\" target=\"_blank\">№' + get ('id') + '</a> — ' + get ('subject') + '</div>';
							}) + '</div>';                                         // ...
					}) + '</div>';                                                 // ...
			}, 
			'<p>Избранных тредов нет.</p>');                                       // ...
	};
	Mustache.preferencesWindowInfo = function (){                                  // default.jsx:481
		contextsSize = 0;                                                          // default.jsx:482
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:483
			if (arguments[i] !== undefined){                                       // default.jsx:484
				contexts[contextsSize] = arguments[i];                             // default.jsx:485
				contextsSize ++;                                                   // default.jsx:486
			}
		return '<div style=\"padding-bottom:10px\" title=\"На всякий случай: это не Dollchan Extension Tools, а выглядит похоже лишь потому что интерфейс задуман максимально классическим. Всё написано с нуля и всё такое.\"><a href=\"https://bitbucket.org/99b/ponyaba/wiki/Versions\" target=\"_blank\">' + get ('version') + '</a> &nbsp;|&nbsp; <a href=\"/\">Поняч</a> &nbsp;|&nbsp; <a href=\"https://bitbucket.org/99b/ponyaba/\" target=\"_blank\">Bitbucket</a></div><div><div style=\"display:inline-block;vertical-align:top;width:186px;height:235px\" data-id=statistics></div><!--div style=\"display:inline-block;padding-left:7px;height:235px;border-left:1px solid grey\"> Init: 5ms <br> Read config: 5ms <br> Parse delform: 18ms <br> Add panel: 3ms <br> YouTube links: 4ms <br> Reflinks map: 6ms <br> Apply CSS: 55ms <br> Apply spells: 7ms <br> Всего: 103ms </div--></div><!--input type=button value=\"Отладка\" title=\"Информация для отладки\"-->';
	};
	Mustache.preferencesWindowStatistics = function (){                            // default.jsx:490
		contextsSize = 0;                                                          // default.jsx:491
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:492
			if (arguments[i] !== undefined){                                       // default.jsx:493
				contexts[contextsSize] = arguments[i];                             // default.jsx:494
				contextsSize ++;                                                   // default.jsx:495
			}
		return '<span> Тредов просмотрено: ' + get ('threadsVisited') + '<br> Тредов создано: ' + get ('threadsCreated') + '<br> Сообщений: ' + get ('messagesSended') + '</span>';
	};
	Mustache.preferencesWindowThemeSelect = function (){                           // default.jsx:499
		contextsSize = 0;                                                          // default.jsx:500
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:501
			if (arguments[i] !== undefined){                                       // default.jsx:502
				contexts[contextsSize] = arguments[i];                             // default.jsx:503
				contextsSize ++;                                                   // default.jsx:504
			}
		return sub ('.',                                                           // default.jsx:506
			function (){                                                           // ...
				return '<optgroup label=\"' + get ('group') + '\">' + sub ('styles',
					function (){                                                   // ...
						return '<option value=\"' + get ('url') + '\">' + get ('name') + '</option>';
					}) + '</optgroup>';                                            // ...
			});
	};
	Mustache.window = function (){                                                 // default.jsx:508
		contextsSize = 0;                                                          // default.jsx:509
		for (var i = 0; i < arguments.length; i ++)                                // default.jsx:510
			if (arguments[i] !== undefined){                                       // default.jsx:511
				contexts[contextsSize] = arguments[i];                             // default.jsx:512
				contextsSize ++;                                                   // default.jsx:513
			}
		return '<div class=\"window fading' + yes ('className',                    // default.jsx:515
			function (){                                                           // ...
				return ' ' + html ('className');                                   // ...
			}) + '\" data-window=\"' + html ('className') + '\"><div class=window-header><span data-id=window-caption></span><span data-button=window-close class=window-close>×</span></div><div data-id=window-bar class=window-bar></div><div data-id=window-body class=\"window-body reply\"></div><div data-id=window-footer class=\"window-footer reply\"></div></div>';
	};
}());
var Storage = function (){                                                         // storage.jsxi:1
		var Storage = function (id, callback){                                     // storage.jsxi:7
			this.__Storage_timeout = false;                                        // storage.jsxi:4
			this.__Storage_callback = null;                                        // storage.jsxi:5
			this.__Storage_id = id;                                                // storage.jsxi:8
			this.__Storage_callback = callback;                                    // storage.jsxi:9
			if (typeof callback === 'function')                                    // storage.jsxi:11
				$ (window).on ('storage', __bo (this, '__Storage_storage'));       // storage.jsxi:12
		};
		Storage.prototype.__Storage_storage = function (event){                    // storage.jsxi:15
			if (event.key === this.__Storage_id){                                  // storage.jsxi:76
				try {                                                              // storage.jsxi:20
					this.__Storage_data = JSON.parse (event.newValue);             // storage.jsxi:18
				} catch (e){                                                       // storage.jsxi:20
					this.__Storage_data = {};                                      // ...
				} 
				this.__Storage_callback (this.__Storage_data);                     // storage.jsxi:76
			}
		};
		Storage.prototype.load = function (){
			try {                                                                  // storage.jsxi:28
				this.__Storage_data = JSON.parse (localStorage[this.__Storage_id]);
			} catch (e){                                                           // ...
				this.__Storage_data = {};                                          // ...
			} 
			return this.__Storage_data;                                            // storage.jsxi:76
		};
		Storage.prototype.save = function (){
			var __that = this;                                                     // ...
			if (this.__Storage_timeout !== false)                                  // storage.jsxi:33
				clearTimeout (this.__Storage_timeout);                             // storage.jsxi:34
			this.__Storage_timeout = setTimeout (function (arg){                   // storage.jsxi:36
				localStorage[__that.__Storage_id] = JSON.stringify (__that.__Storage_data);
				__that.__Storage_timeout = false;                                  // storage.jsxi:38
			}, 
			100);                                                                  // storage.jsxi:39
		};
		return Storage;
	}(), 
	Exif = function (){                                                            // exif.jsxi:1
		var Exif = function (file){                                                // exif.jsxi:4
			this.__Exif_file = file;                                               // exif.jsxi:5
		};
		Exif.prototype.__Exif_processData = function (arraybuffer){                // exif.jsxi:8
			var data = new Uint8Array (arraybuffer), pos = 0, bigEndian;           // exif.jsxi:11
			function check (what){                                                 // exif.jsxi:13
				for (var i = 0; i < what.length; i ++){                            // exif.jsxi:14
					var n = what[i];                                               // exif.jsxi:16
					if (data[(pos + i)] !== n)                                     // exif.jsxi:15
						return false;                                              // exif.jsxi:16
				}
				pos += what.length;                                                // exif.jsxi:17
				return true;                                                       // exif.jsxi:18
			}
			function readAt (bytes, offset, clear){                                // exif.jsxi:21
				var result = 0;                                                    // exif.jsxi:22
				for (var i = 0; i < bytes; i ++){                                  // exif.jsxi:23
					result = 256 * result + data[(offset + i)];                    // exif.jsxi:24
					if (clear)                                                     // exif.jsxi:26
						data[(offset + i)] = 0;                                    // exif.jsxi:27
				}
				return result;                                                     // exif.jsxi:29
			}
			function readStringAt (bytes, offset, clear){                          // exif.jsxi:32
				var result = '';                                                   // exif.jsxi:33
				for (var i = 0; i < bytes; i ++){                                  // exif.jsxi:34
					result += String.fromCharCode (data[(offset + i)]);            // exif.jsxi:35
					if (clear)                                                     // exif.jsxi:37
						data[(offset + i)] = 0;                                    // exif.jsxi:38
				}
				return result;                                                     // exif.jsxi:40
			}
			function read (bytes, skip, clear){                                    // exif.jsxi:43
				if (skip)                                                          // exif.jsxi:44
					pos += skip;                                                   // exif.jsxi:45
				var result = readAt (bytes, pos, clear);                           // exif.jsxi:47
				pos += bytes;                                                      // exif.jsxi:49
				return result;                                                     // exif.jsxi:50
			}
			if (!check ([ 255, 216 ]))                                             // exif.jsxi:54
				return undefined;                                                  // exif.jsxi:55
			var formats = [
				{ name: 'unsigned byte', size: 1 },                                // exif.jsxi:58
				{ name: 'ascii strings', size: 1 },                                // exif.jsxi:59
				{ name: 'unsigned short', size: 2 },                               // exif.jsxi:60
				{ name: 'unsigned long', size: 4 },                                // exif.jsxi:61
				{ name: 'unsigned rational', size: 8 },                            // exif.jsxi:62
				{ name: 'signed byte', size: 1 },                                  // exif.jsxi:63
				{ name: 'undefined', size: 1 },                                    // exif.jsxi:64
				{ name: 'signed short', size: 2 },                                 // exif.jsxi:65
				{ name: 'signed long', size: 4 },                                  // exif.jsxi:66
				{ name: 'signed rational', size: 8 },                              // exif.jsxi:67
				{ name: 'single float', size: 4 },                                 // exif.jsxi:68
				{ name: 'double float', size: 8 }                                  // exif.jsxi:69
			];
			function subIfd (start, offset){                                       // exif.jsxi:72
				var bigEndian = readAt (1, start);                                 // exif.jsxi:73
				console.log (bigEndian.toString (16), readAt (1, start + 1).toString (16));
			}
			function readIfd (start){                                              // exif.jsxi:77
				var count = read (2),                                              // exif.jsxi:78
					tag,                                                           // exif.jsxi:79
					format,                                                        // exif.jsxi:80
					components,                                                    // exif.jsxi:81
					data,                                                          // exif.jsxi:82
					address,                                                       // exif.jsxi:83
					total,                                                         // exif.jsxi:84
					next;                                                          // exif.jsxi:85
				for (var i = 0; i < count; i ++){                                  // exif.jsxi:87
					tag = read (2);                                                // exif.jsxi:88
					format = read (2);                                             // exif.jsxi:89
					components = read (4);                                         // exif.jsxi:90
					total = components * formats[(format - 1)].size;               // exif.jsxi:91
					if (total <= 4){                                               // exif.jsxi:93
						address = pos;                                             // exif.jsxi:94
						pos += 4;                                                  // exif.jsxi:95
					} else
						address = start + read (4);                                // exif.jsxi:97
					data = format === 2 ? readStringAt (total, address, true) : readAt (total, address, true);
					if (tag === 34665)                                             // exif.jsxi:101
						subIfd (start, start + data);                              // exif.jsxi:102
				}
				next = read (4, 0, true);                                          // exif.jsxi:105
				if (next !== 0)                                                    // exif.jsxi:107
					console.warn ('Not implemented at 108 line of exif.jsxi');     // exif.jsxi:108
			}
			for (pos = 0; pos < 1000; pos ++){                                     // exif.jsxi:113
				if (check ([ 255, 225 ])){                                         // exif.jsxi:116
					var size = read (2), offset, start;                            // exif.jsxi:120
					if (check ([ 69, 120, 105, 102, 0, 0 ])){                      // exif.jsxi:123
						start = pos;                                               // exif.jsxi:124
						if (check ([ 73, 73 ])){                                   // exif.jsxi:128
							console.warn ('Not implemented at 129 line of exif.jsxi');
							return null;                                           // exif.jsxi:131
						} else if (check ([ 77, 77 ])){                            // exif.jsxi:132
							bigEndian = true;                                      // exif.jsxi:133
						} else {
							return null;                                           // exif.jsxi:135
						}
						offset = read (4, 2);                                      // exif.jsxi:138
						pos = start + offset;                                      // exif.jsxi:139
						readIfd (start);                                           // exif.jsxi:143
						return arraybuffer;                                        // exif.jsxi:144
					} else {
						pos -= 2;                                                  // exif.jsxi:146
					}
				}
			}
			return undefined;                                                      // exif.jsxi:151
		};
		Exif.prototype.clear = function (callback){                                // exif.jsxi:154
			var __that = this;                                                     // exif.jsxi:76
			if (this.__Exif_file instanceof ArrayBuffer){                          // exif.jsxi:155
				var result = this.__Exif_processData (this.__Exif_file);           // exif.jsxi:156
				callback (result);                                                 // exif.jsxi:157
			} else {
				fileReader = new FileReader ();                                    // exif.jsxi:159
				fileReader.onload = function (arg){                                // exif.jsxi:160
					if (!__that.__Exif_cancelled)                                  // exif.jsxi:76
						return callback (__that.__Exif_processData (arg.target.result));
				};
				fileReader.readAsArrayBuffer (this.__Exif_file);                   // exif.jsxi:162
			}
		};
		Exif.prototype.cancel = function (){
			return this.__Exif_cancelled = true;                                   // exif.jsxi:166
		};
		return Exif;
	}(), 
	Errors = function (){                                                          // errors.jsxi:1
		var Errors = function (){}, 
			descriptionByNumber = {
				'400': 'Bad Request',                                              // errors.jsxi:2
				'401': 'Unauthorized',                                             // ...
				'402': 'Payment Required',                                         // ...
				'403': 'Forbidden',                                                // ...
				'404': 'Not Found',                                                // ...
				'405': 'Method Not Allowed',                                       // ...
				'406': 'Not Acceptable',                                           // ...
				'407': 'Proxy Authentication Required',                            // ...
				'408': 'Request Timeout',                                          // ...
				'500': 'Internal Server Error',                                    // ...
				'501': 'Not Implemented',                                          // ...
				'502': 'Bad Gateway',                                              // ...
				'503': 'Service Unavailable',                                      // ...
				'504': 'Gateway Timeout',                                          // ...
				'505': 'HTTP Version Not Supported',                               // ...
				'1001': 'Preprocessing Error',                                     // ...
				'1002': 'Versions Mismatch',                                       // ...
				'1003': 'Server Gone Crazy',                                       // ...
				'1004': 'Unsupported Data',                                        // ...
				'1404': 'Requested Data Not Found',                                // ...
				'1420': 'Empty Messages Not Allowed'                               // ...
			};
		Errors.description = function (error){                                     // errors.jsxi:4
			if ([object Object].test (error))                                      // errors.jsxi:5
				return descriptionByNumber[String (error)] || 'Неизвестная ошибка';
			else
				return String (error);                                             // errors.jsxi:8
		};
		return Errors;
	}(), 
	Dispatcher = function (){                                                      // dispatcher.jsxi:1
		var Dispatcher = function (){
			this.__Dispatcher_handlers = [];                                       // dispatcher.jsxi:2
		};
		Dispatcher.prototype.__add = function (type, handler){                     // dispatcher.jsxi:4
			console.assert ((typeof type === 'string' || type === null) && typeof handler === 'function',
				'Wrong arguments: ' + type + ', ' + handler);                      // dispatcher.jsxi:5
			this.__Dispatcher_handlers.push ({ type: type, handler: handler });    // dispatcher.jsxi:6
		};
		Dispatcher.prototype.on = function (type, handler){                        // dispatcher.jsxi:9
			console.assert (typeof handler === 'function' || typeof type === 'function',
				'Wrong arguments');                                                // dispatcher.jsxi:10
			if (typeof type === 'function'){                                       // dispatcher.jsxi:11
				this.__add (null, type);                                           // dispatcher.jsxi:76
			} else {
				if (typeof type === 'string' && type.indexOf (' ') !== - 1)        // dispatcher.jsxi:14
					type = type.split (' ').map (function (arg){                   // dispatcher.jsxi:15
						return arg.trim ();                                        // ...
					});
				if (type instanceof Array){                                        // dispatcher.jsxi:17
					for (var _s = 0; _s < type.length; _s ++){                     // dispatcher.jsxi:22
						var arg = type[_s];                                        // ...
						arg = arg.trim ();                                         // dispatcher.jsxi:19
						if (arg)                                                   // dispatcher.jsxi:20
							this.__add (arg, handler);                             // dispatcher.jsxi:76
					}
				} else
					this.__add (type, handler);                                    // ...
			}
		};
		Dispatcher.prototype.off = function (handler){                             // dispatcher.jsxi:28
			console.assert (typeof handler === 'function', 'Wrong arguments');     // dispatcher.jsxi:29
			this.__Dispatcher_handlers = this.__Dispatcher_handlers.filter (function (arg){
				return arg.handler !== handler;                                    // dispatcher.jsxi:30
			});
		};
		Dispatcher.prototype.call = function (type, arg){                          // dispatcher.jsxi:33
			if (typeof type !== 'string'){                                         // dispatcher.jsxi:34
				arg = type;                                                        // dispatcher.jsxi:35
				type = null;                                                       // dispatcher.jsxi:36
			}
			for (var _t = 0; _t < this.__Dispatcher_handlers.length; _t ++){       // dispatcher.jsxi:41
				var entry = this.__Dispatcher_handlers[_t];                        // ...
				if (entry.type === null || entry.type === type)                    // dispatcher.jsxi:40
					entry.handler.call (null, arg, type);                          // dispatcher.jsxi:41
			}
		};
		return Dispatcher;
	}(), 
	ImageSearch = function (){                                                     // imageSearch.jsxi:1
		var ImageSearch = function (){};
		ImageSearch.items = [
			{
				label: 'Искать в ' + 'Google',                                     // imageSearch.jsxi:4
				icon: 'http://google.com/favicon.ico',                             // imageSearch.jsxi:5
				action: 'image-search:google'                                      // imageSearch.jsxi:6
			}, 
			{
				label: 'Искать в ' + 'TinEye',                                     // imageSearch.jsxi:9
				icon: 'http://tineye.com/favicon.ico',                             // imageSearch.jsxi:10
				action: 'image-search:tineye'                                      // imageSearch.jsxi:11
			}, 
			{
				label: 'Искать в ' + 'Derpibooru',                                 // imageSearch.jsxi:14
				icon: 'http://g.etfv.co/http://derpibooru.org/',                   // imageSearch.jsxi:15
				action: 'image-search:derpibooru'                                  // imageSearch.jsxi:16
			}
		];
		ImageSearch.go = function (href, target){                                  // imageSearch.jsxi:20
			switch (target){                                                       // imageSearch.jsxi:21
				case 'google':                                                     // imageSearch.jsxi:22
					window.open ('http://google.com/searchbyimage?image_url=' + location.origin + '/' + href,
						'_blank');                                                 // imageSearch.jsxi:23
					break;                                                         // imageSearch.jsxi:24
				case 'tineye':                                                     // imageSearch.jsxi:25
					window.open ('http://tineye.com/search/?url=' + location.origin + '/' + href,
						'_blank');                                                 // imageSearch.jsxi:26
					break;                                                         // imageSearch.jsxi:27
				case 'derpibooru':                                                 // imageSearch.jsxi:28
					$ ('<form method=\"post\" action=\"https://derpibooru.org/search/reverse\" target=\"_blank\" enctype=\"multipart/form-data\" hidden>' + '<input id=\"url\" name=\"url\" type=\"text\" value=\"' + location.origin + '/' + href + '\">' + '<input id=\"fuzziness\" name=\"fuzziness\" type=\"text\" value=\"0.25\">' + '</form>').appendTo ('body').submit ().remove ();
					break;                                                         // imageSearch.jsxi:33
				default:
					console.assert (true, 'Wrond target \"' + target + '\"');      // imageSearch.jsxi:35
			}
		};
		return ImageSearch;
	}(), 
	AbstractPage = function (){                                                    // abstractPage.jsxi:1
		var AbstractPage = function (){
			if (this.constructor === AbstractPage)
				throw new Error ('Trying to instantiate abstract class AbstractPage');
		};
		AbstractPage.prototype.run = function (){
			var __that = this;                                                     // abstractPage.jsxi:76
			document[(document instanceof AbstractPage ? '__title' : 'title')] = this.__title ();
			var html = Mustache.abstractPage ({ html: this.build () });            // abstractPage.jsxi:12
			this.__page = $ (html).appendTo (document.body);                       // abstractPage.jsxi:13
			this.__elements = AbstractElement.process (this.__page);               // abstractPage.jsxi:14
			if (this.__AbstractPage_check ()){                                     // abstractPage.jsxi:76
				Page.anchor ();                                                    // abstractPage.jsxi:17
				this.__page.timeout (function (arg){                               // abstractPage.jsxi:18
					return __that.__page.addClass ('visible');                     // ...
				});
			} else {
				this.__loading = $ (Mustache.abstractPageLoading ()).appendTo ('body');
				for (var _l = 0; _l < this.__elements.length; _l ++){              // abstractPage.jsxi:30
					var element = this.__elements[_l];                             // ...
					element.on (function (arg, errorCode){                         // abstractPage.jsxi:23
						if (__that.__AbstractPage_check (errorCode) && !__that.__isFailed){
							__that.__page.addClass ('visible');                    // abstractPage.jsxi:25
							Page.anchor ();                                        // abstractPage.jsxi:26
							__that.__loading.addClass ('hidden').timeout (function (arg){
								return $ (this).remove ();                         // abstractPage.jsxi:28
							}, 
							300);                                                  // ...
							__that.__loading = undefined;                          // abstractPage.jsxi:29
						}
					});
				}
			}
		};
		AbstractPage.prototype.__AbstractPage_failed = function (errorCode){       // abstractPage.jsxi:34
			this.__isFailed = true;                                                // abstractPage.jsxi:35
			for (var _m = 0; _m < this.__elements.length; _m ++){                  // abstractPage.jsxi:38
				var element = this.__elements[_m];                                 // ...
				element.destroy ();                                                // ...
			}
			if (this.__loading){                                                   // abstractPage.jsxi:76
				this.__loading.addClass ('hidden').timeout (function (arg){        // abstractPage.jsxi:41
					return $ (this).remove ();                                     // ...
				}, 
				300);                                                              // ...
				this.__loading = undefined;                                        // abstractPage.jsxi:42
			}
			document[(document instanceof AbstractPage ? '__title' : 'title')] = 'Поня.ч – Ошибка';
			this.__page.addClass ('visible');                                      // abstractPage.jsxi:47
			var data;                                                              // abstractPage.jsxi:49
			switch (errorCode){                                                    // abstractPage.jsxi:51
				case 1002:                                                         // abstractPage.jsxi:52
					data = Mustache.abstractPageVersionsMismatch ();               // abstractPage.jsxi:53
					break;                                                         // abstractPage.jsxi:54
				case 1003:                                                         // abstractPage.jsxi:55
					data = Mustache.abstractPageEverythingIsBad ();                // abstractPage.jsxi:56
					break;                                                         // abstractPage.jsxi:57
				case 1001:                                                         // abstractPage.jsxi:58
					data = Mustache.abstractPagePreprocessingFailed ();            // abstractPage.jsxi:59
					break;                                                         // abstractPage.jsxi:60
				case 1404:                                                         // abstractPage.jsxi:61
					data = Mustache.abstractPageNotFound ();                       // abstractPage.jsxi:62
					break;                                                         // abstractPage.jsxi:63
				case 1004:                                                         // abstractPage.jsxi:64
					data = Mustache.abstractPageUnsupported ();                    // abstractPage.jsxi:65
					break;                                                         // abstractPage.jsxi:66
				default:
					data = Mustache.abstractPageDefaultError ();                   // abstractPage.jsxi:68
			}
			data = data.match ([object Object]);                                   // abstractPage.jsxi:71
			this.__page.html (Mustache.abstractPageFailed ({
				caption: data[1],                                                  // abstractPage.jsxi:75
				description: data[2],                                              // abstractPage.jsxi:76
				errorCode: errorCode,                                              // abstractPage.jsxi:77
				errorDescription: Errors.description (errorCode)                   // abstractPage.jsxi:78
			}));
		};
		AbstractPage.prototype.__AbstractPage_check = function (errorCode){        // abstractPage.jsxi:83
			if (this.__isFailed)                                                   // abstractPage.jsxi:76
				return true;                                                       // abstractPage.jsxi:85
			if (errorCode !== undefined){                                          // abstractPage.jsxi:87
				this.__AbstractPage_failed (errorCode);                            // abstractPage.jsxi:76
				return true;                                                       // abstractPage.jsxi:89
			}
			for (var _n = 0; _n < this.__elements.length; _n ++){                  // abstractPage.jsxi:97
				var element = this.__elements[_n];                                 // ...
				if (element[(element instanceof AbstractPage ? '__isFailed' : 'isFailed')]){
					this.__AbstractPage_failed ();                                 // abstractPage.jsxi:76
					return true;                                                   // abstractPage.jsxi:95
				} else if (!element.isLoaded && !element[(element instanceof AbstractPage ? '__isFailed' : 'isFailed')])
					return false;                                                  // abstractPage.jsxi:97
			}
			return true;                                                           // abstractPage.jsxi:99
		};
		AbstractPage.prototype.elementByNode = function (node){                    // abstractPage.jsxi:102
			for (var _o = 0; _o < this.__elements.length; _o ++){                  // abstractPage.jsxi:105
				var element = this.__elements[_o];                                 // ...
				if (element.host[0] === node)                                      // abstractPage.jsxi:104
					return element;                                                // abstractPage.jsxi:105
			}
		};
		AbstractPage.prototype.__title = function (){
			return 'Поня.ч – Загрузка...';                                         // abstractPage.jsxi:108
		};
		AbstractPage.prototype.destroy = function (){
			if (this.__page)                                                       // abstractPage.jsxi:76
				this.__page.removeClass ('visible').timeout (function (arg){       // abstractPage.jsxi:114
					return $ (this).remove ();                                     // ...
				}, 
				300);                                                              // ...
			for (var _p = 0; _p < this.__elements.length; _p ++){                  // abstractPage.jsxi:117
				var element = this.__elements[_p];                                 // ...
				element.destroy ();                                                // ...
			}
		};
		return AbstractPage;
	}(), 
	Crossdomain = function (){                                                     // crossdomain.jsxi:1
		var Crossdomain = function (){}, callbacks = {};                           // crossdomain.jsxi:2
		Crossdomain.request = function (url, arraybuffer, callback){               // crossdomain.jsxi:4
			if (typeof arraybuffer === 'function'){                                // crossdomain.jsxi:5
				callback = arraybuffer;                                            // crossdomain.jsxi:6
				arraybuffer = false;                                               // crossdomain.jsxi:7
			}
			if (callbacks.hasOwnProperty (url)){                                   // crossdomain.jsxi:10
				callbacks[url].push (callback);                                    // crossdomain.jsxi:11
			} else {
				callbacks[url] = [ callback ];                                     // crossdomain.jsxi:13
				if (arraybuffer){                                                  // crossdomain.jsxi:15
					var xhr = new XMLHttpRequest ();                               // crossdomain.jsxi:16
					xhr.open ('GET', Crossdomain.proxyUrl (url), true);            // crossdomain.jsxi:17
					xhr.responseType = 'arraybuffer';                              // crossdomain.jsxi:18
					xhr.onreadystatechange = function (arg){                       // crossdomain.jsxi:19
						if (this.readyState === 4){                                // ...
							handler (this.status >= 200 && this.status < 400 ? this.response : null);
						}
					};
					xhr.send ();                                                   // crossdomain.jsxi:22
				} else
					$.ajax ({
						url: Crossdomain.proxyUrl (url),                           // crossdomain.jsxi:76
						success: handler,                                          // crossdomain.jsxi:26
						error: handler.bind (null, null)                           // crossdomain.jsxi:27
					});
			}
			function handler (arg){                                                // crossdomain.jsxi:31
				{
					var _9 = callbacks[url];                                       // crossdomain.jsxi:33
					for (var _8 = 0; _8 < _9.length; _8 ++){                       // ...
						var callback = _9[_8];                                     // ...
						callback (arg);                                            // ...
					}
					_9 = undefined;                                                // ...
				}
				delete callbacks[url];                                             // crossdomain.jsxi:34
			}
		};
		Crossdomain.proxyUrl = function (url){                                     // crossdomain.jsxi:38
			return 'http://www.corsproxy.com/' + url.replace ([object Object], '');
		};
		return Crossdomain;
	}(), 
	Message = function (){                                                         // message.jsxi:1
		var Message = function (type, message, removable){                         // message.jsxi:8
				var html = type === 'loading' ? Mustache.messageLoading () : Mustache.message ({ type: type, message: message });
				this.__Message_element = $ (html);                                 // message.jsxi:16
				if (removable)                                                     // message.jsxi:18
					this.__Message_element.addClass ('removable').on ('click', __bo (this, 'hide'));
				if (typeof removable === 'number')                                 // message.jsxi:20
					setTimeout (__bo (this, 'hide'), removable);                   // message.jsxi:21
			}, 
			host;                                                                  // message.jsxi:5
		Message.prototype.show = function (){
			if (!host)                                                             // message.jsxi:25
				host = $ (Mustache.messageHost ()).appendTo (document.body);       // message.jsxi:26
			this.__Message_element.appendTo (host).timeout (function (arg){        // message.jsxi:28
				return $ (this).addClass ('visible');                              // ...
			});
			host.find ('[data-state=\"removing\"]').remove ();                     // message.jsxi:29
			return this;                                                           // message.jsxi:31
		};
		Message.prototype.hide = function (){
			this.__Message_element.removeClass ('visible').data ('state', 'removing').timeout (function (arg){
				return $ (this).remove ();                                         // message.jsxi:35
			}, 
			300);                                                                  // ...
			return this;                                                           // message.jsxi:36
		};
		return Message;
	}(), 
	AbstractRequest = function (){                                                 // abstractRequest.jsxi:1
		var AbstractRequest = function (mode, params, postArgs){                   // abstractRequest.jsxi:8
				if (this.constructor === AbstractRequest)
					throw new Error ('Trying to instantiate abstract class AbstractRequest');
				console.assert (mode, 'Mode required');                            // abstractRequest.jsxi:9
				this.__AbstractRequest_jsonArgs = { mode: mode };                  // abstractRequest.jsxi:11
				if (params)                                                        // abstractRequest.jsxi:13
					for (var key in params){                                       // abstractRequest.jsxi:14
						var value = params[key];                                   // abstractRequest.jsxi:16
						if (value !== undefined && value !== null)                 // abstractRequest.jsxi:15
							this.__AbstractRequest_jsonArgs[key] = String (value);
					}
				this.__AbstractRequest_postArgs = postArgs;                        // abstractRequest.jsxi:18
			}, 
			active = {},                                                           // abstractRequest.jsxi:2
			additional = {},                                                       // ...
			wait = false,                                                          // ...
			first = true;                                                          // ...
		AbstractRequest.prototype.__AbstractRequest_process = function (){
			var __that = this;                                                     // abstractRequest.jsxi:76
			var json = [], entries = [], data = new FormData ();                   // abstractRequest.jsxi:26
			for (var key in active){                                               // abstractRequest.jsxi:28
				var value = active[key];                                           // abstractRequest.jsxi:31
				json.push (key);                                                   // abstractRequest.jsxi:29
				entries.push (value);                                              // abstractRequest.jsxi:30
			}
			for (var key in additional){                                           // abstractRequest.jsxi:33
				var value = additional[key];                                       // abstractRequest.jsxi:39
				if (value !== undefined){                                          // abstractRequest.jsxi:34
					if (typeof value === 'object' && value.data)                   // abstractRequest.jsxi:35
						data.append (key,                                          // abstractRequest.jsxi:36
							value.data instanceof ArrayBuffer ? new Blob ([ value.data ]) : value.data,
							value.name);                                           // ...
					else
						data.append (key, value);                                  // abstractRequest.jsxi:38
				}
			}
			data.append ('data', '[' + json.join (',') + ']');                     // abstractRequest.jsxi:41
			$.ajax ({
				type: 'POST',                                                      // abstractRequest.jsxi:44
				url: '/api.php',                                                   // abstractRequest.jsxi:45
				contentType: false,                                                // abstractRequest.jsxi:46
				processData: false,                                                // abstractRequest.jsxi:47
				data: data,                                                        // abstractRequest.jsxi:48
				success: success,                                                  // abstractRequest.jsxi:49
				error: error                                                       // abstractRequest.jsxi:50
			});
			additional = {};                                                       // abstractRequest.jsxi:53
			active = {};                                                           // abstractRequest.jsxi:54
			wait = false;                                                          // abstractRequest.jsxi:55
			function success (data){                                               // abstractRequest.jsxi:57
				if (__that.__AbstractRequest_cancelled)                            // abstractRequest.jsxi:76
					return;                                                        // abstractRequest.jsxi:59
				if (first === true){                                               // abstractRequest.jsxi:61
					if (Preferences.get ('debug-profiling'))                       // abstractRequest.jsxi:62
						first = null;                                              // abstractRequest.jsxi:63
					else
						first = false;                                             // abstractRequest.jsxi:65
				}
				try {                                                              // abstractRequest.jsxi:100
					if (typeof data === 'object' && data.version !== 1)            // abstractRequest.jsxi:69
						throw new Error (1002);                                    // abstractRequest.jsxi:70
					if (typeof data !== 'object' || !(data.data instanceof Array) || data.data.length !== entries.length || typeof data.timestamp !== 'number')
						throw new Error (1003);                                    // abstractRequest.jsxi:76
					__dt (true, 'loaded data preprocessing');                      // abstractRequest.jsxi:78
					var preprocessed = new Array (data.data.length);               // abstractRequest.jsxi:80
					{
						var _12 = data.data;                                       // abstractRequest.jsxi:89
						for (var i = 0; i < _12.length; i ++){                     // abstractRequest.jsxi:82
							var response = _12[i];                                 // abstractRequest.jsxi:89
							var result = entries[i].request.__preprocess (response, data.timestamp);
							if (result && typeof result === 'object')              // abstractRequest.jsxi:85
								console.assert (!result.hasOwnProperty ('error') || typeof result.error === 'number',
									'Error must be number');                       // abstractRequest.jsxi:86
							preprocessed[i] = result;                              // abstractRequest.jsxi:88
						}
						_12 = undefined;                                           // abstractRequest.jsxi:89
					}
				} catch (e){                                                       // abstractRequest.jsxi:100
					if ([object Object].test (e.message)){                         // abstractRequest.jsxi:91
						console.error ('POST ' + location.origin + '/api.php ' + e.message + ' (' + Errors.description (+ e.message) + ')');
						error ({ status: + e.message });                           // abstractRequest.jsxi:93
					} else {
						console.warn (data);                                       // abstractRequest.jsxi:95
						console.error (e.stack);                                   // abstractRequest.jsxi:96
						error ({ status: 1001 });                                  // abstractRequest.jsxi:97
					}
					return;                                                        // abstractRequest.jsxi:99
				} 
				__dt (false, 'loaded data preprocessing');                         // abstractRequest.jsxi:102
				__dt (true, 'request callbacks');                                  // ...
				for (var i = 0; i < preprocessed.length; i ++){                    // abstractRequest.jsxi:104
					var response = preprocessed[i];                                // abstractRequest.jsxi:110
					var _14 = entries[i].callbacks;                                // ...
					for (var _13 = 0; _13 < _14.length; _13 ++){                   // ...
						var callback = _14[_13];                                   // ...
						if (response && response.error)                            // abstractRequest.jsxi:106
							callback (null, response.error);                       // abstractRequest.jsxi:107
						else
							callback (response, data.timestamp);                   // abstractRequest.jsxi:109
					}
					_14 = undefined;                                               // abstractRequest.jsxi:110
				}
				__dt (false, 'request callbacks');                                 // abstractRequest.jsxi:112
				if (first === null){                                               // abstractRequest.jsxi:114
					console.profileEnd ();                                         // abstractRequest.jsxi:115
					first = false;                                                 // abstractRequest.jsxi:116
				}
			}
			function error (arg){                                                  // abstractRequest.jsxi:120
				if (__that.__AbstractRequest_cancelled)                            // abstractRequest.jsxi:76
					return;                                                        // abstractRequest.jsxi:122
				for (var _17 = 0; _17 < entries.length; _17 ++){                   // abstractRequest.jsxi:126
					var entry = entries[_17];                                      // ...
					var _16 = entry.callbacks;                                     // ...
					for (var _15 = 0; _15 < _16.length; _15 ++){                   // ...
						var callback = _16[_15];                                   // ...
						callback (null, arg.status);                               // ...
					}
					_16 = undefined;                                               // ...
				}
			}
		};
		AbstractRequest.prototype.send = function (callback){                      // abstractRequest.jsxi:130
			console.assert (typeof callback === 'function', 'Wrong argument');     // abstractRequest.jsxi:131
			var serialized = JSON.stringify (this.__AbstractRequest_jsonArgs);     // abstractRequest.jsxi:133
			if (this.__AbstractRequest_postArgs)                                   // abstractRequest.jsxi:76
				for (var key in this.__AbstractRequest_postArgs){                  // ...
					var value = this.__AbstractRequest_postArgs[key];              // abstractRequest.jsxi:137
					additional[key] = value;                                       // ...
				}
			if (active.hasOwnProperty (serialized)){                               // abstractRequest.jsxi:139
				active[serialized].callbacks.push (callback);                      // abstractRequest.jsxi:140
			} else {
				active[serialized] = { request: this, callbacks: [ callback ] };   // abstractRequest.jsxi:142
				if (!wait){                                                        // abstractRequest.jsxi:144
					wait = true;                                                   // abstractRequest.jsxi:145
					setTimeout (__bo (this, '__AbstractRequest_process'), 10);     // abstractRequest.jsxi:146
				}
			}
			return this;                                                           // abstractRequest.jsxi:150
		};
		AbstractRequest.prototype.cancel = function (){
			this.__AbstractRequest_cancelled = true;                               // abstractRequest.jsxi:154
			return this;                                                           // abstractRequest.jsxi:155
		};
		return AbstractRequest;
	}(), 
	AbstractElement = function (){                                                 // abstractElement.jsxi:1
		var AbstractElement = function (host){                                     // abstractElement.jsxi:8
			if (this.constructor === AbstractElement)
				throw new Error ('Trying to instantiate abstract class AbstractElement');
			this.isFailed = false;                                                 // abstractElement.jsxi:5
			this.__AbstractElement_callbacks = [];                                 // abstractElement.jsxi:6
			this.host = $ (host);                                                  // abstractElement.jsxi:9
			this.isLoaded = !!this.__param ('loaded');                             // abstractElement.jsxi:76
			this.__AbstractElement_fadable = this.isLoaded;                        // ...
		};
		AbstractElement.prototype.on = function (fn){                              // abstractElement.jsxi:16
			if (!this.isLoaded)                                                    // abstractElement.jsxi:76
				this.__AbstractElement_callbacks.push (fn);                        // abstractElement.jsxi:18
		};
		AbstractElement.prototype.__loaded = function (){
			if (!this.isLoaded && !this.isFailed){                                 // abstractElement.jsxi:76
				this.isLoaded = true;                                              // abstractElement.jsxi:23
				for (var _2 = 0; _2 < this.__AbstractElement_callbacks.length; _2 ++){
					var callback = this.__AbstractElement_callbacks[_2];           // abstractElement.jsxi:25
					callback ();                                                   // ...
				}
				this.__AbstractElement_callbacks = undefined;                      // abstractElement.jsxi:26
			}
		};
		AbstractElement.prototype.__failed = function (error){                     // abstractElement.jsxi:29
			if (!this.isLoaded && !this.isFailed){                                 // abstractElement.jsxi:76
				this.isFailed = true;                                              // abstractElement.jsxi:31
				for (var _3 = 0; _3 < this.__AbstractElement_callbacks.length; _3 ++){
					var callback = this.__AbstractElement_callbacks[_3];           // abstractElement.jsxi:33
					callback (null, error);                                        // ...
				}
				this.__AbstractElement_callbacks = undefined;                      // abstractElement.jsxi:34
			}
		};
		AbstractElement.prototype.__param = function (key, required){              // abstractElement.jsxi:37
			var result = this.host.attr ('data-' + key);                           // abstractElement.jsxi:38
			if (required)                                                          // abstractElement.jsxi:39
				console.assert (result, 'Param \"' + key + '\" required');         // abstractElement.jsxi:40
			return result;                                                         // abstractElement.jsxi:41
		};
		AbstractElement.prototype.__set = function (id, html){                     // abstractElement.jsxi:44
			if (typeof html !== 'string'){                                         // abstractElement.jsxi:45
				html = id;                                                         // abstractElement.jsxi:46
				id = undefined;                                                    // abstractElement.jsxi:47
			}
			if (html){                                                             // abstractElement.jsxi:50
				if (id){                                                           // abstractElement.jsxi:51
					(typeof id === 'string' ? this.host.findId (id) : id).empty (html)[0].insertAdjacentHTML ('beforeend', html);
				} else {
					if (this.__AbstractElement_fadable){                           // abstractElement.jsxi:76
						this.host.children ().css ('opacity', 0).timeout (function (arg){
							return $ (this).remove ();                             // abstractElement.jsxi:59
						}, 
						300);                                                      // ...
					} else {
						this.host.empty ();                                        // abstractElement.jsxi:61
					}
					this.host[0].insertAdjacentHTML ('beforeend', html);           // abstractElement.jsxi:64
					if (this.__AbstractElement_fadable)                            // abstractElement.jsxi:76
						this.host.children ().addClass ('fading').timeout (function (arg){
							return $ (this).addClass ('visible');                  // abstractElement.jsxi:69
						});
				}
			}
		};
		AbstractElement.__types = {};                                              // abstractElement.jsxi:74
		AbstractElement.process = function (element){                              // abstractElement.jsxi:76
			if (element === undefined)                                             // ...
				element = document.body;                                           // ...
			var result = [];                                                       // abstractElement.jsxi:77
			$ (element).find ('[data-element]').each (function (arg){              // abstractElement.jsxi:79
				var host = $ (this), temp = host.attr ('data-element');            // abstractElement.jsxi:81
				host.removeAttr ('data-element').addClass ('host');                // abstractElement.jsxi:83
				console.assert (AbstractElement.__types[temp],                     // abstractElement.jsxi:85
					'Element type \"' + temp + '\" not found');                    // ...
				result.push (new AbstractElement.__types[temp](host));             // abstractElement.jsxi:86
			});
			if (result.length)                                                     // abstractElement.jsxi:89
				result = result.concat (AbstractElement.process (element));        // abstractElement.jsxi:90
			return result;                                                         // abstractElement.jsxi:92
		};
		return AbstractElement;
	}(), 
	Autoupdate = function (){                                                      // autoupdate.jsxi:1
		var Autoupdate = function (){}, 
			dispatcher = new Dispatcher (),                                        // autoupdate.jsxi:2
			timeout = false;                                                       // autoupdate.jsxi:3
		function interval (){                                                      // autoupdate.jsxi:5
			return Math.min (Math.max (Preferences.get ('autoupdate-interval'), 5), 9999) * 1000;
		}
		function initialize (){                                                    // autoupdate.jsxi:8
			if (timeout === false){                                                // autoupdate.jsxi:9
				timeout = setTimeout (update, interval ());                        // autoupdate.jsxi:10
				Preferences.on ('autoupdate autoupdate-interval', Autoupdate.force);
			}
		}
		Autoupdate.on = function (fn){                                             // autoupdate.jsxi:14
			initialize ();                                                         // autoupdate.jsxi:15
			dispatcher.on (fn);                                                    // autoupdate.jsxi:16
		};
		Autoupdate.off = function (fn){                                            // autoupdate.jsxi:19
			return dispatcher.off (fn);                                            // autoupdate.jsxi:20
		};
		Autoupdate.force = function (){                                            // autoupdate.jsxi:22
			if (timeout !== false)                                                 // autoupdate.jsxi:23
				clearTimeout (timeout);                                            // autoupdate.jsxi:24
			update ();                                                             // autoupdate.jsxi:25
		};
		function update (){                                                        // autoupdate.jsxi:28
			if (Preferences.get ('autoupdate'))                                    // autoupdate.jsxi:29
				dispatcher.call ();                                                // autoupdate.jsxi:30
			timeout = setTimeout (update, interval ());                            // autoupdate.jsxi:31
		}
		return Autoupdate;
	}(), 
	Footer = function (){                                                          // footer.jsxi:1
		var Footer = function (host){                                              // footer.jsxi:7
			AbstractElement.call (this, host);                                     // footer.jsxi:76
			this.__set (Mustache.footer (), true);                                 // ...
			this.__loaded ();                                                      // ...
		};
		__pe (Footer, AbstractElement);
		Footer.prototype.destroy = function (){};
		(function (arg){                                                           // footer.jsxi:5
			AbstractElement.__types['footer'] = Footer;                            // ...
		}());
		return Footer;
	}(), 
	Header = function (){                                                          // header.jsxi:1
		var Header = function (host){                                              // header.jsxi:12
			AbstractElement.call (this, host);                                     // header.jsxi:76
			this.__Header_section = this.__param ('section', true);                // ...
			this.__Header_documentTitle = this.__param ('set-title');              // ...
			this.__set (Mustache.header ());                                       // ...
			this.__Header_request = new SectionsRequest ().send (__bo (this, '__Header_build'));
		};
		__pe (Header, AbstractElement);
		Header.prototype.__Header_updateTitle = function (value){                  // header.jsxi:23
			return document.title = value ? this.__Header_description : 'Поня.ч – ' + this.__Header_description;
		};
		Header.prototype.__Header_build = function (data, errorCode){              // header.jsxi:26
			var __that = this;                                                     // header.jsxi:76
			if (data === null){                                                    // header.jsxi:27
				this.__failed (errorCode);                                         // header.jsxi:76
			} else {
				var entry = data[0].filter (function (arg){                        // header.jsxi:30
						return arg.name === __that.__Header_section;               // header.jsxi:76
					})[0],                                                         // header.jsxi:30
					url;                                                           // header.jsxi:31
				if (entry){                                                        // header.jsxi:33
					this.__Header_description = entry[(entry instanceof Header ? '__Header_description' : 'description')] || '/' + this.__Header_section + '/';
					url = '/' + this.__Header_section + '/';                       // header.jsxi:35
				} else {
					entry = data[1].filter (function (arg){                        // header.jsxi:37
						return arg.url === '/' + __that.__Header_section;          // header.jsxi:76
					})[0];                                                         // header.jsxi:37
					if (entry){                                                    // header.jsxi:39
						this.__Header_description = entry.name;                    // header.jsxi:40
						url = entry.url;                                           // header.jsxi:41
					} else {
						this.__Header_description = '/' + this.__Header_section + '/';
					}
				}
				this.__set ('content',                                             // header.jsxi:47
					Mustache.headerContent (entry, { url: url, description: this.__Header_description }),
					true);                                                         // ...
				this.__loaded ();                                                  // header.jsxi:76
				if (this.__Header_documentTitle)                                   // ...
					Preferences.on ('old-style-title', __bo (this, '__Header_updateTitle'));
			}
		};
		Header.prototype.destroy = function (){
			Preferences.off (__bo (this, '__Header_updateTitle'));                 // header.jsxi:56
			this.__Header_request.cancel ();                                       // header.jsxi:57
		};
		(function (arg){                                                           // header.jsxi:5
			AbstractElement.__types['header'] = Header;                            // ...
		}());
		return Header;
	}(), 
	ThreadPage = function (){                                                      // threadPage.jsxi:1
		var ThreadPage = function (section, thread){                               // threadPage.jsxi:7
			this.__ThreadPage_section = section;                                   // threadPage.jsxi:8
			this.__ThreadPage_thread = thread;                                     // threadPage.jsxi:9
		};
		__pe (ThreadPage, AbstractPage);
		ThreadPage.prototype.build = function (data, error){                       // threadPage.jsxi:12
			return Mustache.threadPage ({
				section: this.__ThreadPage_section,                                // threadPage.jsxi:76
				thread: this.__ThreadPage_thread                                   // ...
			});
		};
		return ThreadPage;
	}(), 
	StaticPage = function (){                                                      // staticPage.jsxi:1
		var StaticPage = function (path){                                          // staticPage.jsxi:7
			this.__StaticPage_path = path;                                         // staticPage.jsxi:8
		};
		__pe (StaticPage, AbstractPage);
		StaticPage.prototype.__title = function (){
			return 'Поня.ч';                                                       // staticPage.jsxi:12
		};
		StaticPage.prototype.build = function (data){                              // staticPage.jsxi:14
			return Mustache.staticPage ({ host: location.host, path: this.__StaticPage_path });
		};
		return StaticPage;
	}(), 
	PostsList = function (){                                                       // postsList.jsxi:1
		var PostsList = function (host){                                           // postsList.jsxi:33
				this.__PostsList_faviconSwitched = false;                          // postsList.jsxi:26
				this.__PostsList_unread = 0;                                       // postsList.jsxi:29
				AbstractElement.call (this, host);                                 // postsList.jsxi:76
				this.__PostsList_section = this.__param ('section');               // ...
				this.__PostsList_thread = this.__param ('thread');                 // ...
				this.__PostsList_documentTitle = this.__param ('set-title');       // ...
				this.__PostsList_request = new PostsRequest (this.__PostsList_section, this.__PostsList_thread).send (__bo (this, '__PostsList_build'));
				Autoupdate.on (__bo (this, '__PostsList_update'));                 // postsList.jsxi:42
				Preferences.on ('autoupdate-mark-new form-position',               // postsList.jsxi:43
					__bo (this, '__PostsList_preferences'));                       // postsList.jsxi:76
				if (this.__PostsList_documentTitle)                                // ...
					Preferences.on ('old-style-title', __bo (this, '__PostsList_preferences'));
				Form.on ('sended', __bo (this, '__PostsList_sended'));             // postsList.jsxi:46
				this.__PostsList_blinkId = setInterval (__bo (this, '__PostsList_faviconBlink'), 800);
			}, 
			focus = document.hasFocus (),                                          // postsList.jsxi:5
			onfocus,                                                               // postsList.jsxi:6
			onblur,                                                                // postsList.jsxi:7
			faviconLink;                                                           // postsList.jsxi:8
		__pe (PostsList, AbstractElement);
		PostsList.prototype.__PostsList_preferences = function (value, key){       // postsList.jsxi:51
			switch (key){                                                          // postsList.jsxi:52
				case 'old-style-title':                                            // postsList.jsxi:53
					this.__PostsList_updateTitle ();                               // postsList.jsxi:76
					break;                                                         // postsList.jsxi:55
				case 'autoupdate-mark-new':                                        // postsList.jsxi:56
					this.host.find ('.post .content.new').removeClass ('new');     // postsList.jsxi:57
					break;                                                         // postsList.jsxi:58
				case 'form-position':                                              // postsList.jsxi:59
					this.__PostsList_formPosition = value;                         // postsList.jsxi:60
					var buttons = this.host.find ('[data-reply-mode=\"send-post\"]'),
						forms = buttons.parent ().next ();                         // postsList.jsxi:63
					$ (document.body).toggleClass ('form-popup-in-thread', value === 'popup');
					if (buttons.length)                                            // postsList.jsxi:67
						switch (value){                                            // postsList.jsxi:68
							case 'popup':                                          // postsList.jsxi:69
								
							case 'hidden':                                         // postsList.jsxi:70
								var form = forms.filter ('.form');                 // postsList.jsxi:71
								if (form.length)                                   // postsList.jsxi:72
									form.prev ().find ('a')[0].click ();           // postsList.jsxi:73
								break;                                             // postsList.jsxi:74
							case 'top':                                            // postsList.jsxi:75
								
							case 'bottom':                                         // postsList.jsxi:76
								var id = value === 'top' ? 0 : 1;                  // postsList.jsxi:77
								if (!forms.eq (id).hasClass ('form'))              // postsList.jsxi:78
									buttons[id].click ();                          // postsList.jsxi:79
								break;                                             // postsList.jsxi:80
						}
					break;                                                         // postsList.jsxi:83
			}
		};
		PostsList.prototype.__PostsList_faviconBlink = function (){
			if (this.__PostsList_unread > 0 && Preferences.get ('autoupdate-favicon-blink') || this.__PostsList_faviconSwitched){
				var old = $ ('link[rel=\"shortcut icon\"]'), href;                 // postsList.jsxi:89
				if (!faviconLink)                                                  // postsList.jsxi:91
					faviconLink = old.attr ('href');                               // postsList.jsxi:92
				this.__PostsList_faviconSwitched = this.__PostsList_unread > 0 && !this.__PostsList_faviconSwitched;
				if (this.__PostsList_faviconSwitched)                              // postsList.jsxi:76
					href = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=';
				else
					href = faviconLink;                                            // postsList.jsxi:98
				old.remove ();                                                     // postsList.jsxi:100
				$ ('<link rel=\"shortcut icon\" href=\"' + href + '\">').appendTo (document.head);
			}
		};
		PostsList.prototype.__PostsList_opMessage = function (){
			return this.host.find ('.thread > .content blockquote').text ().trim ();
		};
		PostsList.prototype.__PostsList_resetNew = function (){
			return this.host.find ('.post .content.new').removeClass ('new');      // postsList.jsxi:110
		};
		PostsList.prototype.__PostsList_updateTitle = function (){
			if (this.isLoaded){                                                    // postsList.jsxi:76
				this.__PostsList_pageTitle ();                                     // ...
				var result = Preferences.get ('old-style-title') ? this.__PostsList_title : 'Поня.ч – ' + this.__PostsList_title;
				if (this.__PostsList_unread > 0)                                   // postsList.jsxi:117
					result = '[' + this.__PostsList_unread + '] ' + result;        // postsList.jsxi:118
				document[(document instanceof PostsList ? '__PostsList_title' : 'title')] = result;
			}
		};
		PostsList.prototype.__PostsList_pageTitle = function (){
			if (this.__PostsList_title)                                            // postsList.jsxi:76
				return this.__PostsList_title;                                     // ...
			var post = Posts.get (this.__PostsList_section, this.__PostsList_thread),
				text = post.subjectForced;                                         // postsList.jsxi:128
			return this.__PostsList_title = '/' + this.__PostsList_section + ' – ' + text;
		};
		PostsList.prototype.__PostsList_build = function (data, errorCode){        // postsList.jsxi:133
			var __that = this;                                                     // postsList.jsxi:76
			if (data === null){                                                    // postsList.jsxi:134
				this.__failed (errorCode);                                         // postsList.jsxi:76
			} else {
				__dt (true, 'posts list: html build');                             // postsList.jsxi:137
				var childs = '',                                                   // postsList.jsxi:139
					posts,                                                         // postsList.jsxi:140
					wrapper,                                                       // postsList.jsxi:141
					max = Preferences.get ('all-posts-at-a-time') ? 10000000000 : 25;
				if (data[0].hidden)                                                // postsList.jsxi:144
					Hiddens.show (this.__PostsList_section + '/' + this.__PostsList_thread);
				for (var i = 1; i < data.length && i < max; i ++)                  // postsList.jsxi:147
					childs += Post.buildHtml (data[i]);                            // postsList.jsxi:148
				posts = Post.buildHtml (data[0], { childs: childs });              // postsList.jsxi:150
				__dt (false, 'posts list: html build');                            // postsList.jsxi:152
				__dt (true, 'posts list: html set');                               // ...
				this.__set (Mustache.postsList ({ posts: posts }));                // postsList.jsxi:76
				var delayed = function (arg){                                      // postsList.jsxi:156
					if (i < data.length){                                          // postsList.jsxi:157
						for (var k = 0, childs = ''; i < data.length && k < max; i ++, k ++)
							childs += Post.buildHtml (data[i]);                    // postsList.jsxi:159
						if (!wrapper)                                              // postsList.jsxi:160
							wrapper = __that.host.findId ('childs')[0];            // postsList.jsxi:161
						wrapper.insertAdjacentHTML ('beforeend', childs);          // postsList.jsxi:162
						nextTick (delayed);                                        // postsList.jsxi:163
					} else {
						__dt (false, 'posts list: html set');                      // postsList.jsxi:165
						onfocus = function (arg){                                  // postsList.jsxi:167
							if (__that.__PostsList_unread > 0){                    // ...
								__that.__PostsList_faviconBlink ();                // postsList.jsxi:76
								__that.__PostsList_unread = 0;                     // postsList.jsxi:169
								if (__that.__PostsList_documentTitle)              // postsList.jsxi:76
									__that.__PostsList_updateTitle ();             // ...
							}
						};
						onblur = __bo (__that, '__PostsList_resetNew');            // ...
						__that.__loaded ();                                        // ...
						if (__that.__PostsList_formPosition === 'top' || __that.__PostsList_formPosition === 'bottom')
							__that.host.find ('[data-reply-mode=\"send-post\"]')[(__that.__PostsList_formPosition === 'top' ? 0 : 1)].click ();
						nextTick (function (arg){                                  // postsList.jsxi:181
							if (__that.__PostsList_documentTitle)                  // postsList.jsxi:76
								__that.__PostsList_updateTitle ();                 // ...
							Embed.process (__that.host);                           // postsList.jsxi:185
							Statistics.threadVisited (__that.__PostsList_section, __that.__PostsList_thread);
						});
					}
				};
				nextTick (delayed);                                                // postsList.jsxi:190
			}
		};
		PostsList.prototype.__PostsList_update = function (){
			var __that = this;                                                     // postsList.jsxi:76
			function handler (data){                                               // postsList.jsxi:194
				if (data === null){                                                // postsList.jsxi:195
					console.warn ('Not implemented at 196 line of postsList.jsxi');
				} else if (data.length > 0){                                       // postsList.jsxi:197
					var html = '';                                                 // postsList.jsxi:198
					for (var _u = 0; _u < data.length; _u ++){                     // postsList.jsxi:208
						var post = data[_u];                                       // ...
						html += Post.buildHtml (post,                              // postsList.jsxi:202
							!focus && Preferences.get ('autoupdate-mark-new') ? { newPost: true } : undefined);
					}
					if (!focus){                                                   // postsList.jsxi:208
						__that.__PostsList_unread += data.length;                  // postsList.jsxi:209
						if (__that.__PostsList_documentTitle)                      // postsList.jsxi:76
							__that.__PostsList_updateTitle ();                     // ...
						if (Preferences.get ('autoupdate-desktop-notifications')){
							if (__that.__PostsList_notification)                   // ...
								__that.__PostsList_notification.close ();          // postsList.jsxi:215
							var icon;                                              // postsList.jsxi:217
							for (var i = data.length - 1; i >= 0; i --)            // postsList.jsxi:219
								if (data[i].file){                                 // postsList.jsxi:220
									icon = data[i].file.thumbinal;                 // postsList.jsxi:221
									break;                                         // postsList.jsxi:222
								}
							__that.__PostsList_notification = new Notification (__that.__PostsList_pageTitle (),
								{
									body: __that.__PostsList_unread + ' нов' + __that.__PostsList_unread.postfix ('ое', 'ых', 'ых') + ' сообщени' + __that.__PostsList_unread.postfix ('е', 'я', 'й'),
									icon: icon                                     // postsList.jsxi:227
								});
							$ (__that.__PostsList_notification).click (function (arg){
								window.focus ();                                   // postsList.jsxi:232
							}).on ('show',                                         // postsList.jsxi:234
								function (arg){                                    // ...
									setTimeout (this.close.bind (this), 12000);    // postsList.jsxi:235
								});
						}
					}
					__that.host.findId ('childs')[0].insertAdjacentHTML ('beforeend', html);
					Embed.process (__that.host);                                   // postsList.jsxi:241
				}
			}
			if (this.isLoaded)                                                     // postsList.jsxi:76
				this.__PostsList_request = new ThreadRefreshRequest (this.__PostsList_section, this.__PostsList_thread).send (handler);
		};
		PostsList.prototype.__PostsList_sended = function (){
			if (Preferences.get ('scroll-after-send'))                             // postsList.jsxi:250
				setTimeout (function (arg){                                        // postsList.jsxi:251
					Application.scrollTo (10000000000);                            // postsList.jsxi:252
				}, 
				300);                                                              // postsList.jsxi:253
		};
		PostsList.prototype.destroy = function (){
			this.__PostsList_request.cancel ();                                    // postsList.jsxi:257
			Autoupdate.off (__bo (this, '__PostsList_update'));                    // postsList.jsxi:258
			Preferences.off (__bo (this, '__PostsList_preferences'));              // postsList.jsxi:259
			Form.off (__bo (this, '__PostsList_sended'));                          // postsList.jsxi:260
			if (this.__PostsList_notification)                                     // postsList.jsxi:76
				this.__PostsList_notification.close ();                            // postsList.jsxi:263
			clearInterval (this.__PostsList_blinkId);                              // postsList.jsxi:265
			$ (document.body).removeClass ('form-popup-in-thread');                // postsList.jsxi:266
			onblur = null;                                                         // postsList.jsxi:269
			onfocus = null;                                                        // postsList.jsxi:270
		};
		(function (arg){                                                           // postsList.jsxi:10
			AbstractElement.__types['posts-list'] = PostsList;                     // postsList.jsxi:11
			$ (window).on ('blur focus',                                           // postsList.jsxi:13
				function (arg){                                                    // ...
					focus = arg.type === 'focus';                                  // postsList.jsxi:14
					if (focus && typeof onfocus === 'function')                    // postsList.jsxi:15
						onfocus ();                                                // postsList.jsxi:16
					if (!focus && typeof onblur === 'function')                    // postsList.jsxi:17
						onblur ();                                                 // postsList.jsxi:18
				});
		}());
		return PostsList;
	}(), 
	SectionPage = function (){                                                     // sectionPage.jsxi:1
		var SectionPage = function (section, pageNumber){                          // sectionPage.jsxi:7
			this.__SectionPage_section = section;                                  // sectionPage.jsxi:8
			this.__SectionPage_pageNumber = pageNumber;                            // sectionPage.jsxi:9
		};
		__pe (SectionPage, AbstractPage);
		SectionPage.prototype.build = function (data, error){                      // sectionPage.jsxi:12
			return Mustache.sectionPage ({
				section: this.__SectionPage_section,                               // sectionPage.jsxi:76
				pageNumber: this.__SectionPage_pageNumber                          // ...
			});
		};
		return SectionPage;
	}(), 
	Posts = function (){                                                           // posts.jsxi:1
		var Posts = function (){}, 
			dispatcher = new Dispatcher (),                                        // posts.jsxi:2
			posts = {},                                                            // posts.jsxi:3
			threads = {};                                                          // posts.jsxi:4
		Posts.on = function (type, fn){                                            // posts.jsxi:6
			return dispatcher.on (type, fn);                                       // posts.jsxi:7
		};
		Posts.off = function (fn){                                                 // posts.jsxi:9
			return dispatcher.off (fn);                                            // posts.jsxi:10
		};
		function initialize (section){                                             // posts.jsxi:12
			if (!posts.hasOwnProperty (section)){                                  // posts.jsxi:13
				posts[section] = {};                                               // posts.jsxi:14
				threads[section] = {};                                             // posts.jsxi:15
			}
		}
		Posts.add = function (data){                                               // posts.jsxi:18
			initialize (data.section);                                             // posts.jsxi:19
			var sectionPosts = posts[data.section],                                // posts.jsxi:21
				sectionThreads = threads[data.section];                            // posts.jsxi:22
			sectionPosts[data.id] = data;                                          // posts.jsxi:24
			if (sectionThreads.hasOwnProperty (data.thread))                       // posts.jsxi:26
				sectionThreads[data.thread].push (data);                           // posts.jsxi:27
			else
				sectionThreads[data.thread] = [ data ];                            // posts.jsxi:29
			dispatcher.call ('add', data);                                         // posts.jsxi:31
		};
		Posts.remove = function (section, id){                                     // posts.jsxi:34
			var post = Posts.get (section, id);                                    // posts.jsxi:35
			if (post){                                                             // posts.jsxi:37
				post.deleted = true;                                               // posts.jsxi:38
				dispatcher.call ('remove', post.section + '/' + post.id);          // posts.jsxi:39
			}
		};
		Posts.get = function (section, id){                                        // posts.jsxi:43
			if (id === undefined){                                                 // posts.jsxi:44
				var temp = section.split ('/');                                    // posts.jsxi:45
				section = temp[0];                                                 // posts.jsxi:46
				id = temp[1];                                                      // posts.jsxi:47
			}
			initialize (section);                                                  // posts.jsxi:50
			return posts[section][id];                                             // posts.jsxi:51
		};
		Posts.thread = function (section, id){                                     // posts.jsxi:54
			if (id === undefined){                                                 // posts.jsxi:55
				var temp = section.split ('/');                                    // posts.jsxi:56
				section = temp[0];                                                 // posts.jsxi:57
				id = temp[1];                                                      // posts.jsxi:58
			}
			initialize (section);                                                  // posts.jsxi:61
			return threads[section][id];                                           // posts.jsxi:62
		};
		return Posts;
	}(), 
	IndexPage = function (){                                                       // indexPage.jsxi:1
		var IndexPage = function (){};
		__pe (IndexPage, AbstractPage);
		IndexPage.prototype.__title = function (){
			return 'Поня.ч';                                                       // indexPage.jsxi:6
		};
		IndexPage.prototype.build = function (data){                               // indexPage.jsxi:8
			return Mustache.indexPage ({ host: location.host });                   // indexPage.jsxi:9
		};
		return IndexPage;
	}(), 
	PostRequest = function (){                                                     // postRequest.jsxi:1
		var PostRequest = function (section, post){                                // postRequest.jsxi:4
			this.__PostRequest_section = section;                                  // postRequest.jsxi:5
			this.__PostRequest_post = post;                                        // postRequest.jsxi:6
			AbstractRequest.call (this, 'post', { board_name: section, post_id: post });
		};
		__pe (PostRequest, AbstractRequest);
		PostRequest.prototype.__preprocess = function (raw){                       // postRequest.jsxi:11
			if (raw === false)                                                     // postRequest.jsxi:12
				throw new Error (1404);                                            // postRequest.jsxi:13
			if (!raw || typeof raw !== 'object')                                   // postRequest.jsxi:15
				throw new Error (1003);                                            // postRequest.jsxi:16
			var post = PonyabaUtils.fix (raw, this.__PostRequest_section);         // postRequest.jsxi:18
			Posts.add (post);                                                      // postRequest.jsxi:19
			return post;                                                           // postRequest.jsxi:20
		};
		return PostRequest;
	}(), 
	StaticContent = function (){                                                   // staticContent.jsxi:1
		var StaticContent = function (host){                                       // staticContent.jsxi:10
			AbstractElement.call (this, host);                                     // staticContent.jsxi:76
			this.__set (Mustache.staticContent (), true);                          // ...
			this.__StaticContent_path = this.__param ('path');                     // ...
			this.__StaticContent_request = new StaticContentRequest (this.__StaticContent_path).send (__bo (this, '__build'));
		};
		__pe (StaticContent, AbstractElement);
		StaticContent.prototype.__build = function (data, errorCode){              // staticContent.jsxi:18
			if (data === null){                                                    // staticContent.jsxi:19
				this.__failed (errorCode);                                         // staticContent.jsxi:76
			} else {
				this.__set ('content', data, true);                                // ...
				this.__loaded ();                                                  // ...
			}
		};
		StaticContent.prototype.destroy = function (){
			this.__StaticContent_request.cancel ();                                // staticContent.jsxi:27
		};
		(function (arg){                                                           // staticContent.jsxi:5
			AbstractElement.__types['static-content'] = StaticContent;             // ...
		}());
		return StaticContent;
	}(), 
	Status = function (){                                                          // status.jsxi:1
		var Status = function (host){                                              // status.jsxi:10
			this.__Status_previous = {};                                           // status.jsxi:7
			AbstractElement.call (this, host);                                     // status.jsxi:76
			Autoupdate.on (__bo (this, '__Status_autoupdate'));                    // status.jsxi:13
			this.__Status_autoupdate ();                                           // status.jsxi:76
			this.__set (Mustache.status (), true);                                 // ...
		};
		__pe (Status, AbstractElement);
		Status.prototype.__Status_autoupdate = function (){
			return this.__Status_request = new StatusRequest ().send (__bo (this, '__Status_update'));
		};
		Status.prototype.__Status_update = function (data, errorCode){             // status.jsxi:22
			var params, html;                                                      // status.jsxi:23
			if (data === null){                                                    // status.jsxi:25
				this.__failed (errorCode);                                         // status.jsxi:76
			} else {
				params = $.extend ({ speedPostfix: data.speed.postfix ('', 'а', 'ов') }, data);
				if (params.speed !== this.__Status_previous.speed || params.online !== this.__Status_previous.online){
					this.__set (Mustache.status (params), true);                   // ...
					this.__loaded ();                                              // ...
					this.__Status_previous = params;                               // status.jsxi:33
				}
			}
		};
		Status.prototype.destroy = function (){
			if (this.__Status_request)                                             // status.jsxi:76
				this.__Status_request.cancel ();                                   // status.jsxi:40
			Autoupdate.off (__bo (this, '__Status_update'));                       // status.jsxi:41
		};
		(function (arg){                                                           // status.jsxi:5
			AbstractElement.__types['status'] = Status;                            // ...
		}());
		return Status;
	}(), 
	ThreadsList = function (){                                                     // threadsList.jsxi:1
		var ThreadsList = function (host){                                         // threadsList.jsxi:9
			AbstractElement.call (this, host, false);                              // threadsList.jsxi:76
			this.__ThreadsList_section = this.__param ('section');                 // ...
			this.__ThreadsList_pageNumber = this.__param ('page-number');          // ...
			this.__ThreadsList_request = new ThreadsRequest (this.__ThreadsList_section, this.__ThreadsList_pageNumber).send (__bo (this, '__ThreadsList_build'));
			Form.on ('sended', __bo (this, '__ThreadsList_sended'));               // threadsList.jsxi:16
		};
		__pe (ThreadsList, AbstractElement);
		ThreadsList.prototype.__ThreadsList_build = function (data, errorCode){    // threadsList.jsxi:20
			if (data === null){                                                    // threadsList.jsxi:21
				this.__failed (errorCode);                                         // threadsList.jsxi:76
			} else {
				__dt (true, 'threads list: html build');                           // threadsList.jsxi:24
				var threads = '', pages;                                           // threadsList.jsxi:27
				{
					var _11 = data.threads;                                        // threadsList.jsxi:37
					for (var i = 0; i < _11.length; i ++){                         // threadsList.jsxi:29
						var entry = _11[i];                                        // threadsList.jsxi:37
						var childs = '';                                           // threadsList.jsxi:30
						{
							var _10 = entry.childs;                                // threadsList.jsxi:33
							for (var _v = 0; _v < _10.length; _v ++){              // ...
								var child = _10[_v];                               // ...
								childs += Post.buildHtml (child);                  // ...
							}
							_10 = undefined;                                       // ...
						}
						entry.childs = childs;                                     // threadsList.jsxi:35
						threads += Post.buildHtml (entry, { threadInListMode: true });
					}
					_11 = undefined;                                               // threadsList.jsxi:37
				}
				if (data.pagesCount > 1){                                          // threadsList.jsxi:39
					pages = [];                                                    // threadsList.jsxi:40
					for (var i = 0; i < data.pagesCount; i ++)                     // threadsList.jsxi:42
						pages.push ({ current: i == this.__ThreadsList_pageNumber, number: i });
				}
				__dt (false, 'threads list: html build');                          // threadsList.jsxi:49
				__dt (true, 'threads list: html set');                             // ...
				this.__set (Mustache.threadsList ({
					section: this.__ThreadsList_section,                           // threadsList.jsxi:76
					threads: threads,                                              // threadsList.jsxi:54
					pageNumber: this.__ThreadsList_pageNumber,                     // threadsList.jsxi:76
					pages: pages && {
						previousPage: this.__ThreadsList_pageNumber == 0 ? false : this.__ThreadsList_pageNumber - 1,
						nextPage: this.__ThreadsList_pageNumber == data.pages - 1 ? false : this.__ThreadsList_pageNumber + 1,
						pages: pages                                               // threadsList.jsxi:59
					}
				}));
				__dt (false, 'threads list: html set');                            // threadsList.jsxi:64
				this.__loaded ();                                                  // threadsList.jsxi:76
				Embed.process (this.host);                                         // threadsList.jsxi:67
			}
		};
		ThreadsList.prototype.expand = function (button, count){                   // threadsList.jsxi:70
			var __that = this;                                                     // threadsList.jsxi:76
			var threadNode = button.closest ('.thread'),                           // threadsList.jsxi:71
				threadId = + threadNode.find ('[data-post]').data ('post').split ('/')[1],
				message = new Message ('loading').show ();                         // threadsList.jsxi:73
			this.__ThreadsList_request = new PostsRequest (this.__ThreadsList_section, threadId).send (function (data, error){
				if (data === null){                                                // threadsList.jsxi:76
					console.warn ('Not implemented at 77 line of threadsList.jsxi');
				} else {
					var html = '',                                                 // threadsList.jsxi:79
						from = Math.max (data.length - count, 1),                  // threadsList.jsxi:80
						omittedPosts = 0,                                          // threadsList.jsxi:81
						omittedImages = 0,                                         // threadsList.jsxi:82
						target = __that.host.find ('[data-post=\"' + __that.__ThreadsList_section + '/' + threadId + '\"] [data-id=\"childs\"]');
					for (var i = from; i < data.length; i ++){                     // threadsList.jsxi:85
						var post = data[i];                                        // threadsList.jsxi:86
						html += Post.buildHtml (post);                             // ...
					}
					for (var i = 1; i < from; i ++){                               // threadsList.jsxi:88
						omittedPosts ++;                                           // threadsList.jsxi:89
						if (data[i].file)                                          // threadsList.jsxi:91
							omittedImages ++;                                      // threadsList.jsxi:92
					}
					target.data ('expanded', count);                               // threadsList.jsxi:95
					__that.__set (target,                                          // threadsList.jsxi:96
						Mustache.postChilds ({
							omitted: PonyabaUtils.omitted (omittedPosts, omittedImages),
							childs: html                                           // threadsList.jsxi:98
						}));
					message.hide ();                                               // threadsList.jsxi:101
					Embed.process (__that.host);                                   // threadsList.jsxi:102
				}
			});
		};
		ThreadsList.prototype.__ThreadsList_sended = function (data){              // threadsList.jsxi:107
			var __that = this;                                                     // threadsList.jsxi:76
			if (data[(data instanceof ThreadsList ? '__ThreadsList_section' : 'section')] === this.__ThreadsList_section && data.thread !== undefined){
				var target = this.host.find ('[data-post=\"' + data[(data instanceof ThreadsList ? '__ThreadsList_section' : 'section')] + '/' + data.thread + '\"] [data-id=\"childs\"]'),
					count = target.data ('expanded', count) || 5;                  // threadsList.jsxi:110
				if (target.length > 0)                                             // threadsList.jsxi:112
					this.__ThreadsList_request = new PostsRequest (data[(data instanceof ThreadsList ? '__ThreadsList_section' : 'section')],
						data.thread).send (function (data, error){                 // threadsList.jsxi:113
						if (data === null){                                        // threadsList.jsxi:114
							console.warn ('Not implemented at 115 line of threadsList.jsxi');
						} else {
							var html = '',                                         // threadsList.jsxi:117
								from = Math.max (data.length - count, 1),          // threadsList.jsxi:118
								omittedPosts = 0,                                  // threadsList.jsxi:119
								omittedImages = 0;                                 // threadsList.jsxi:120
							for (var i = from; i < data.length; i ++){             // threadsList.jsxi:122
								var post = data[i];                                // threadsList.jsxi:123
								html += Post.buildHtml (post);                     // ...
							}
							for (var i = 1; i < from; i ++){                       // threadsList.jsxi:125
								omittedPosts ++;                                   // threadsList.jsxi:126
								if (data[i].file)                                  // threadsList.jsxi:128
									omittedImages ++;                              // threadsList.jsxi:129
							}
							__that.__set (target,                                  // threadsList.jsxi:132
								Mustache.postChilds ({
									omitted: PonyabaUtils.omitted (omittedPosts, omittedImages),
									childs: html                                   // threadsList.jsxi:134
								}));
							Embed.process (__that.host);                           // threadsList.jsxi:137
						}
					});
			}
		};
		ThreadsList.prototype.destroy = function (){
			Form.off (__bo (this, '__ThreadsList_sended'));                        // threadsList.jsxi:143
			this.__ThreadsList_request.cancel ();                                  // threadsList.jsxi:144
		};
		(function (arg){                                                           // threadsList.jsxi:5
			AbstractElement.__types['threads-list'] = ThreadsList;                 // ...
		}());
		return ThreadsList;
	}(), 
	AccountTypeRequest = function (){                                              // accountTypeRequest.jsxi:1
		var AccountTypeRequest = function (){                                      // accountTypeRequest.jsxi:2
			AbstractRequest.call (this, 'account_type');                           // accountTypeRequest.jsxi:76
		};
		__pe (AccountTypeRequest, AbstractRequest);
		AccountTypeRequest.prototype.__preprocess = function (data){               // accountTypeRequest.jsxi:6
			var result = { sections: data.moder_of };                              // accountTypeRequest.jsxi:7
			switch (data.type){                                                    // accountTypeRequest.jsxi:9
				case 'admin':                                                      // accountTypeRequest.jsxi:10
					result.type = 1;                                               // accountTypeRequest.jsxi:11
					break;                                                         // accountTypeRequest.jsxi:12
				case 'moder':                                                      // accountTypeRequest.jsxi:13
					result.type = 2;                                               // accountTypeRequest.jsxi:14
					break;                                                         // accountTypeRequest.jsxi:15
				case 'janitor':                                                    // accountTypeRequest.jsxi:16
					result.type = 3;                                               // accountTypeRequest.jsxi:17
					break;                                                         // accountTypeRequest.jsxi:18
				case 'earthpony':                                                  // accountTypeRequest.jsxi:19
					return false;                                                  // accountTypeRequest.jsxi:20
					break;                                                         // accountTypeRequest.jsxi:21
				default:
					throw new Error (1003);                                        // accountTypeRequest.jsxi:23
			}
			return result;                                                         // accountTypeRequest.jsxi:26
		};
		return AccountTypeRequest;
	}(), 
	AuthorizationRequest = function (){                                            // authorizationRequest.jsxi:1
		var AuthorizationRequest = function (login, password){                     // authorizationRequest.jsxi:2
			AbstractRequest.call (this, 'auth', { user: login, passwd: btoa (password) });
		};
		__pe (AuthorizationRequest, AbstractRequest);
		AuthorizationRequest.prototype.__preprocess = function (){
			return arg;                                                            // authorizationRequest.jsxi:7
		};
		return AuthorizationRequest;
	}(), 
	PostsRequest = function (){                                                    // postsRequest.jsxi:1
		var PostsRequest = function (section, thread){                             // postsRequest.jsxi:4
			this.__PostsRequest_section = section;                                 // postsRequest.jsxi:5
			this.__PostsRequest_thread = thread;                                   // postsRequest.jsxi:6
			AbstractRequest.call (this, 'thread', { board_name: section, thread_id: thread });
		};
		__pe (PostsRequest, AbstractRequest);
		PostsRequest.prototype.__preprocess = function (data, timestamp){          // postsRequest.jsxi:11
			ThreadRefreshRequest.timestamps[(this.__PostsRequest_section + '/' + this.__PostsRequest_thread)] = timestamp;
			var posts = new Array (data.length), post;                             // postsRequest.jsxi:15
			Answers.dispath = false;                                               // postsRequest.jsxi:17
			for (var i = 0; i < data.length; i ++){                                // postsRequest.jsxi:19
				var raw = data[i];                                                 // postsRequest.jsxi:26
				post = PonyabaUtils.fix (raw, this.__PostsRequest_section, i + 1);
				if (post){                                                         // postsRequest.jsxi:22
					Posts.add (post);                                              // postsRequest.jsxi:23
					posts[i] = post;                                               // postsRequest.jsxi:24
				}
			}
			Answers.dispath = true;                                                // postsRequest.jsxi:28
			return posts;                                                          // postsRequest.jsxi:30
		};
		return PostsRequest;
	}(), 
	SectionsRequest = function (){                                                 // sectionsRequest.jsxi:1
		var SectionsRequest = function (){                                         // sectionsRequest.jsxi:8
				AbstractRequest.call (this, 'chan');                               // sectionsRequest.jsxi:76
			}, 
			images = {
				test: 'http://ponyach.ru/images/logoboard/test.png',               // sectionsRequest.jsxi:3
				r34: 'http://ponyach.ru/images/logoboard/r34.png',                 // sectionsRequest.jsxi:4
				d: 'http://ponyach.ru/images/logoboard/d.png'                      // sectionsRequest.jsxi:5
			};
		__pe (SectionsRequest, AbstractRequest);
		SectionsRequest.prototype.__preprocess = function (data){                  // sectionsRequest.jsxi:12
			var result = [ [], [] ];                                               // sectionsRequest.jsxi:17
			for (var pos = 0; pos < data.length; pos ++){                          // sectionsRequest.jsxi:19
				var entry = data[pos];                                             // sectionsRequest.jsxi:42
				if (entry._target){                                                // sectionsRequest.jsxi:20
					result[1].push ({
						name: entry.name,                                          // sectionsRequest.jsxi:23
						url: entry._target.indexOf ('//') !== - 1 ? entry._target : '/' + entry._target,
						target: entry.outside ? '_blank' : undefined,              // sectionsRequest.jsxi:25
						description: entry.desc                                    // sectionsRequest.jsxi:26
					});
				} else {
					result[0].push ({
						name: entry.name,                                          // sectionsRequest.jsxi:31
						url: '/' + entry.name + '/',                               // sectionsRequest.jsxi:32
						position: (entry.order || 0) + pos / 1000,                 // sectionsRequest.jsxi:33
						description: entry.desc,                                   // sectionsRequest.jsxi:34
						params: {
							maxImageSize: entry.maximagesize,                      // sectionsRequest.jsxi:36
							maxReplies: entry.maxreplies,                          // sectionsRequest.jsxi:37
							maxMessageLength: entry.messagelength                  // sectionsRequest.jsxi:38
						}, 
						logo: images[entry.name]                                   // sectionsRequest.jsxi:40
					});
				}
			}
			result[0] = result[0].sort (function (a, b){                           // sectionsRequest.jsxi:44
				return a.position - b.position;                                    // ...
			});
			return result;                                                         // sectionsRequest.jsxi:45
		};
		return SectionsRequest;
	}(), 
	CallbackDispatcher = function (){                                              // dispatcher.jsxi:45
		var CallbackDispatcher = function (callback){                              // dispatcher.jsxi:48
			Dispatcher.apply (this, arguments);                                    // dispatcher.jsxi:76
			this.__CallbackDispatcher_callback = callback;                         // dispatcher.jsxi:49
		};
		__pe (CallbackDispatcher, Dispatcher);
		CallbackDispatcher.prototype.__add = function (type, handler){             // dispatcher.jsxi:52
			Dispatcher.prototype.__add.call (this, type, handler);                 // dispatcher.jsxi:76
			var temp = this.__CallbackDispatcher_callback (type, handler);         // dispatcher.jsxi:54
			if (temp !== undefined)                                                // dispatcher.jsxi:55
				handler (temp, type);                                              // dispatcher.jsxi:56
		};
		return CallbackDispatcher;
	}(), 
	StaticContentRequest = function (){                                            // staticContentRequest.jsxi:1
		var StaticContentRequest = function (target){                              // staticContentRequest.jsxi:2
			AbstractRequest.call (this, 'static', { target: target });             // staticContentRequest.jsxi:76
		};
		__pe (StaticContentRequest, AbstractRequest);
		StaticContentRequest.prototype.__preprocess = function (data){             // staticContentRequest.jsxi:6
			switch (data && data.error){                                           // staticContentRequest.jsxi:7
				case 'bad static page target':                                     // staticContentRequest.jsxi:8
					throw new Error (1404);                                        // staticContentRequest.jsxi:9
			}
			if (typeof data !== 'string')                                          // staticContentRequest.jsxi:12
				throw new Error (1003);                                            // staticContentRequest.jsxi:13
			if ([object Object].test (data))                                       // staticContentRequest.jsxi:15
				throw new Error (1004);                                            // staticContentRequest.jsxi:16
			return data;                                                           // staticContentRequest.jsxi:18
		};
		return StaticContentRequest;
	}(), 
	StatusRequest = function (){                                                   // statusRequest.jsxi:1
		var StatusRequest = function (arg){                                        // statusRequest.jsxi:2
			AbstractRequest.call (this, 'status');                                 // statusRequest.jsxi:76
		};
		__pe (StatusRequest, AbstractRequest);
		StatusRequest.prototype.__preprocess = function (data){                    // statusRequest.jsxi:6
			return data && typeof data.last_status === 'number' ? { speed: data.speed || 0, online: data.count || 0 } : { error: 1003 };
		};
		return StatusRequest;
	}(), 
	ThreadRefreshRequest = function (){                                            // threadRefreshRequest.jsxi:1
		var ThreadRefreshRequest = function (section, thread){                     // threadRefreshRequest.jsxi:6
			this.__ThreadRefreshRequest_section = section;                         // threadRefreshRequest.jsxi:7
			this.__ThreadRefreshRequest_thread = thread;                           // threadRefreshRequest.jsxi:8
			this.__ThreadRefreshRequest_timestamp = ThreadRefreshRequest.timestamps[(section + '/' + thread)];
			console.assert (this.__ThreadRefreshRequest_timestamp,                 // threadRefreshRequest.jsxi:76
				'Thread have to be loaded first');                                 // threadRefreshRequest.jsxi:11
			AbstractRequest.call (this,                                            // threadRefreshRequest.jsxi:76
				'new',                                                             // threadRefreshRequest.jsxi:13
				{
					board_name: section,                                           // ...
					thread_id: thread,                                             // ...
					timestamp: this.__ThreadRefreshRequest_timestamp - 1           // ...
				});
		};
		__pe (ThreadRefreshRequest, AbstractRequest);
		ThreadRefreshRequest.prototype.__preprocess = function (data, timestamp){
			ThreadRefreshRequest.timestamps[(this.__ThreadRefreshRequest_section + '/' + this.__ThreadRefreshRequest_thread)] = timestamp - 1;
			var threadEntry = Posts[(Posts instanceof ThreadRefreshRequest ? '__ThreadRefreshRequest_thread' : 'thread')](this.__ThreadRefreshRequest_section,
					this.__ThreadRefreshRequest_thread),                           // threadRefreshRequest.jsxi:76
				result = [],                                                       // threadRefreshRequest.jsxi:20
				post;                                                              // threadRefreshRequest.jsxi:21
			console.assert (threadEntry, 'Thread have to be loaded first');        // threadRefreshRequest.jsxi:23
			for (var i = 0; i < data.length; i ++){                                // threadRefreshRequest.jsxi:25
				var raw = data[i];                                                 // threadRefreshRequest.jsxi:32
				if (!raw.IS_DELETED && !Posts.get (this.__ThreadRefreshRequest_section, raw.id)){
					post = PonyabaUtils.fix (raw,                                  // threadRefreshRequest.jsxi:27
						this.__ThreadRefreshRequest_section,                       // threadRefreshRequest.jsxi:76
						threadEntry.length + 1);                                   // threadRefreshRequest.jsxi:27
					result.push (post);                                            // threadRefreshRequest.jsxi:28
					Posts.add (post);                                              // threadRefreshRequest.jsxi:29
				} else if (raw.IS_DELETED)                                         // threadRefreshRequest.jsxi:30
					Posts.remove (this.__ThreadRefreshRequest_section, raw.id);    // threadRefreshRequest.jsxi:31
			}
			return result;                                                         // threadRefreshRequest.jsxi:34
		};
		ThreadRefreshRequest.timestamps = {};                                      // threadRefreshRequest.jsxi:2
		return ThreadRefreshRequest;
	}(), 
	ThreadsRequest = function (){                                                  // threadsRequest.jsxi:1
		var ThreadsRequest = function (section, page){                             // threadsRequest.jsxi:4
			this.__ThreadsRequest_section = section;                               // threadsRequest.jsxi:5
			this.__ThreadsRequest_page = page;                                     // threadsRequest.jsxi:6
			AbstractRequest.call (this, 'board', { board_name: section, page: page });
		};
		__pe (ThreadsRequest, AbstractRequest);
		ThreadsRequest.prototype.__preprocess = function (data){                   // threadsRequest.jsxi:11
			var threads = new Array (data.threads.length), post;                   // threadsRequest.jsxi:13
			Answers.dispath = false;                                               // threadsRequest.jsxi:15
			{
				var _d = data.threads;                                             // threadsRequest.jsxi:40
				for (var i = 0; i < _d.length; i ++){                              // threadsRequest.jsxi:17
					var entry = _d[i];                                             // threadsRequest.jsxi:40
					var omittedPosts = entry.posts_count - entry.posts.length,     // threadsRequest.jsxi:18
						omittedImages = entry.files_count;                         // threadsRequest.jsxi:19
					{
						var _a = entry.posts;                                      // threadsRequest.jsxi:24
						for (var j = 0; j < _a.length; j ++){                      // threadsRequest.jsxi:21
							var raw = _a[j];                                       // threadsRequest.jsxi:24
							if (raw.file)                                          // threadsRequest.jsxi:22
								omittedImages --;                                  // threadsRequest.jsxi:23
						}
						_a = undefined;                                            // threadsRequest.jsxi:24
					}
					{
						var _b = entry.posts;                                      // threadsRequest.jsxi:39
						for (var j = 0; j < _b.length; j ++){                      // threadsRequest.jsxi:26
							var raw = _b[j];                                       // threadsRequest.jsxi:39
							post = PonyabaUtils.fix (raw,                          // threadsRequest.jsxi:27
								this.__ThreadsRequest_section,                     // threadsRequest.jsxi:76
								j + 1 + (j ? omittedPosts : 0));                   // threadsRequest.jsxi:27
							Posts.add (post);                                      // threadsRequest.jsxi:28
							if (j === 0){                                          // threadsRequest.jsxi:30
								threads[i] = $.extend (post,                       // threadsRequest.jsxi:31
									{
										omitted: PonyabaUtils.omitted (omittedPosts, omittedImages),
										stickied: !!entry.stickied,                // threadsRequest.jsxi:33
										locked: !!entry.locked,                    // threadsRequest.jsxi:34
										childs: []                                 // threadsRequest.jsxi:35
									});
							} else
								threads[i].childs.push (post);                     // threadsRequest.jsxi:38
						}
						_b = undefined;                                            // threadsRequest.jsxi:39
					}
				}
				_d = undefined;                                                    // threadsRequest.jsxi:40
			}
			Answers.dispath = true;                                                // threadsRequest.jsxi:42
			return { threads: threads, pagesCount: data.pages };                   // threadsRequest.jsxi:47
		};
		return ThreadsRequest;
	}(), 
	Menu = function (){                                                            // menu.jsxi:1
		var Menu = function (menu, from, position, fixed){                         // menu.jsxi:29
				var __that = this;                                                 // menu.jsxi:76
				console.assert (menus[menu], 'Wrong menu id \"' + menu + '\"');    // menu.jsxi:30
				this.menu = menu;                                                  // menu.jsxi:32
				this.from = from;                                                  // menu.jsxi:33
				this.position = position;                                          // menu.jsxi:34
				this.fixed = fixed;                                                // menu.jsxi:35
				var param = menus[menu].param ? menus[menu].param (from) : null,   // menu.jsxi:37
					context = param ? null : 'c' + + new Date (),                  // menu.jsxi:38
					params = { menu: menus[menu].menu, param: param, context: context },
					html = Mustache.menu (params);                                 // menu.jsxi:44
				if (context)                                                       // menu.jsxi:46
					from.attr ('id', context);                                     // menu.jsxi:47
				this.element = $ (html).appendTo (document.body).css ({
					position: fixed ? 'fixed' : 'absolute',                        // menu.jsxi:50
					top: position.top,                                             // menu.jsxi:51
					left: position.left                                            // menu.jsxi:52
				}).timeout (function (arg){                                        // menu.jsxi:53
					return __that.element.addClass ('visible');                    // ...
				});
			}, 
			menus = {
				'image-search': {
					menu: ImageSearch.items,                                       // menu.jsxi:7
					param: function (arg){                                         // menu.jsxi:8
						return arg.closest ('.thread, .post').find ('[data-type=\"image\"]').attr ('href');
					}
				}, 
				'thread-expand': {
					menu: [ 5, 15, 30, 50, 100 ].map (function (arg){              // menu.jsxi:12
						return { label: arg + ' постов', action: 'thread-expand:' + arg };
					})
				}, 
				'add-custom-section': {
					menu: [
						{
							label: 'Добавить кастомный раздел',                    // menu.jsxi:18
							action: 'custom-section:add'                           // ...
						}
					], 
					param: function (arg){                                         // menu.jsxi:19
						return arg.text ();                                        // ...
					}
				}, 
				'remove-custom-section': {
					menu: [
						{
							label: 'Удалить кастомный раздел',                     // menu.jsxi:22
							action: 'custom-section:remove'                        // ...
						}
					], 
					param: function (arg){                                         // menu.jsxi:23
						return arg.text ();                                        // ...
					}
				}
			}, 
			timeout;                                                               // menu.jsxi:56
		Menu.mouseover = function (element){                                       // menu.jsxi:58
			timeout = setTimeout (function (arg){                                  // menu.jsxi:59
				timeout = false;                                                   // menu.jsxi:60
				var rect = element.getBoundingClientRect (),                       // menu.jsxi:62
					parentRect = document.body.getBoundingClientRect (),           // menu.jsxi:63
					top = rect.top + rect.height - parentRect.top,                 // menu.jsxi:64
					left = rect.left - parentRect.left;                            // menu.jsxi:65
				element = $ (element);                                             // menu.jsxi:67
				var attribute = element.data ('menu'),                             // menu.jsxi:69
					detPopup = new Menu (attribute, element, { top: top, left: left }).element.mouseenter (mouseenter).mouseleave (mouseleave).click (mouseleave),
					timeout;                                                       // menu.jsxi:75
				function mouseenter (){                                            // menu.jsxi:77
					if (timeout){                                                  // menu.jsxi:78
						clearTimeout (timeout);                                    // menu.jsxi:79
						timeout = false;                                           // menu.jsxi:80
					}
				}
				function mouseleave (){                                            // menu.jsxi:83
					return timeout = setTimeout (function (arg){                   // menu.jsxi:84
						detPopup.removeClass ('visible').timeout (function (arg){
							return detPopup.remove ();                             // menu.jsxi:85
						}, 
						300);                                                      // ...
						timeout = false;                                           // menu.jsxi:86
					}, 
					300);                                                          // menu.jsxi:87
				}
				element.one ('mouseleave', mouseleave);                            // menu.jsxi:89
			}, 
			300);                                                                  // menu.jsxi:90
		};
		Menu.mouseout = function (){                                               // menu.jsxi:93
			if (timeout){                                                          // menu.jsxi:94
				clearTimeout (timeout);                                            // menu.jsxi:95
				timeout = false;                                                   // menu.jsxi:96
			}
		};
		return Menu;
	}(), 
	SendRequest = function (){                                                     // sendRequest.jsxi:1
		var SendRequest = function (section, thread, args){                        // sendRequest.jsxi:4
			this.__SendRequest_section = section;                                  // sendRequest.jsxi:5
			this.__SendRequest_thread = thread;                                    // sendRequest.jsxi:6
			this.__SendRequest_args = args;                                        // sendRequest.jsxi:7
			AbstractRequest.call (this,                                            // sendRequest.jsxi:76
				'add_post',                                                        // sendRequest.jsxi:9
				{
					board_name: section,                                           // sendRequest.jsxi:10
					thread_id: thread,                                             // sendRequest.jsxi:11
					name: args.name,                                               // sendRequest.jsxi:13
					email: args.email,                                             // sendRequest.jsxi:14
					subject: args.subject,                                         // sendRequest.jsxi:15
					message: args.message                                          // sendRequest.jsxi:16
				}, 
				{ imagefile: args.file });                                         // sendRequest.jsxi:19
		};
		__pe (SendRequest, AbstractRequest);
		SendRequest.prototype.__preprocess = function (raw){                       // sendRequest.jsxi:22
			Autoupdate.force ();                                                   // sendRequest.jsxi:23
			if (!raw || typeof raw !== 'object')                                   // sendRequest.jsxi:25
				throw new Error (1003);                                            // sendRequest.jsxi:26
			if ('error' in raw)                                                    // sendRequest.jsxi:28
				switch (raw.error){                                                // sendRequest.jsxi:29
					case 'empty message':                                          // sendRequest.jsxi:30
						return { error: 1420 };                                    // sendRequest.jsxi:31
					default:
						return { error: 1001 };                                    // sendRequest.jsxi:33
				}
			return { section: this.__SendRequest_section, id: raw.post_id };       // sendRequest.jsxi:39
		};
		return SendRequest;
	}(), 
	Answers = function (){                                                         // answers.jsxi:1
		var Answers = function (){}, 
			dispatcher = new Dispatcher (),                                        // answers.jsxi:5
			answers = {};                                                          // answers.jsxi:6
		Answers.dispath = true;                                                    // answers.jsxi:3
		Answers.on = function (type, fn){                                          // answers.jsxi:8
			return dispatcher.on (type, fn);                                       // answers.jsxi:9
		};
		Answers.off = function (fn){                                               // answers.jsxi:11
			return dispatcher.off (fn);                                            // answers.jsxi:12
		};
		function initialize (section){                                             // answers.jsxi:18
			if (!answers.hasOwnProperty (section))                                 // answers.jsxi:19
				return answers[section] = {};                                      // answers.jsxi:20
		}
		function answer (from, to){                                                // answers.jsxi:22
			return from.next.push ({ thread: to.thread, id: to.id });              // answers.jsxi:23
		}
		function handler (data){                                                   // answers.jsxi:28
			initialize (data.section);                                             // answers.jsxi:29
			var sectionAnswers = answers[data.section],                            // answers.jsxi:31
				update = Answers.dispath ? [] : null,                              // answers.jsxi:32
				other;                                                             // answers.jsxi:33
			{
				var _5 = data.previous;                                            // answers.jsxi:46
				for (var _4 = 0; _4 < _5.length; _4 ++){                           // ...
					var previous = _5[_4];                                         // ...
					other = Posts.get (data.section, previous);                    // answers.jsxi:36
					if (other){                                                    // answers.jsxi:38
						answer (other, data);                                      // answers.jsxi:39
						if (Answers.dispath)                                       // answers.jsxi:76
							update.push (data.section + '/' + previous);           // answers.jsxi:41
					} else if (sectionAnswers.hasOwnProperty (previous)){          // answers.jsxi:42
						sectionAnswers[previous].push (data.id);                   // answers.jsxi:43
					} else
						sectionAnswers[previous] = [ data.id ];                    // answers.jsxi:45
				}
				_5 = undefined;                                                    // answers.jsxi:46
			}
			if (sectionAnswers.hasOwnProperty (data.id)){                          // answers.jsxi:48
				{
					var _7 = sectionAnswers[data.id];                              // answers.jsxi:50
					for (var _6 = 0; _6 < _7.length; _6 ++){                       // ...
						var next = _7[_6];                                         // ...
						answer (data, Posts.get (data.section, next));             // ...
					}
					_7 = undefined;                                                // ...
				}
				delete sectionAnswers[data.id];                                    // answers.jsxi:51
			}
			if (Answers.dispath && update.length > 0)                              // answers.jsxi:54
				dispatcher.call (update);                                          // answers.jsxi:55
		}
		(function (arg){                                                           // answers.jsxi:14
			Posts.on ('add', handler);                                             // answers.jsxi:15
		}());
		return Answers;
	}(), 
	Favorites = function (){                                                       // favorites.jsxi:1
		var Favorites = function (){}, 
			dispatcher = new Dispatcher (),                                        // favorites.jsxi:2
			storage,                                                               // favorites.jsxi:3
			favorites;                                                             // favorites.jsxi:4
		Favorites.on = function (type, fn){                                        // favorites.jsxi:6
			return dispatcher.on (type, fn);                                       // favorites.jsxi:7
		};
		Favorites.off = function (fn){                                             // favorites.jsxi:9
			return dispatcher.off (fn);                                            // favorites.jsxi:10
		};
		function handler (data){                                                   // favorites.jsxi:27
			if (favorites[(data.section + '/' + data.id)])                         // favorites.jsxi:28
				data.favorited = true;                                             // favorites.jsxi:29
		}
		Favorites.add = function (post){                                           // favorites.jsxi:32
			if (!favorites.hasOwnProperty (post)){                                 // favorites.jsxi:33
				var data = Posts.get (post);                                       // favorites.jsxi:34
				console.assert (data, 'Post not loaded');                          // favorites.jsxi:35
				favorites[post] = {
					id: data.id,                                                   // favorites.jsxi:38
					section: data.section,                                         // favorites.jsxi:39
					subject: data.subjectForced                                    // favorites.jsxi:40
				};
				dispatcher.call ('add', post);                                     // favorites.jsxi:43
				storage.save ();                                                   // favorites.jsxi:44
			}
		};
		Favorites.remove = function (post){                                        // favorites.jsxi:47
			console.assert (favorites[post], 'Not in favorites');                  // favorites.jsxi:48
			delete favorites[post];                                                // favorites.jsxi:49
			dispatcher.call ('remove', post);                                      // favorites.jsxi:51
			storage.save ();                                                       // favorites.jsxi:52
		};
		Favorites.sorted = function (){                                            // favorites.jsxi:55
			var result = [], temp = {};                                            // favorites.jsxi:57
			for (var id in favorites){                                             // favorites.jsxi:59
				var entry = favorites[id];                                         // favorites.jsxi:64
				if (!temp.hasOwnProperty (entry.section)){                         // favorites.jsxi:60
					temp[entry.section] = { section: entry.section, entries: [ entry ] };
					result.push (temp[entry.section]);                             // favorites.jsxi:62
				} else
					temp[entry.section].entries.push (entry);                      // favorites.jsxi:64
			}
			return result;                                                         // favorites.jsxi:66
		};
		(function (arg){                                                           // favorites.jsxi:12
			storage = new Storage ('clin-favorites',                               // favorites.jsxi:13
				function (arg){                                                    // ...
					for (var key in favorites)                                     // favorites.jsxi:14
						if (!arg.hasOwnProperty (key))                             // favorites.jsxi:15
							Favorites.remove (key);                                // favorites.jsxi:76
					for (var key in arg)                                           // favorites.jsxi:18
						if (!favorites.hasOwnProperty (key))                       // favorites.jsxi:19
							Favorites.add (key);                                   // favorites.jsxi:76
				});
			favorites = storage.load ();                                           // favorites.jsxi:23
			Posts.on ('add', handler);                                             // favorites.jsxi:24
		}());
		return Favorites;
	}(), 
	Page = function (){                                                            // page.jsxi:1
		var Page = function (){}, dispatcher, pathname;                            // page.jsxi:2
		Page.page = undefined;                                                     // page.jsxi:4
		Page.section = undefined;                                                  // page.jsxi:5
		Page.thread = undefined;                                                   // page.jsxi:6
		Page.pageNumber = undefined;                                               // page.jsxi:7
		Page.path = undefined;                                                     // page.jsxi:8
		Page.hash = undefined;                                                     // page.jsxi:9
		Page.focus = document.hasFocus ();                                         // page.jsxi:10
		Page.on = function (type, fn){                                             // page.jsxi:36
			return dispatcher.on (type, fn);                                       // page.jsxi:37
		};
		Page.off = function (fn){                                                  // page.jsxi:39
			return dispatcher.off (fn);                                            // page.jsxi:40
		};
		Page.navigate = function (url){                                            // page.jsxi:42
			if (typeof url === 'string')                                           // page.jsxi:43
				window.history.pushState ({}, '', url);                            // page.jsxi:44
			if (pathname !== location.pathname){                                   // page.jsxi:46
				if (location.pathname.match ([object Object])){                    // page.jsxi:47
					Page.page = 'thread';                                          // page.jsxi:48
					Page.section = RegExp.$1;                                      // page.jsxi:49
					Page.thread = + RegExp.$2;                                     // page.jsxi:50
					Page.pageNumber = null;                                        // page.jsxi:51
					Page.path = null;                                              // page.jsxi:52
				} else if (location.pathname.match ([object Object])){             // page.jsxi:53
					Page.page = 'section';                                         // page.jsxi:54
					Page.section = RegExp.$1;                                      // page.jsxi:55
					Page.thread = null;                                            // page.jsxi:56
					Page.pageNumber = + (RegExp.$2 || 0);                          // page.jsxi:57
					Page.path = null;                                              // page.jsxi:58
				} else if (location.pathname === '/'){                             // page.jsxi:59
					Page.page = 'index';                                           // page.jsxi:60
					Page.section = null;                                           // page.jsxi:61
					Page.thread = null;                                            // page.jsxi:62
					Page.pageNumber = null;                                        // page.jsxi:63
					Page.path = null;                                              // page.jsxi:64
				} else if (location.pathname === '/authorize'){                    // page.jsxi:65
					Page.page = 'authorize';                                       // page.jsxi:66
					Page.section = null;                                           // page.jsxi:67
					Page.thread = null;                                            // page.jsxi:68
					Page.pageNumber = null;                                        // page.jsxi:69
					Page.path = null;                                              // page.jsxi:70
				} else {
					Page.page = 'static';                                          // page.jsxi:72
					Page.section = null;                                           // page.jsxi:73
					Page.thread = null;                                            // page.jsxi:74
					Page.pageNumber = null;                                        // page.jsxi:75
					Page.path = location.pathname.slice (1);                       // page.jsxi:76
				}
				dispatcher.call ('navigate', Page);                                // page.jsxi:79
				pathname = location.pathname;                                      // page.jsxi:80
			}
			Page.anchor ();                                                        // page.jsxi:76
		};
		Page.reload = function (){                                                 // page.jsxi:86
			return location.reload ();                                             // page.jsxi:87
		};
		Page.anchor = function (){                                                 // page.jsxi:89
			Page.hash = location.hash.slice (1);                                   // page.jsxi:90
			dispatcher.call ('hash', Page.hash);                                   // page.jsxi:91
		};
		(function (arg){                                                           // page.jsxi:12
			dispatcher = new CallbackDispatcher (function (arg){                   // page.jsxi:13
				switch (arg){                                                      // page.jsxi:14
					case 'navigate':                                               // page.jsxi:15
						return Page;                                               // page.jsxi:16
					case 'hash':                                                   // page.jsxi:17
						return Page.hash;                                          // page.jsxi:76
					case 'focus':                                                  // page.jsxi:19
						return Page.focus;                                         // page.jsxi:76
					default:
						console.warn ('Not implemented at 22 line of page.jsxi');
				}
			});
			$ (window).on ('popstate', Page.navigate).on ('blur focus',            // page.jsxi:28
				function (event){                                                  // ...
					Page.focus = event.type === 'focus';                           // page.jsxi:29
					dispatcher.call ('focus', Page.focus);                         // page.jsxi:30
				});
			Page.navigate ();                                                      // page.jsxi:76
		}());
		return Page;
	}(), 
	Hiddens = function (){                                                         // hiddens.jsxi:1
		var Hiddens = function (){}, 
			dispatcher = new Dispatcher (),                                        // hiddens.jsxi:2
			storage,                                                               // hiddens.jsxi:3
			hiddens;                                                               // hiddens.jsxi:4
		Hiddens.on = function (type, fn){                                          // hiddens.jsxi:6
			return dispatcher.on (type, fn);                                       // hiddens.jsxi:7
		};
		Hiddens.off = function (fn){                                               // hiddens.jsxi:9
			return dispatcher.off (fn);                                            // hiddens.jsxi:10
		};
		function handler (data){                                                   // hiddens.jsxi:33
			data.message = data.message.replace ([object Object], 
				function (matched, post){                                          // hiddens.jsxi:34
					return hiddens.hasOwnProperty (post) ? matched + ' data-strikethrough' : matched;
				});
			var current = hiddens[(data.section + '/' + data.id)];                 // hiddens.jsxi:36
			if (current){                                                          // hiddens.jsxi:37
				data.hidden = true;                                                // hiddens.jsxi:38
				if (current.visible)                                               // hiddens.jsxi:39
					data.visible = true;                                           // hiddens.jsxi:40
			}
		}
		Hiddens.check = function (post){                                           // hiddens.jsxi:44
			return hidden.hasOwnProperty (post);                                   // hiddens.jsxi:45
		};
		Hiddens.hide = function (post){                                            // hiddens.jsxi:47
			var data = Posts.get (post);                                           // hiddens.jsxi:48
			console.assert (data, 'Post not loaded');                              // hiddens.jsxi:49
			hiddens[post] = data.threadMode ? {
				id: data.id,                                                       // hiddens.jsxi:52
				section: data.section,                                             // hiddens.jsxi:53
				subject: data.subjectForced                                        // hiddens.jsxi:54
			} : true;                                                              // hiddens.jsxi:55
			data.hidden = true;                                                    // hiddens.jsxi:57
			data.visible = false;                                                  // hiddens.jsxi:58
			dispatcher.call ('hide', post);                                        // hiddens.jsxi:60
			storage.save ();                                                       // hiddens.jsxi:61
		};
		Hiddens.show = function (post){                                            // hiddens.jsxi:64
			var data = Posts.get (post);                                           // hiddens.jsxi:65
			console.assert (data, 'Post not loaded');                              // hiddens.jsxi:66
			data.visible = true;                                                   // hiddens.jsxi:68
			if (data.threadMode)                                                   // hiddens.jsxi:70
				hiddens[post].visible = true;                                      // hiddens.jsxi:71
			dispatcher.call ('show', post);                                        // hiddens.jsxi:73
			storage.save ();                                                       // hiddens.jsxi:74
		};
		Hiddens.unhide = function (post){                                          // hiddens.jsxi:77
			console.assert (hiddens[post], 'Not in hiddens');                      // hiddens.jsxi:78
			delete hiddens[post];                                                  // hiddens.jsxi:79
			var data = Posts.get (post);                                           // hiddens.jsxi:81
			if (data){                                                             // hiddens.jsxi:82
				delete data.hidden;                                                // hiddens.jsxi:83
				delete data.visible;                                               // hiddens.jsxi:84
			}
			dispatcher.call ('unhide', post);                                      // hiddens.jsxi:87
			storage.save ();                                                       // hiddens.jsxi:88
		};
		Hiddens.sorted = function (){                                              // hiddens.jsxi:91
			var result = [], temp = {};                                            // hiddens.jsxi:93
			for (var id in hiddens){                                               // hiddens.jsxi:95
				var entry = hiddens[id];                                           // hiddens.jsxi:102
				if (typeof entry === 'object' && !entry.visible){                  // hiddens.jsxi:96
					if (!temp.hasOwnProperty (entry.section)){                     // hiddens.jsxi:97
						temp[entry.section] = { section: entry.section, entries: [ entry ] };
						result.push (temp[entry.section]);                         // hiddens.jsxi:99
					} else
						temp[entry.section].entries.push (entry);                  // hiddens.jsxi:101
				}
			}
			return result;                                                         // hiddens.jsxi:104
		};
		(function (arg){                                                           // hiddens.jsxi:12
			storage = new Storage ('clin-hiddens',                                 // hiddens.jsxi:13
				function (arg){                                                    // ...
					for (var key in hiddens)                                       // hiddens.jsxi:14
						if (!arg.hasOwnProperty (key))                             // hiddens.jsxi:15
							Hiddens.unhide (key);                                  // hiddens.jsxi:76
					for (var key in arg){                                          // hiddens.jsxi:18
						var value = arg[key];                                      // hiddens.jsxi:26
						if (!hiddens.hasOwnProperty (key)){                        // hiddens.jsxi:19
							Hiddens.hide (key);                                    // hiddens.jsxi:76
						} else if (typeof value === 'object' && value.visible !== hiddens[key].visible){
							if (value.visible)                                     // hiddens.jsxi:22
								Hiddens.show (key);                                // hiddens.jsxi:76
							else
								Hiddens.hide (key);                                // ...
						}
					}
				});
			hiddens = storage.load ();                                             // hiddens.jsxi:29
			Posts.on ('add', handler);                                             // hiddens.jsxi:30
		}());
		return Hiddens;
	}(), 
	Statistics = function (){                                                      // statistics.jsxi:1
		var Statistics = function (){}, dispatcher, storage, data;                 // statistics.jsxi:4
		Statistics.on = function (fn){                                             // statistics.jsxi:26
			return dispatcher.on (fn);                                             // statistics.jsxi:27
		};
		Statistics.off = function (fn){                                            // statistics.jsxi:29
			return dispatcher.off (fn);                                            // statistics.jsxi:30
		};
		function update (nosave){                                                  // statistics.jsxi:32
			if (!nosave)                                                           // statistics.jsxi:33
				storage.save ();                                                   // statistics.jsxi:34
			dispatcher.call ();                                                    // statistics.jsxi:35
		}
		Statistics.get = function (){                                              // statistics.jsxi:38
			return {
				threadsVisited: data.threadsVisited.length,                        // statistics.jsxi:40
				threadsCreated: data.threadsCreated.length,                        // statistics.jsxi:41
				messagesSended: data.messagesSended.length                         // statistics.jsxi:42
			};
		};
		Statistics.threadVisited = function (section, thread){                     // statistics.jsxi:45
			var entry = section + '/' + thread;                                    // statistics.jsxi:46
			if (data.threadsVisited.indexOf (entry) === - 1){                      // statistics.jsxi:48
				data.threadsVisited.push (entry);                                  // statistics.jsxi:49
				update ();                                                         // statistics.jsxi:50
			}
		};
		Statistics.threadCreated = function (section){                             // statistics.jsxi:54
			data.threadsCreated.push (section);                                    // statistics.jsxi:55
			update ();                                                             // statistics.jsxi:56
		};
		Statistics.messageSended = function (section, thread){                     // statistics.jsxi:59
			data.messagesSended.push (section + '/' + thread);                     // statistics.jsxi:60
			update ();                                                             // statistics.jsxi:61
		};
		(function (arg){                                                           // statistics.jsxi:6
			storage = new Storage ('clin-statistics',                              // statistics.jsxi:7
				function (arg){                                                    // ...
					data = arg;                                                    // statistics.jsxi:8
					update (true);                                                 // statistics.jsxi:9
				});
			data = storage.load ();                                                // statistics.jsxi:12
			dispatcher = new CallbackDispatcher (function (arg){                   // statistics.jsxi:14
				return data;                                                       // ...
			});
			if (!data.threadsVisited)                                              // statistics.jsxi:16
				data.threadsVisited = [];                                          // statistics.jsxi:17
			if (!data.threadsCreated)                                              // statistics.jsxi:19
				data.threadsCreated = [];                                          // statistics.jsxi:20
			if (!data.messagesSended)                                              // statistics.jsxi:22
				data.messagesSended = [];                                          // statistics.jsxi:23
		}());
		return Statistics;
	}(), 
	Preferences = function (){                                                     // preferences.jsxi:1
		var Preferences = function (){}, 
			defaults = {
				'debug-mode': false,                                               // preferences.jsxi:2
				'debug-profiling': false,                                          // ...
				'panel-expanded': false,                                           // ...
				'mask-images': false,                                              // ...
				'filter-by-names': false,                                          // ...
				'filter-by-posts': false,                                          // ...
				'filtered-names': '',                                              // ...
				'filtered-posts': '',                                              // ...
				'hide-button-menu': false,                                         // ...
				'hide-answers': false,                                             // ...
				'hide-hidden': false,                                              // ...
				'all-posts-at-a-time': false,                                      // ...
				'autoupdate': true,                                                // ...
				'autoupdate-interval': 10,                                         // ...
				'autoupdate-errors-in-title': true,                                // ...
				'autoupdate-favicon-blink': true,                                  // ...
				'autoupdate-mark-new': false,                                      // ...
				'autoupdate-desktop-notifications': false,                         // ...
				'text-spoilers-open': true,                                        // ...
				'hide-names': false,                                               // ...
				'expand-type': 'center',                                           // ...
				'resize-images': true,                                             // ...
				'use-full-images': false,                                          // ...
				'use-full-gifs': false,                                            // ...
				'search-buttons': true,                                            // ...
				'popup-posts': 'refmap',                                           // ...
				'popup-posts-in': 300,                                             // ...
				'popup-posts-out': 300,                                            // ...
				'popup-posts-mark-viewed': false,                                  // ...
				'popup-posts-ignore-hidden': false,                                // ...
				'links-strike-hidden': false,                                      // ...
				'links-detect': true,                                              // ...
				'links-insert': true,                                              // ...
				'links-audio-detect': false,                                       // ...
				'links-image-detect': false,                                       // ...
				'links-embed-detect': true,                                        // ...
				'embed-size': 'det',                                               // ...
				'embed-player': false,                                             // ...
				'form-remove-exif': false,                                         // ...
				'form-hide-filename': false,                                       // ...
				'form-position': 'hidden',                                         // ...
				'hide-reply': false,                                               // ...
				'scroll-after-send': true,                                         // ...
				'highlight-sended': true,                                          // ...
				'form-add-to-favotites': true,                                     // ...
				'sage-button-enabled': true,                                       // ...
				'sage-button-save': true,                                          // ...
				'detect-tripcode': false,                                          // ...
				'captcha-language': 'english',                                     // ...
				'form-formatting-buttons': 'default',                              // ...
				'form-formatting-buttons-at-bottom': false,                        // ...
				'form-fixed-name-enabled': false,                                  // ...
				'form-fixed-name': '',                                             // ...
				'form-signature-enabled': false,                                   // ...
				'form-signature': '',                                              // ...
				'theme': '',                                                       // ...
				'user-css-enabled': false,                                         // ...
				'panel-attach': true,                                              // ...
				'panel-information': true,                                         // ...
				'old-style-title': true,                                           // ...
				'animation': true,                                                 // ...
				'user-script-crossdomain': false,                                  // ...
				'keyboard-shortcuts': true                                         // ...
			}, 
			storage,                                                               // preferences.jsxi:3
			data,                                                                  // preferences.jsxi:4
			dispatcher;                                                            // preferences.jsxi:5
		Preferences.on = function (type, fn){                                      // preferences.jsxi:32
			return dispatcher.on (type, fn);                                       // preferences.jsxi:33
		};
		Preferences.off = function (fn){                                           // preferences.jsxi:35
			return dispatcher.off (fn);                                            // preferences.jsxi:36
		};
		Preferences.set = function (key, value){                                   // preferences.jsxi:38
			if (value === undefined){                                              // preferences.jsxi:39
				delete data[key];                                                  // preferences.jsxi:40
				value = defaults[key];                                             // preferences.jsxi:41
			} else
				data[key] = value;                                                 // preferences.jsxi:43
			dispatcher.call (key, value);                                          // preferences.jsxi:45
			storage.save ();                                                       // preferences.jsxi:46
			return value;                                                          // preferences.jsxi:48
		};
		Preferences.remove = function (key){                                       // preferences.jsxi:51
			return Preferences.set (key, undefined);                               // preferences.jsxi:76
		};
		Preferences.toggle = function (key){                                       // preferences.jsxi:54
			return Preferences.set (key, !Preferences.get (key));                  // preferences.jsxi:76
		};
		Preferences.get = function (key, defaultValue){                            // preferences.jsxi:57
			return data.hasOwnProperty (key) ? data[key] : defaults.hasOwnProperty (key) ? defaults[key] : defaultValue !== undefined ? defaultValue : console.assert (false, 'Wrong key and missing defaultValue: \"' + key + '\"');
		};
		Preferences.reset = function (){                                           // preferences.jsxi:66
			for (var n in data)                                                    // preferences.jsxi:67
				Preferences.remove (n);                                            // preferences.jsxi:76
		};
		(function (arg){                                                           // preferences.jsxi:7
			storage = new Storage ('clin-preferences',                             // preferences.jsxi:8
				function (arg){                                                    // ...
					var updated = [];                                              // preferences.jsxi:9
					for (var key in arg){                                          // preferences.jsxi:11
						var value = arg[key];                                      // preferences.jsxi:13
						if (value !== data[key])                                   // preferences.jsxi:12
							updated.push (key);                                    // preferences.jsxi:13
					}
					data = arg;                                                    // preferences.jsxi:15
					for (var _18 = 0; _18 < updated.length; _18 ++){               // preferences.jsxi:18
						var key = updated[_18];                                    // ...
						dispatcher.call (key, data[key]);                          // ...
					}
				});
			data = storage.load ();                                                // preferences.jsxi:21
			dispatcher = new CallbackDispatcher (function (type, handler){         // preferences.jsxi:23
				if (type === null){                                                // preferences.jsxi:24
					{
						var _19 = $.extend ({}, defaults, data);                   // preferences.jsxi:26
						for (var key in _19){                                      // preferences.jsxi:25
							var value = _19[key];                                  // preferences.jsxi:26
							handler (value, key);                                  // ...
						}
						_19 = undefined;                                           // ...
					}
				} else
					return Preferences.get (type);                                 // preferences.jsxi:76
			});
		}());
		return Preferences;
	}(), 
	Window = function (){                                                          // window.jsxi:1
		var Window = function (className){                                         // window.jsxi:21
				if (this.constructor === Window)
					throw new Error ('Trying to instantiate abstract class Window');
				this.closed = false;                                               // window.jsxi:18
				this.__className = className;                                      // window.jsxi:22
				this.__element = $ (Mustache.window ({ className: className })).appendTo (document.body).timeout (function (arg){
					return $ (this).addClass ('visible');                          // window.jsxi:26
				});
				this.__create ();                                                  // window.jsxi:76
				this.switchTab ();                                                 // ...
			}, 
			lastTabs;                                                              // window.jsxi:5
		Window.prototype.caption = function (str){                                 // window.jsxi:38
			this.__element.findId ('window-caption').html (str);                   // window.jsxi:39
			return this;                                                           // window.jsxi:40
		};
		Window.prototype.bar = function (str){                                     // window.jsxi:43
			this.__element.findId ('window-bar').html (str);                       // window.jsxi:44
			return this;                                                           // window.jsxi:45
		};
		Window.prototype.body = function (str){                                    // window.jsxi:48
			this.__element.findId ('window-body').html (str);                      // window.jsxi:49
			return this;                                                           // window.jsxi:50
		};
		Window.prototype.footer = function (str){                                  // window.jsxi:53
			this.__element.findId ('window-footer').html (str);                    // window.jsxi:54
			return this;                                                           // window.jsxi:55
		};
		Window.prototype.click = function (button, key, param){                    // window.jsxi:59
			switch (key){                                                          // window.jsxi:60
				case 'window-close':                                               // window.jsxi:61
					this.close ();                                                 // window.jsxi:76
					return true;                                                   // window.jsxi:63
				case 'tab':                                                        // window.jsxi:64
					this.switchTab (param);                                        // window.jsxi:76
					return true;                                                   // window.jsxi:66
			}
		};
		Window.prototype.switchTab = function (id){                                // window.jsxi:70
			var allTabs = this.__element.find ('[data-button^=\"tab:\"]'),         // window.jsxi:71
				html;                                                              // window.jsxi:72
			if (allTabs.length > 0){                                               // window.jsxi:74
				if (id !== undefined){                                             // window.jsxi:75
					lastTabs[this.__className] = id;                               // window.jsxi:76
					Preferences.set ('window-previous-tabs', lastTabs);            // window.jsxi:77
				} else if (lastTabs.hasOwnProperty (this.__className)){            // window.jsxi:78
					id = lastTabs[this.__className];                               // window.jsxi:76
				} else
					id = allTabs.eq (0).data ('button').match ([object Object])[0];
				this.body (this.__tab (id));                                       // ...
				allTabs.removeClass ('active').filter ('[data-button=\"tab:' + id + '\"]').addClass ('active');
			}
			return this;                                                           // window.jsxi:91
		};
		Window.prototype.close = function (){
			console.assert (!this.closed, 'Window already closed');                // window.jsxi:96
			this.__element.removeClass ('visible').timeout (function (arg){        // window.jsxi:98
				return $ (this).remove ();                                         // ...
			}, 
			300);                                                                  // ...
			this.closed = true;                                                    // window.jsxi:99
			return this;                                                           // window.jsxi:100
		};
		(function (arg){                                                           // window.jsxi:7
			lastTabs = Preferences.get ('window-previous-tabs', {});               // window.jsxi:8
			if (typeof lastTabs !== 'object')                                      // window.jsxi:10
				lastTabs = {};                                                     // window.jsxi:11
		}());
		return Window;
	}(), 
	PonyabaUtils = function (){                                                    // ponyabaUtils.jsxi:1
		var PonyabaUtils = function (){}, 
			daysOfWeekNames = {
				Sun: 'Воскресенье',                                                // ponyabaUtils.jsxi:2
				Mon: 'Понедельник',                                                // ...
				Tue: 'Вторник',                                                    // ...
				Wed: 'Среда',                                                      // ...
				Thu: 'Четверг',                                                    // ...
				Fri: 'Пятница',                                                    // ...
				Sat: 'Суббота'                                                     // ...
			}, 
			monthNames = {
				Jan: 'Янв',                                                        // ponyabaUtils.jsxi:3
				Feb: 'Фев',                                                        // ...
				Mar: 'Мар',                                                        // ...
				Apr: 'Апр',                                                        // ...
				May: 'Май',                                                        // ...
				Jun: 'Июн',                                                        // ...
				Jul: 'Июл',                                                        // ...
				Aug: 'Авг',                                                        // ...
				Sep: 'Сен',                                                        // ...
				Oct: 'Окт',                                                        // ...
				Nov: 'Ноя',                                                        // ...
				Dec: 'Дек'                                                         // ...
			}, 
			domains = [ 'ponyach.ru', 'dev.ponyach.ru', 'ponya.ch' ],              // ponyabaUtils.jsxi:4
			stupidPonyaba = [object Object], 
			linkDetect = [object Object], 
			postLinksDetect = [object Object], 
			rawPostLinksDetect = [object Object], 
			imageLinkDetect = [object Object], 
			audioLinkDetect = [object Object], 
			tempDate = new Date (),                                                // ponyabaUtils.jsxi:11
			imageLinkDetectEnabled,                                                // ponyabaUtils.jsxi:12
			audioLinkDetectEnabled,                                                // ponyabaUtils.jsxi:13
			tempDiv;                                                               // ponyabaUtils.jsxi:14
		function date (timestamp){                                                 // ponyabaUtils.jsxi:21
			tempDate.setTime (timestamp);                                          // ponyabaUtils.jsxi:25
			var temp = tempDate.toString (),                                       // ponyabaUtils.jsxi:26
				week = temp.substr (0, 3),                                         // ponyabaUtils.jsxi:27
				month = temp.substr (4, 3),                                        // ponyabaUtils.jsxi:28
				day = temp.substr (8, 2),                                          // ponyabaUtils.jsxi:29
				end = temp.substr (11, 13);                                        // ponyabaUtils.jsxi:30
			return daysOfWeekNames[week] + ' ' + day + ' ' + monthNames[month] + ' ' + end;
		}
		PonyabaUtils.formatSize = function (bytes){                                // ponyabaUtils.jsxi:35
			if ((bytes /= 1024) < 1024)                                            // ponyabaUtils.jsxi:36
				return bytes.toFixed (2) + 'KB';                                   // ponyabaUtils.jsxi:37
			else
				return (bytes / 1024).toFixed (2) + 'MB';                          // ponyabaUtils.jsxi:39
		};
		PonyabaUtils.fixMessage = function (message, section, previous, embeds){   // ponyabaUtils.jsxi:41
			return message.replace (stupidPonyaba, '').replace (linkDetect,        // ponyabaUtils.jsxi:44
				function (linkBegin, href){                                        // ...
					if (href.match (postLinksDetect)){                             // ponyabaUtils.jsxi:45
						var to = + (RegExp.$3 || RegExp.$2), ts = RegExp.$1;       // ponyabaUtils.jsxi:47
						if (section === ts && previous.indexOf (to) === - 1)       // ponyabaUtils.jsxi:49
							previous.push (to);                                    // ponyabaUtils.jsxi:50
						return linkBegin + ' data-link=\"' + ts + '/' + to + '\"' + (RegExp.$2 === RegExp.$3 ? ' data-op=\"' + ' [OP]' + '\"' : '');
					} else if (href.match (rawPostLinksDetect) && domains.indexOf (RegExp.$1) !== - 1){
						var to = + (RegExp.$4 || RegExp.$3), ts = RegExp.$2;       // ponyabaUtils.jsxi:55
						if (section === ts && previous.indexOf (to) === - 1)       // ponyabaUtils.jsxi:57
							previous.push (to);                                    // ponyabaUtils.jsxi:58
						return linkBegin + ' data-link=\"' + ts + '/' + to + '\" data-link-override=\"' + (section === ts ? to : ts + '/' + to) + '\"' + (RegExp.$3 === RegExp.$4 ? ' data-op=\"' + ' [OP]' + '\"' : '');
					} else if (href.match (audioLinkDetect)){                      // ponyabaUtils.jsxi:61
						return Mustache.postAudiolinkThumbinal ({ url: href, type: RegExp.$1, enabled: audioLinkDetectEnabled }) + linkBegin;
					} else if (href.match (imageLinkDetect)){                      // ponyabaUtils.jsxi:67
						return Mustache.postImagelinkThumbinal ({
							url: href,                                             // ponyabaUtils.jsxi:69
							proxyUrl: Crossdomain.proxyUrl (href),                 // ponyabaUtils.jsxi:70
							enabled: imageLinkDetectEnabled                        // ponyabaUtils.jsxi:71
						}) + linkBegin;                                            // ponyabaUtils.jsxi:72
					} else {
						var temp = Embed.test (href);                              // ponyabaUtils.jsxi:74
						if (temp){                                                 // ponyabaUtils.jsxi:76
							embeds.push ({ type: temp.type, id: temp.param, href: href });
							return linkBegin + ' data-embed=\"' + temp.type + '\" data-button=embed data-embed-param=\"' + temp.param + '\"';
						} else
							return linkBegin;                                      // ponyabaUtils.jsxi:85
					}
				});
		};
		function subjectReplacement (message){                                     // ponyabaUtils.jsxi:89
			if (!tempDiv)                                                          // ponyabaUtils.jsxi:90
				tempDiv = document.createElement ('div');                          // ponyabaUtils.jsxi:91
			tempDiv.innerHTML = message || '';                                     // ponyabaUtils.jsxi:92
			return (tempDiv.textContent || '').substr (0, 68).trim ();             // ponyabaUtils.jsxi:93
		}
		function displayFileName (originalName){                                   // ponyabaUtils.jsxi:96
			return originalName && originalName.length > 70 ? originalName.replace ([object Object], '$1…$2') : originalName;
		}
		PonyabaUtils.fix = function (data, section, postNumber){                   // ponyabaUtils.jsxi:99
			if (!('id' in data) || !('timestamp' in data) || 'file' in data && (!('file_type' in data) || !('file_size' in data) || !('image_w' in data) || !('image_h' in data) || !('thumb_w' in data) || !('thumb_h' in data))){
				console.warn ('Damaged post data', data);                          // ponyabaUtils.jsxi:104
				if (!Preferences.get ('debug-mode'))                               // ponyabaUtils.jsxi:105
					throw new Error (1003);                                        // ponyabaUtils.jsxi:106
			}
			var timestamp = data.timestamp * 1000,                                 // ponyabaUtils.jsxi:109
				threadMode = !('parentid' in data),                                // ponyabaUtils.jsxi:110
				thread = threadMode ? data.id : data.parentid,                     // ponyabaUtils.jsxi:111
				previous = [],                                                     // ponyabaUtils.jsxi:112
				embeds = [],                                                       // ponyabaUtils.jsxi:113
				file;                                                              // ponyabaUtils.jsxi:114
			if ('file' in data)                                                    // ponyabaUtils.jsxi:116
				file = {
					thumbinal: '/' + section + '/thumb/' + data.file + 's.' + data.file_type,
					fullpath: '/' + section + '/src/' + data.file + '.' + data.file_type,
					name: data.file + '.' + data.file_type,                        // ponyabaUtils.jsxi:120
					originalName: data.file_original,                              // ponyabaUtils.jsxi:121
					displayName: displayFileName (data.file_original),             // ponyabaUtils.jsxi:122
					type: data.file_type,                                          // ponyabaUtils.jsxi:123
					size: data.file_size,                                          // ponyabaUtils.jsxi:124
					sizeFormatted: PonyabaUtils.formatSize (data.file_size),       // ponyabaUtils.jsxi:76
					dimensions: { width: data.image_w, height: data.image_h },     // ponyabaUtils.jsxi:126
					thumbinalDimensions: { width: data.thumb_w, height: data.thumb_h }
				};
			return {
				id: data.id,                                                       // ponyabaUtils.jsxi:131
				threadMode: threadMode,                                            // ponyabaUtils.jsxi:132
				thread: thread,                                                    // ponyabaUtils.jsxi:133
				section: section,                                                  // ponyabaUtils.jsxi:134
				postNumber: postNumber,                                            // ponyabaUtils.jsxi:135
				name: data.name,                                                   // ponyabaUtils.jsxi:137
				tripcode: data.tripcode,                                           // ponyabaUtils.jsxi:138
				email: data.email,                                                 // ponyabaUtils.jsxi:139
				subject: data.subject,                                             // ponyabaUtils.jsxi:140
				subjectForced: threadMode ? data.subject || subjectReplacement (data.message) : undefined,
				sage: data.email ? [object Object].test (data.email) : false,      // ponyabaUtils.jsxi:142
				timestamp: timestamp,                                              // ponyabaUtils.jsxi:144
				date: date (timestamp),                                            // ponyabaUtils.jsxi:145
				message: data.message ? PonyabaUtils.fixMessage (data.message, section, previous, embeds) : '',
				embeds: embeds,                                                    // ponyabaUtils.jsxi:147
				file: file,                                                        // ponyabaUtils.jsxi:149
				previous: previous,                                                // ponyabaUtils.jsxi:150
				next: []                                                           // ponyabaUtils.jsxi:151
			};
		};
		PonyabaUtils.omitted = function (posts, images){                           // ponyabaUtils.jsxi:155
			if (posts <= 0)                                                        // ponyabaUtils.jsxi:156
				return null;                                                       // ponyabaUtils.jsxi:157
			else
				return posts + ' ответ' + posts.postfix ('', 'а', 'ов') + ' ' + (images ? 'и ' + images + ' изображени' + images.postfix ('е', 'я', 'й') + ' ' : '') + 'пропущен' + (images > 0 ? Number.POSITIVE_INFINITY : posts).postfix ('', 'о', 'о') + '. Нажмите «Ответ», чтобы увидеть тред целиком.';
		};
		(function (arg){                                                           // ponyabaUtils.jsxi:16
			Preferences.on ('links-image-detect',                                  // ponyabaUtils.jsxi:17
				function (arg){                                                    // ...
					return imageLinkDetectEnabled = arg;                           // ...
				});
			Preferences.on ('links-audio-detect',                                  // ponyabaUtils.jsxi:18
				function (arg){                                                    // ...
					return audioLinkDetectEnabled = arg;                           // ...
				});
		}());
		return PonyabaUtils;
	}(), 
	Styles = function (){                                                          // styles.jsxi:1
		var Styles = function (){                                                  // styles.jsxi:2
			Preferences.on ([
				'mask-images',                                                     // styles.jsxi:4
				'hide-names',                                                      // styles.jsxi:5
				'text-spoilers-open',                                              // styles.jsxi:6
				'search-buttons',                                                  // styles.jsxi:7
				'links-embed-detect',                                              // styles.jsxi:8
				'animation',                                                       // styles.jsxi:9
				'panel-information',                                               // styles.jsxi:10
				'panel-attach',                                                    // styles.jsxi:11
				'sage-button-enabled',                                             // styles.jsxi:12
				'links-detect',                                                    // styles.jsxi:13
				'links-strike-hidden',                                             // styles.jsxi:14
				'links-image-detect',                                              // styles.jsxi:15
				'links-audio-detect'                                               // styles.jsxi:16
			], 
			function (value, key){                                                 // styles.jsxi:17
				return $ (document.body).toggleClass (key, value);                 // ...
			});
			Preferences.on ('popup-posts',                                         // styles.jsxi:19
				function (arg){                                                    // ...
					return $ (document.body).toggleClass ('refmap-disabled', arg !== 'refmap');
				});
			Preferences.on ('embed-size',                                          // styles.jsxi:20
				function (arg){                                                    // ...
					return $ (document.body).data ('embed-size', arg);             // ...
				});
			Preferences.on ('hide-reply form-position',                            // styles.jsxi:22
				function (arg){                                                    // ...
					return $ (document.body).toggleClass ('hide-reply',            // ...
						Preferences.get ('hide-reply') && [ 'hidden', 'popup' ].indexOf (Preferences.get ('form-position')) !== - 1);
				});
			Preferences.on ('theme',                                               // styles.jsxi:25
				function (arg){                                                    // ...
					$ ('link[data-custom-style]').remove ();                       // styles.jsxi:26
					if (arg)                                                       // styles.jsxi:27
						$ ('<link rel=\"stylesheet\" data-custom-style type=\"text/css\" href=\"' + arg + '\">').appendTo (document.head);
				});
		};
		return Styles;
	}(), 
	Embed = function (){                                                           // embed.jsxi:1
		var Embed = function (){}, 
			youtubeDetect = [object Object], 
			vimeoDetect = [object Object], 
			coubDetect = [object Object], 
			coubThumbinalParse = [object Object], 
			coubTitleParse = [object Object], 
			callbacks = {};                                                        // embed.jsxi:11
		function request (url, type, callback){                                    // embed.jsxi:27
			if (typeof type === 'function'){                                       // embed.jsxi:28
				callback = type;                                                   // embed.jsxi:29
				type = undefined;                                                  // embed.jsxi:30
			}
			if (callbacks[url]){                                                   // embed.jsxi:33
				callbacks[url].push (callback);                                    // embed.jsxi:34
			} else {
				callbacks[url] = [ callback ];                                     // embed.jsxi:36
				$.ajax ({
					url: url,                                                      // embed.jsxi:39
					dataType: type,                                                // embed.jsxi:40
					success: handler,                                              // embed.jsxi:41
					error: handler.bind (null, null)                               // embed.jsxi:42
				});
			}
			function handler (arg){                                                // embed.jsxi:46
				{
					var _g = callbacks[url];                                       // embed.jsxi:48
					for (var _e = 0; _e < _g.length; _e ++){                       // ...
						var callback = _g[_e];                                     // ...
						callback (arg);                                            // ...
					}
					_g = undefined;                                                // ...
				}
				delete callbacks[url];                                             // embed.jsxi:49
			}
		}
		Embed.test = function (href){                                              // embed.jsxi:53
			if (href.match (youtubeDetect))                                        // embed.jsxi:54
				return { type: 'youtube', param: RegExp.$1 };                      // embed.jsxi:58
			else if (href.match (vimeoDetect))                                     // embed.jsxi:59
				return { type: 'vimeo', param: RegExp.$1 };                        // embed.jsxi:63
			else if (href.match (coubDetect))                                      // embed.jsxi:64
				return { type: 'coub', param: RegExp.$1 };                         // embed.jsxi:68
			else
				return false;                                                      // embed.jsxi:70
		};
		Embed.buildHtml = function (params){                                       // embed.jsxi:72
			if (params instanceof Array)                                           // embed.jsxi:73
				params = params[0];                                                // embed.jsxi:74
			switch (params.type){                                                  // embed.jsxi:76
				case 'youtube':                                                    // embed.jsxi:77
					
				case 'coub':                                                       // embed.jsxi:78
					
				case 'vimeo':                                                      // embed.jsxi:79
					return Mustache[$.camelCase ('embed-' + params.type)](params);
				default:
					console.warn ('Not implemented at 82 line of embed.jsxi');     // embed.jsxi:82
					return '';                                                     // embed.jsxi:83
			}
		};
		Embed.click = function (_target){                                          // embed.jsxi:87
			var target = $ (_target),                                              // embed.jsxi:88
				blockquote = target.closest ('blockquote'),                        // embed.jsxi:89
				post = blockquote.closest ('[data-post]'),                         // embed.jsxi:90
				links = blockquote.find ('[data-button=\"embed\"]'),               // embed.jsxi:91
				index = links.indexOf (target[0]),                                 // embed.jsxi:92
				embeds = Posts.get (post.data ('post')).embeds,                    // embed.jsxi:93
				params = embeds[index],                                            // embed.jsxi:94
				previousElement = post.find ('[data-id=\"embeds-host\"] [data-value]'),
				newElement = $ (Embed.buildHtml (params));                         // embed.jsxi:96
			if (previousElement.data ('value') === newElement.data ('value')){     // embed.jsxi:98
				previousElement.toggleClass ('embed-hidden');                      // embed.jsxi:99
			} else {
				previousElement.replaceWith (newElement);                          // embed.jsxi:101
				Embed.process (newElement.parent ());                              // embed.jsxi:76
			}
		};
		Embed.setPlayer = function (type, id, _target){                            // embed.jsxi:106
			var target = $ (_target),                                              // embed.jsxi:107
				url = target.attr ('href'),                                        // embed.jsxi:108
				html = Mustache[$.camelCase ('embed-' + type + 'Player')]({ id: id }),
				player = $ (html),                                                 // embed.jsxi:110
				parent = target.closest ('[data-id=\"embeds-host\"] [data-value]');
			target.hide ();                                                        // embed.jsxi:113
			parent.append (player).data ('value-off', parent.data ('value')).data ('value', '');
		};
		Embed.process = function (parent){                                         // embed.jsxi:121
			if (parent === undefined)                                              // ...
				parent = document.body;                                            // ...
			var elements = $ (parent).find ('[data-embed-param]'),                 // embed.jsxi:122
				type,                                                              // embed.jsxi:123
				param;                                                             // embed.jsxi:124
			function processElement (element){                                     // embed.jsxi:126
				type = element.getAttribute ('data-embed');                        // embed.jsxi:127
				param = element.getAttribute ('data-embed-param');                 // embed.jsxi:128
				switch (type){                                                     // embed.jsxi:130
					case 'youtube':                                                // embed.jsxi:131
						request ('http://gdata.youtube.com/feeds/api/videos?v=2&q=' + param + '&max-results=1&fields=entry%28title%29&alt=json',
							'jsonp',                                               // embed.jsxi:134
							function (arg){                                        // embed.jsxi:135
								try {                                              // embed.jsxi:140
									return $ (element).data ('embed-title', arg.feed.entry[0].title.$t);
								} catch (e){                                       // ...
									return console.warn ('could not load name of youtube video');
								} 
							});
						break;                                                     // embed.jsxi:141
					case 'vimeo-thumbinal':                                        // embed.jsxi:142
						request ('http://vimeo.com/api/v2/video/' + param + '.json?callback=callback',
							'jsonp',                                               // embed.jsxi:145
							function (arg){                                        // embed.jsxi:146
								try {                                              // embed.jsxi:151
									return element.style.backgroundImage = 'url(\"' + arg[0].thumbnail_large + '\")';
								} catch (e){                                       // ...
									return console.warn ('could not load thumbinal of vimeo video');
								} 
							});
						break;                                                     // embed.jsxi:152
					case 'vimeo':                                                  // embed.jsxi:153
						request ('http://vimeo.com/api/v2/video/' + param + '.json?callback=callback',
							'jsonp',                                               // embed.jsxi:156
							function (arg){                                        // embed.jsxi:157
								try {                                              // embed.jsxi:162
									return $ (element).data ('embed-title', arg[0].title);
								} catch (e){                                       // ...
									return console.warn ('could not load name of vimeo video');
								} 
							});
						break;                                                     // embed.jsxi:163
					case 'coub-thumbinal':                                         // embed.jsxi:164
						Crossdomain.request ('http://coub.com/view/' + param,      // embed.jsxi:166
							function (arg){                                        // embed.jsxi:167
								try {                                              // embed.jsxi:172
									return element.style.backgroundImage = 'url(\"' + arg.match (coubThumbinalParse)[1].replace ('%{version}', 'med') + '\")';
								} catch (e){                                       // ...
									return console.warn ('could not load thumbinal of coub video');
								} 
							});
						break;                                                     // embed.jsxi:173
					case 'coub':                                                   // embed.jsxi:174
						Crossdomain.request ('http://coub.com/view/' + param,      // embed.jsxi:176
							function (arg){                                        // embed.jsxi:177
								try {                                              // embed.jsxi:182
									return $ (element).data ('embed-title', arg.match (coubTitleParse)[1]);
								} catch (e){                                       // ...
									return console.warn ('could not load name of coub video');
								} 
							});
						break;                                                     // embed.jsxi:183
					default:
						console.warn ('Not implemented at 185 line of embed.jsxi');
				}
				element.removeAttribute ('data-embed-param');                      // embed.jsxi:188
			}
			for (var _h = 0; _h < elements.length; _h ++){                         // embed.jsxi:192
				var element = elements[_h];                                        // ...
				processElement (element);                                          // ...
			}
		};
		(function (arg){                                                           // embed.jsxi:13
			Preferences.on ('embed-player',                                        // embed.jsxi:14
				function (arg){                                                    // ...
					if (!arg){                                                     // embed.jsxi:15
						$ ('.embed[data-value-off]').each (function (arg){         // embed.jsxi:16
							var element = $ (this);                                // embed.jsxi:17
							element.data ('value', element.data ('value-off')).data ('value-off', null).find ('[data-button^=\"embed:\"]').show ();
							element.find ('iframe, embed').remove ();              // embed.jsxi:22
						});
					}
				});
		}());
		return Embed;
	}(), 
	Form = function (){                                                            // form.jsxi:1
		var Form = function (){                                                    // form.jsxi:25
				var __that = this;                                                 // form.jsxi:76
				this.__Form_sectionParams = null;                                  // form.jsxi:18
				this.__Form_visible = false;                                       // form.jsxi:19
				this.__Form_disabled = {};                                         // form.jsxi:20
				this.__Form_busy = false;                                          // form.jsxi:21
				this.__Form_element = $ (Mustache.form ());                        // form.jsxi:28
				Preferences.on ('form-formatting-buttons',                         // form.jsxi:30
					function (arg){                                                // ...
						var name = arg ? 'formButtons' + arg[0].toUpperCase () + arg.substr (1) : false;
						__that.__Form_element.findId ('style').html (name && name in Mustache ? Mustache[name](buttons) : '');
					});
				Preferences.on ('form-formatting-buttons-at-bottom',               // form.jsxi:35
					function (arg){                                                // ...
						__that.__Form_element.findId ('style').insertAfter (__that.__Form_element.findId (arg ? 'message' : 'submit'));
					});
				Preferences.on ('form-fixed-name-enabled form-fixed-name',         // form.jsxi:39
					function (arg){                                                // ...
						var name = __that.__Form_element.findId ('name');          // form.jsxi:40
						if (Preferences.get ('form-fixed-name-enabled')){          // form.jsxi:41
							Preferences.set ('form-previous-name', name.val ());   // form.jsxi:42
							name.val (Preferences.get ('form-fixed-name'));        // form.jsxi:43
						} else
							name.val (Preferences.get ('form-previous-name', ''));
					});
				this.__Form_setFile (null);                                        // form.jsxi:76
				this.__Form_resizable ();                                          // ...
				this.__Form_sageHandler ();                                        // ...
				this.__Form_styleHandler ();                                       // ...
				this.__Form_changeHandler ();                                      // ...
				this.__Form_pasteHandler ();                                       // ...
				this.__Form_fileMouseoverHandler ();                               // ...
				this.__Form_fileInputHandler ();                                   // ...
				this.__Form_submitHandler ();                                      // ...
			}, 
			dispatcher = new Dispatcher (),                                        // form.jsxi:2
			buttons = [
				{ 'label': 'B', 'tag': 'b', 'title': 'Жирный' },                   // form.jsxi:13
				{ 'label': 'i', 'tag': 'i', 'title': 'Курсив' },                   // ...
				{ 'label': 'U', 'tag': 'u', 'title': 'Подчёркнутый' },             // ...
				{ 'label': 'S', 'tag': 's', 'title': 'Зачёркнутый' },              // ...
				{ 'label': '%', 'tag': 'spoiler', 'title': 'Под спойлером' },      // ...
				{ 'label': 'C', 'tag': 'code', 'title': 'Код' },                   // ...
				{ 'label': '>', 'tag': '>', 'title': 'Цитата' }                    // ...
			];
		Form.prototype.__Form_setDisabled = function (reason, param){              // form.jsxi:59
			if (param)                                                             // form.jsxi:60
				this.__Form_disabled[reason] = true;                               // form.jsxi:61
			else
				delete this.__Form_disabled[reason];                               // form.jsxi:63
			for (var key in this.__Form_disabled){                                 // form.jsxi:76
				var value = this.__Form_disabled[key];                             // form.jsxi:69
				if (value){                                                        // form.jsxi:66
					this.__Form_element.findId ('submit').attr ('disabled', true);
					return;                                                        // form.jsxi:68
				}
			}
			this.__Form_element.findId ('submit').removeAttr ('disabled');         // form.jsxi:71
		};
		Form.prototype.__Form_updateSectionParams = function (data){               // form.jsxi:74
			var __that = this;                                                     // form.jsxi:76
			if (data === null){                                                    // form.jsxi:75
				console.warn ('Not implemented at 76 line of form.jsxi');          // form.jsxi:76
			} else {
				var filtered = data[0].filter (function (arg){                     // form.jsxi:78
					return arg.name === __that.__Form_section;                     // form.jsxi:76
				})[0];                                                             // form.jsxi:78
				if (filtered)                                                      // form.jsxi:80
					this.__Form_sectionParams = filtered.params ? filtered.params : {};
				this.__Form_setFile ();                                            // form.jsxi:76
				this.__Form_setDisabled ('loading', false);                        // ...
			}
		};
		Form.prototype.__Form_updateTarget = function (section, thread){           // form.jsxi:88
			if (this.__Form_section !== section){                                  // form.jsxi:89
				this.__Form_sectionParams = null;                                  // form.jsxi:90
				this.__Form_setDisabled ('loading', true);                         // form.jsxi:76
				new SectionsRequest ().send (__bo (this, '__Form_updateSectionParams'));
			}
			this.__Form_section = section;                                         // form.jsxi:96
			this.__Form_thread = thread;                                           // form.jsxi:97
		};
		Form.prototype.__Form_setFile = function (newFile){                        // form.jsxi:100
			var __that = this;                                                     // form.jsxi:76
			var __;                                                                // ...
			if (this.__Form_exif){                                                 // ...
				this.__Form_setDisabled ('exif-removing', false);                  // ...
				this.__Form_exif.cancel ();                                        // form.jsxi:103
				this.__Form_exif = null;                                           // form.jsxi:104
			}
			if (newFile !== undefined){                                            // form.jsxi:107
				if (this.__Form_file && this.__Form_file.hasOwnProperty ('url'))   // form.jsxi:108
					URL.revokeObjectURL (this.__Form_file.url);                    // form.jsxi:109
				this.__Form_file = newFile;                                        // form.jsxi:111
				if (newFile)                                                       // form.jsxi:113
					this.__Form_file.url = URL.createObjectURL (newFile.data);     // form.jsxi:114
			}
			var name = this.__Form_file ? this.__Form_file.name : 'Файл не выбран';
			this.__Form_element.findId ('file-input').attr ('title', name);        // form.jsxi:118
			if (name.length > 25)                                                  // form.jsxi:120
				name = name.replace ([object Object], '$1…$2');                    // form.jsxi:121
			this.__Form_element.findId ('file-name').text (name);                  // form.jsxi:122
			this.__Form_element.findId ('file-clear')[(this.__Form_file ? 'show' : 'hide')]();
			var error = false;                                                     // form.jsxi:125
			if (this.__Form_file){                                                 // form.jsxi:76
				if (![object Object].test (this.__Form_file.type))                 // form.jsxi:127
					error = 'Выберите изображение';                                // form.jsxi:128
				if (!error && this.__Form_sectionParams){                          // form.jsxi:76
					if (this.__Form_file.size > this.__Form_sectionParams.maxImageSize / 10)
						error = 'Не больше ' + PonyabaUtils.formatSize (this.__Form_sectionParams.maxImageSize);
				}
				if (!error && this.__Form_file.type === 'image/jpeg' && Preferences.get ('form-remove-exif')){
					this.__Form_setDisabled ('exif-removing', true);               // ...
					this.__Form_exif = new Exif (this.__Form_file.data);           // form.jsxi:140
					this.__Form_exif.clear (function (arg){                        // form.jsxi:141
						var __;                                                    // form.jsxi:76
						__that.__Form_setDisabled ('exif-removing', false);        // ...
						if (arg)                                                   // form.jsxi:143
							__that.__Form_file.data = arg;                         // form.jsxi:144
						else if (arg === null)                                     // form.jsxi:145
							(__ = new Message ('warning', 'Увы, но удалить EXIF-данные не удалось', 2000),
								__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
					});
				}
			} else
				(__ = this.__Form_element.findId ('file-form')[0],                 // form.jsxi:150
					__[(__ instanceof Form ? '__Form_reset' : 'reset')]).call (__);
			this.__Form_element.findId ('file-error').text (error || '');          // form.jsxi:152
			this.__Form_setDisabled ('file-error', error);                         // form.jsxi:76
		};
		Form.prototype.__Form_fileInputHandler = function (){
			var __that = this;                                                     // ...
			var __;                                                                // ...
			this.__Form_element.findId ('file-input').change (function (arg){      // form.jsxi:157
				return __that.__Form_setFile (this.files.length ? {
					name: this.files[0].name,                                      // form.jsxi:161
					type: this.files[0].type,                                      // form.jsxi:162
					size: this.files[0].size,                                      // form.jsxi:163
					data: this.files[0]                                            // form.jsxi:164
				} : null);                                                         // form.jsxi:166
			});
			(__ = this.__Form_element.findId ('file-clear').click (function (arg){
					if (arg.which === 1){                                          // form.jsxi:170
						__that.__Form_setFile (null);                              // form.jsxi:76
						arg.preventDefault ();                                     // form.jsxi:172
						arg.stopPropagation ();                                    // form.jsxi:173
					}
				}), 
				__[(__ instanceof Form ? '__Form_hide' : 'hide')]).call (__);      // form.jsxi:76
		};
		Form.prototype.__Form_pasteHandler = function (){
			var __that = this;                                                     // ...
			function run (from){                                                   // form.jsxi:178
				var __;                                                            // form.jsxi:76
				var inserted = this.value.substring (from, this.selectionStart);   // form.jsxi:179
				if (inserted.match ([object Object])){                             // form.jsxi:180
					var name = RegExp.$1,                                          // form.jsxi:181
						extension = RegExp.$2,                                     // form.jsxi:182
						message = (__ = new Message ('loading'),                   // form.jsxi:183
							__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
					Crossdomain.request (inserted,                                 // form.jsxi:185
						true,                                                      // ...
						function (arg){                                            // ...
							if (arg && !__that.__Form_file)                        // form.jsxi:76
								__that.__Form_setFile ({
									name: name + '.' + extension,                  // form.jsxi:188
									type: 'image/' + extension.toLowerCase ().replace ('jpg', 'jpeg'),
									size: arg.byteLength,                          // form.jsxi:190
									data: arg                                      // form.jsxi:191
								});
							message[(message instanceof Form ? '__Form_hide' : 'hide')]();
						});
				}
			}
			this.__Form_element.findId ('message').on ('paste',                    // form.jsxi:200
				function (arg){                                                    // ...
					if (!__that.__Form_file){                                      // form.jsxi:76
						setTimeout (run.bind (this, this.selectionStart));         // form.jsxi:201
					}
				});
		};
		Form.prototype.__Form_fileMouseoverHandler = function (){
			this.__Form_element.findId ('file-input').mouseover (function (arg){   // form.jsxi:206
				console.log ('MOUSEOVER');                                         // form.jsxi:207
			});
		};
		Form.prototype.__Form_reset = function (){
			this.__Form_element.findId ('message').val ('');                       // form.jsxi:212
			this.__Form_element.findId ('subject').val ('');                       // form.jsxi:213
			this.__Form_setFile (null);                                            // form.jsxi:76
			if (!Preferences.get ('sage-button-save'))                             // form.jsxi:215
				this.__Form_element.findId ('sage').removeClass ('active');        // form.jsxi:216
		};
		Form.prototype.__Form_submitHandler = function (){
			var __that = this;                                                     // form.jsxi:76
			this.__Form_element.findId ('submit').click (function (arg){           // form.jsxi:220
				var __;                                                            // form.jsxi:76
				if (arg.which === 1){                                              // form.jsxi:220
					var input = __that.__Form_element.findId ('file-input')[0],    // form.jsxi:221
						name = __that.__Form_element.findId ('name').val (),       // form.jsxi:222
						subject = __that.__Form_element.findId ('subject').val (),
						message = __that.__Form_element.findId ('message').val (),
						fileEntry,                                                 // form.jsxi:225
						email,                                                     // form.jsxi:226
						loading;                                                   // form.jsxi:227
					if (Preferences.get ('detect-tripcode') && [object Object].test (subject)){
						(__ = new Message ('warning', 'Поле «Тема» содержит трипкод', 2000),
							__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
						return;                                                    // form.jsxi:231
					}
					if (Preferences.get ('form-signature-enabled'))                // form.jsxi:234
						message = message.trim () + '\n\n' + Preferences.get ('form-signature');
					loading = (__ = new Message ('loading', 'Пожалуйста, подождите...'),
						__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
					__that.__Form_busy = true;                                     // form.jsxi:238
					__that.__Form_hide ();                                         // form.jsxi:76
					if (__that.__Form_file){                                       // ...
						fileEntry = $.extend ({}, __that.__Form_file);             // form.jsxi:243
						if (Preferences.get ('form-hide-filename'))                // form.jsxi:245
							fileEntry.name = '.' + __that.__Form_file.type.match ([object Object])[0].replace ([object Object], 'jpg');
					}
					if (Preferences.get ('sage-button-enabled'))                   // form.jsxi:249
						email = __that.__Form_element.findId ('sage').hasClass ('active') ? 'sage' : '';
					else
						email = __that.__Form_element.findId ('email').val ();     // form.jsxi:252
					new SendRequest (__that.__Form_section,                        // form.jsxi:76
						__that.__Form_thread,                                      // ...
						{
							name: name,                                            // form.jsxi:255
							subject: subject,                                      // form.jsxi:256
							email: email,                                          // form.jsxi:257
							file: fileEntry,                                       // form.jsxi:258
							message: message                                       // form.jsxi:259
						}).send (function (data, error){                           // form.jsxi:260
						var __;                                                    // form.jsxi:76
						__that.__Form_busy = false;                                // form.jsxi:261
						loading[(loading instanceof Form ? '__Form_hide' : 'hide')]();
						if (data === null){                                        // form.jsxi:264
							(__ = new Message ('error',                            // form.jsxi:265
									'Ошибка #' + error + ': ' + Errors.description (error),
									true),                                         // ...
								__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
							__that.__Form_show ();                                 // form.jsxi:76
						} else {
							(__ = new Message ('success', 'Сообщение отправлено', 2000),
								__[(__ instanceof Form ? '__Form_show' : 'show')]).call (__);
							__that.__Form_reset ();                                // ...
							dispatcher.call ('sended',                             // form.jsxi:271
								{
									section: __that.__Form_section,                // form.jsxi:76
									thread: __that.__Form_thread,                  // ...
									id: data.id                                    // form.jsxi:271
								});
							if (__that.__Form_thread === undefined)                // form.jsxi:273
								Statistics.threadCreated (__that.__Form_section);
							else
								Statistics.messageSended (__that.__Form_section, __that.__Form_thread);
							if (Preferences.get ('form-add-to-favotites'))         // form.jsxi:278
								Favorites.add (__that.__Form_section + '/' + (__that.__Form_thread === undefined ? data.id : __that.__Form_thread));
						}
					});
				}
			});
		};
		Form.prototype.__Form_sageHandler = function (){
			var detSage = this.__Form_element.findId ('sage');                     // form.jsxi:286
			detSage.click (function (arg){                                         // form.jsxi:288
				if (arg.which === 1){                                              // ...
					$ (this).toggleClass ('active');                               // form.jsxi:289
					if (Preferences.get ('sage-button-save'))                      // form.jsxi:290
						Preferences.set ('form-sage', $ (this).hasClass ('active'));
				}
			});
			if (Preferences.get ('sage-button-save') && Preferences.get ('form-sage', false))
				detSage.addClass ('active');                                       // form.jsxi:295
		};
		Form.prototype.__Form_changeHandler = function (){
			var name = Preferences.get ('form-fixed-name-enabled') ? Preferences.get ('form-fixed-name') : Preferences.get ('form-previous-name', '');
			this.__Form_element.findId ('name').on ('change',                      // form.jsxi:304
				function (arg){                                                    // ...
					return Preferences.set ('form-previous-name', $ (this).val ());
				}).val (name);                                                     // form.jsxi:307
		};
		Form.prototype.__Form_styleHandler = function (){
			var __that = this;                                                     // form.jsxi:76
			function applyCode (open, close){                                      // form.jsxi:311
				if (close === undefined)                                           // ...
					close = open;                                                  // ...
				var textarea = __that.__Form_element.findId ('message')[0],        // form.jsxi:312
					start = textarea.selectionStart,                               // form.jsxi:313
					end = textarea.selectionEnd,                                   // form.jsxi:314
					before = textarea.value.substring (0, start),                  // form.jsxi:315
					after = textarea.value.substring (end),                        // form.jsxi:316
					selected = textarea.value.substring (start, end);              // form.jsxi:317
				if (before.slice (- open.length) === open && after.substring (0, close.length) === close){
					textarea.value = before.slice (0, - open.length) + selected + after.substring (close.length);
					textarea.selectionStart = start - open.length;                 // form.jsxi:321
					textarea.selectionEnd = end - open.length;                     // form.jsxi:322
				} else if (selected.substring (0, open.length) === open && selected.slice (- close.length) === close){
					textarea.value = before + selected.substring (open.length, selected.length - close.length) + after;
					textarea.selectionStart = start;                               // form.jsxi:325
					textarea.selectionEnd = end - open.length;                     // form.jsxi:326
				} else {
					textarea.value = before + open + selected + close + after;     // form.jsxi:328
					textarea.selectionStart = start + open.length;                 // form.jsxi:329
					textarea.selectionEnd = end + open.length;                     // form.jsxi:330
				}
				textarea.focus ();                                                 // form.jsxi:333
			}
			function quote (){                                                     // form.jsxi:336
				var textarea = __that.__Form_element.findId ('message')[0],        // form.jsxi:337
					start = textarea.selectionStart,                               // form.jsxi:338
					end = textarea.selectionEnd,                                   // form.jsxi:339
					before = textarea.value.substring (0, start),                  // form.jsxi:340
					after = textarea.value.substring (end),                        // form.jsxi:341
					selected = textarea.value.substring (start, end),              // form.jsxi:342
					lastIndex = before.lastIndexOf ('\n'),                         // form.jsxi:343
					temp;                                                          // form.jsxi:344
				before = textarea.value.substring (0, lastIndex + 1);              // form.jsxi:346
				selected = textarea.value.substring (lastIndex + 1, end);          // form.jsxi:347
				selected = '> ' + selected.replace ([object Object], '\n> ');      // form.jsxi:348
				textarea.value = before + selected + after.substring (close.length);
				textarea.selectionStart = lastIndex + 1;                           // form.jsxi:351
				temp = textarea.value.indexOf ('\n', selected.length + lastIndex + 1);
				textarea.selectionEnd = temp !== - 1 ? temp : textarea.value.length;
				textarea.focus ();                                                 // form.jsxi:355
			}
			this.__Form_element.findId ('style').click (function (arg){            // form.jsxi:358
				if (arg.which === 1 && arg.target.hasAttribute ('data-tag')){      // ...
					arg.preventDefault ();                                         // form.jsxi:359
					arg.stopPropagation ();                                        // form.jsxi:360
					var tag = arg.target.getAttribute ('data-tag');                // form.jsxi:362
					if (tag === '>')                                               // form.jsxi:363
						quote ();                                                  // form.jsxi:364
					else if ([object Object].test (tag))                           // form.jsxi:365
						applyCode ('[' + tag + ']', '[/' + tag + ']');             // form.jsxi:366
					else
						applyCode (tag);                                           // form.jsxi:368
				}
			});
		};
		Form.prototype.__Form_resizable = function (){
			var message = this.__Form_element.findId ('message'),                  // form.jsxi:377
				loaded = {},                                                       // form.jsxi:378
				width = loaded.width || message.width (),                          // form.jsxi:379
				height = loaded.height || message.height ();                       // form.jsxi:380
			message.on ('mouseup mousemove',                                       // form.jsxi:382
				function (arg){                                                    // ...
					var newWidth = message.width (), newHeight = message.height ();
					if (newWidth !== width || newHeight !== height){               // form.jsxi:386
						width = newWidth;                                          // form.jsxi:387
						height = newHeight;                                        // form.jsxi:388
						Preferences.set ('form-textarea-size', { width: newWidth, height: newHeight });
					}
				});
			if (loaded.width && loaded.height)                                     // form.jsxi:393
				message.css (loaded);                                              // form.jsxi:394
		};
		Form.prototype.__Form_insertText = function (text, special){               // form.jsxi:397
			var textarea = this.__Form_element.findId ('message')[0],              // form.jsxi:398
				start = textarea.selectionStart,                                   // form.jsxi:399
				end = textarea.selectionEnd,                                       // form.jsxi:400
				before = textarea.value.substring (0, start),                      // form.jsxi:401
				after = textarea.value.substring (end),                            // form.jsxi:402
				selected = textarea.value.substring (start, end);                  // form.jsxi:403
			if (special){                                                          // form.jsxi:405
				if (before.length && ![object Object].test (before[(before.length - 1)]))
					text = '\n' + text;                                            // form.jsxi:407
				text += '\n';                                                      // form.jsxi:409
			}
			textarea.value = before + text + after;                                // form.jsxi:412
			textarea.focus ();                                                     // form.jsxi:414
			textarea.selectionStart = end + text.length;                           // form.jsxi:415
			textarea.selectionEnd = end + text.length;                             // form.jsxi:416
		};
		Form.prototype.__Form_show = function (){
			this.__Form_visible = true;                                            // form.jsxi:420
			element[(element instanceof Form ? '__Form_show' : 'show')]().addClass ('visible').draggable (true, true);
		};
		Form.prototype.__Form_hide = function (){
			this.__Form_visible = false;                                           // form.jsxi:425
			this.__Form_element.removeClass ('visible').timeout (function (arg){   // form.jsxi:426
				var __;                                                            // form.jsxi:76
				return (__ = $ (this).css ({ bottom: null, right: null }),         // form.jsxi:426
					__[(__ instanceof Form ? '__Form_hide' : 'hide')]).call (__);
			}, 
			300);                                                                  // ...
			$ ('[ data-reply-mode=\"create-thread\"]').text ('Создать тред');      // form.jsxi:428
			$ ('[ data-reply-mode=\"send-post\"]').text ('Ответить');              // form.jsxi:429
		};
		Form.prototype.__Form_toggle = function (){
			if (this.__Form_visible)                                               // form.jsxi:76
				this.__Form_hide ();                                               // ...
			else
				this.__Form_show ();                                               // ...
			return this.__Form_visible;                                            // ...
		};
		Form.prototype.__Form_showAfter = function (parent){                       // form.jsxi:440
			var temp = parent.closest ('.thread').find ('[data-post]').data ('post'),
				args = temp ? temp.split ('/') : [ parent.closest ('[data-section]').data ('section') ];
			this.__Form_updateTarget (args[0], args[1]);                           // form.jsxi:76
			this.__Form_element.insertAfter (parent);                              // form.jsxi:446
			this.__Form_show ();                                                   // form.jsxi:76
		};
		Form.prototype.__Form_replyToPost = function (arg, reflinkClickMode){      // form.jsxi:450
			if (this.__Form_busy)                                                  // form.jsxi:76
				return;                                                            // form.jsxi:452
			var element = $ (arg),                                                 // form.jsxi:454
				post = element.closest ('.post, .thread'),                         // form.jsxi:455
				content = post.find ('[data-post]'),                               // form.jsxi:456
				from = content.data ('from');                                      // form.jsxi:457
			if (from){                                                             // form.jsxi:459
				content = $ ('[data-post=\"' + from + '\"]').eq (0);               // form.jsxi:461
				post = content.closest ('.post, .thread');                         // form.jsxi:462
			}
			var after = post.hasClass ('thread') ? post.find ('.content > [data-id=\"answers\"]').eq (0) : post,
				next = after.next (),                                              // form.jsxi:466
				temp = this.__Form_visible;                                        // form.jsxi:76
			if (!this.__Form_visible || !reflinkClickMode)                         // form.jsxi:469
				if (next.data ('id') === 'form')                                   // form.jsxi:470
					this.__Form_toggle ();                                         // form.jsxi:76
				else
					this.__Form_showAfter (after);                                 // ...
			if (this.__Form_visible || reflinkClickMode){                          // form.jsxi:475
				var target = content.data ('post').split ('/'),                    // form.jsxi:476
					insert = '>>' + (target[0] === this.__Form_section ? target[1] : target.join ('/')),
					special = reflinkClickMode && !temp || !reflinkClickMode && this.__Form_visible;
				this.__Form_insertText (insert, special);                          // form.jsxi:76
			}
		};
		Form.prototype.toggleAfter = function (arg){                               // form.jsxi:484
			return this.__Form_replyToPost (arg, false);                           // form.jsxi:76
		};
		Form.prototype.reflinkClick = function (arg){                              // form.jsxi:487
			return this.__Form_replyToPost (arg, true);                            // form.jsxi:76
		};
		Form.prototype.__Form_createThreadClick = function (arg){                  // form.jsxi:490
			var parent = arg.parent ();                                            // form.jsxi:491
			if (this.__Form_visible && parent.next ().hasClass ('form')){          // form.jsxi:492
				this.__Form_hide ();                                               // form.jsxi:76
			} else {
				$ ('[ data-reply-mode=\"create-thread\"]').text ('Создать тред');
				arg.text ('Закрыть форму');                                        // form.jsxi:496
				this.__Form_showAfter (parent);                                    // form.jsxi:76
			}
		};
		Form.prototype.__Form_sendPostClick = function (arg){                      // form.jsxi:501
			var parent = arg.parent ();                                            // form.jsxi:502
			if (this.__Form_visible && parent.next ().hasClass ('form')){          // form.jsxi:503
				this.__Form_hide ();                                               // form.jsxi:76
			} else {
				$ ('[data-reply-mode=\"send-post\"]').text ('Ответить');           // form.jsxi:506
				arg.text ('Закрыть форму');                                        // form.jsxi:507
				this.__Form_showAfter (parent);                                    // form.jsxi:76
			}
		};
		Form.prototype.replyClick = function (arg){                                // form.jsxi:512
			var target = $ (arg);                                                  // form.jsxi:513
			switch (target.data ('reply-mode')){                                   // form.jsxi:515
				case 'create-thread':                                              // form.jsxi:516
					this.__Form_createThreadClick (target);                        // form.jsxi:76
					break;                                                         // form.jsxi:518
				case 'send-post':                                                  // form.jsxi:519
					this.__Form_sendPostClick (target);                            // form.jsxi:76
					break;                                                         // form.jsxi:521
				default:
					this.toggleAfter (target);                                     // form.jsxi:76
			}
		};
		Form.on = function (type, fn){                                             // form.jsxi:4
			return dispatcher.on (type, fn);                                       // form.jsxi:5
		};
		Form.off = function (fn){                                                  // form.jsxi:7
			return dispatcher.off (fn);                                            // form.jsxi:8
		};
		return Form;
	}(), 
	ImageExpand = function (){                                                     // imageExpand.jsxi:1
		var ImageExpand = function (){};
		function collapse (_element){                                              // imageExpand.jsxi:6
			var element = $ (_element), post;                                      // imageExpand.jsxi:8
			if (element.hasClass ('expanded')){                                    // imageExpand.jsxi:10
				post = Posts.get (element.closest ('[data-post]').data ('post'));
				element.removeClass ('expanded').attr ('width', post.file.thumbinalDimensions.width).attr ('height', post.file.thumbinalDimensions.height).attr ('src',
					Post.fullpathAsThumbinal (post) ? post.file.fullpath : post.file.thumbinal);
			} else
				element.removeClass ('visible').timeout (function (arg){           // imageExpand.jsxi:20
					return $ (this).remove ();                                     // ...
				}, 
				300);                                                              // ...
		}
		function collapseAll (){                                                   // imageExpand.jsxi:23
			$ ('.thumb.expanded, .thumb.center').each (function (arg){             // imageExpand.jsxi:24
				return collapse (this);                                            // ...
			});
		}
		function expand (_element){                                                // imageExpand.jsxi:27
			var type = Preferences.get ('expand-type'),                            // imageExpand.jsxi:28
				element = $ (_element),                                            // imageExpand.jsxi:29
				post = Posts.get (element.closest ('[data-post]').data ('post')),
				fullWidth = post.file.dimensions.width,                            // imageExpand.jsxi:31
				fullHeight = post.file.dimensions.height,                          // imageExpand.jsxi:32
				windowWidth = $ (window).width () - 15,                            // imageExpand.jsxi:33
				windowHeight = $ (window).height ();                               // imageExpand.jsxi:34
			if (Preferences.get ('resize-images')){                                // imageExpand.jsxi:36
				var windowWidthPadding = windowWidth - 12 * 2;                     // imageExpand.jsxi:38
				windowHeightPadding = windowHeight - 12 * 2, scale = 1;            // ...
				switch (type){                                                     // imageExpand.jsxi:41
					case 'expand':                                                 // imageExpand.jsxi:42
						scale = fullWidth / windowWidthPadding;                    // imageExpand.jsxi:43
						break;                                                     // imageExpand.jsxi:44
					case 'center':                                                 // imageExpand.jsxi:45
						windowWidthPadding = windowWidth;                          // imageExpand.jsxi:46
						windowHeightPadding = windowHeight;                        // imageExpand.jsxi:47
						scale = Math.max (fullWidth / windowWidthPadding,          // imageExpand.jsxi:48
							fullHeight / windowHeightPadding);                     // ...
						break;                                                     // imageExpand.jsxi:49
				}
				if (scale > 1){                                                    // imageExpand.jsxi:52
					fullWidth /= scale;                                            // imageExpand.jsxi:53
					fullHeight /= scale;                                           // imageExpand.jsxi:54
				}
			}
			switch (type){                                                         // imageExpand.jsxi:58
				case 'expand':                                                     // imageExpand.jsxi:59
					element.addClass ('expanded').attr ({
						width: fullWidth,                                          // imageExpand.jsxi:63
						height: fullHeight,                                        // imageExpand.jsxi:64
						src: post.file.fullpath                                    // imageExpand.jsxi:65
					});
					return true;                                                   // imageExpand.jsxi:67
				case 'center':                                                     // imageExpand.jsxi:68
					collapseAll ();                                                // imageExpand.jsxi:69
					if (!element.next ().hasClass ('center')){                     // imageExpand.jsxi:70
						var size = 1;                                              // imageExpand.jsxi:71
						element.clone ().addClass ('center').addClass ('fading').attr ({
							width: fullWidth,                                      // imageExpand.jsxi:78
							height: fullHeight,                                    // imageExpand.jsxi:79
							src: post.file.fullpath,                               // imageExpand.jsxi:80
							unselectable: 'on',                                    // imageExpand.jsxi:81
							draggable: false                                       // imageExpand.jsxi:82
						}).css ({
							left: (windowWidth - fullWidth) / 2,                   // imageExpand.jsxi:85
							top: (windowHeight - fullHeight) / 2                   // imageExpand.jsxi:86
						}).insertAfter (element).timeout (function (arg){          // imageExpand.jsxi:89
							return $ (this).addClass ('visible');                  // ...
						}).on ('dragstart',                                        // imageExpand.jsxi:90
							function (arg){                                        // ...
								return false;                                      // ...
							}).on ('wheel',                                        // imageExpand.jsxi:91
							function (event){                                      // ...
								event.preventDefault ();                           // imageExpand.jsxi:92
								event.stopPropagation ();                          // imageExpand.jsxi:93
								size += size * (event.deltaY > 0 ? - 0.2 : 0.2);   // imageExpand.jsxi:95
								var element = $ (this),                            // imageExpand.jsxi:97
									oldLeft = parseFloat (element.css ('left')),   // imageExpand.jsxi:98
									oldTop = parseFloat (element.css ('top')),     // imageExpand.jsxi:99
									oldWidth = parseFloat (element.css ('width')),
									oldHeight = parseFloat (element.css ('height')),
									width = fullWidth * size,                      // imageExpand.jsxi:102
									height = fullHeight * size;                    // imageExpand.jsxi:103
								if (width < 200 || height < 200){                  // imageExpand.jsxi:105
									var scale = Math.min (width / 200, height / 200);
									width /= scale;                                // imageExpand.jsxi:107
									height /= scale;                               // imageExpand.jsxi:108
									size /= scale;                                 // imageExpand.jsxi:109
								}
								$ (this).css ({
									left: oldLeft + (oldWidth - width) / 2,        // imageExpand.jsxi:113
									top: oldTop + (oldHeight - height) / 2,        // imageExpand.jsxi:114
									width: width,                                  // imageExpand.jsxi:115
									height: height                                 // imageExpand.jsxi:116
								});
							}).data ('draggable', true).draggable ();              // imageExpand.jsxi:120
					}
					return true;                                                   // imageExpand.jsxi:122
				default:
					return false;                                                  // imageExpand.jsxi:124
			}
		}
		ImageExpand.click = function (event, _target){                             // imageExpand.jsxi:128
			var target = $ (_target),                                              // imageExpand.jsxi:129
				expanded = target.hasClass ('expanded');                           // imageExpand.jsxi:130
			if (target.hasClass ('expanded') || target.hasClass ('center')){       // imageExpand.jsxi:132
				collapse (target);                                                 // imageExpand.jsxi:133
			} else if (expand (target) === false)                                  // imageExpand.jsxi:134
				return;                                                            // imageExpand.jsxi:135
			event.preventDefault ();                                               // imageExpand.jsxi:137
			event.stopPropagation ();                                              // imageExpand.jsxi:138
		};
		(function (arg){                                                           // imageExpand.jsxi:2
			Preferences.on ('expand-type', collapseAll);                           // imageExpand.jsxi:3
		}());
		return ImageExpand;
	}(), 
	HiddensWindow = function (){                                                   // hiddensWindow.jsxi:1
		var HiddensWindow = function (arg){                                        // hiddensWindow.jsxi:3
			var __that = this;                                                     // hiddensWindow.jsxi:76
			Window.call (this, Mustache.hiddensWindowClass ());                    // ...
			Hiddens.on (function (arg){                                            // hiddensWindow.jsxi:5
				return __that.switchTab ();                                        // hiddensWindow.jsxi:76
			});
		};
		__pe (HiddensWindow, Window);
		HiddensWindow.prototype.__create = function (){
			this.caption (Mustache.hiddensWindowCaption ());                       // ...
			this.bar (Mustache.hiddensWindowBar ());                               // ...
			this.footer (Mustache.hiddensWindowFooter ());                         // ...
		};
		HiddensWindow.prototype.switchTab = function (id){                         // hiddensWindow.jsxi:14
			Window.prototype.switchTab.call (this, id);                            // hiddensWindow.jsxi:76
			this.__element.on ('change',                                           // hiddensWindow.jsxi:17
				function (arg){                                                    // ...
					var checkbox = $ (arg.target),                                 // hiddensWindow.jsxi:18
						type = checkbox.data ('checkbox'),                         // hiddensWindow.jsxi:19
						group,                                                     // hiddensWindow.jsxi:20
						childs,                                                    // hiddensWindow.jsxi:21
						main,                                                      // hiddensWindow.jsxi:22
						checked;                                                   // hiddensWindow.jsxi:23
					if (type){                                                     // hiddensWindow.jsxi:25
						group = checkbox.closest ('[data-id=\"group\"]');          // hiddensWindow.jsxi:26
						childs = group.find ('[data-checkbox=\"thread\"]');        // hiddensWindow.jsxi:27
						if (type === 'section'){                                   // hiddensWindow.jsxi:29
							childs.each (function (arg){                           // hiddensWindow.jsxi:30
								this.checked = arg.target.checked;                 // ...
							});
						} else if (type === 'thread'){                             // hiddensWindow.jsxi:31
							main = group.find ('[data-checkbox=\"section\"]');     // hiddensWindow.jsxi:32
							checked = childs.filter (':checked');                  // hiddensWindow.jsxi:33
							main[0].indeterminate = checked.length > 0 && checked.length < childs.length;
							main[0].checked = checked.length === childs.length;    // hiddensWindow.jsxi:36
						}
					}
				});
		};
		HiddensWindow.prototype.close = function (){
			Window.prototype.close.apply (this, arguments);                        // hiddensWindow.jsxi:76
			Hiddens.off (__bo (this, 'switchTab'));                                // hiddensWindow.jsxi:44
		};
		HiddensWindow.prototype.__HiddensWindow_params = function (){
			return {
				threads: Hiddens.sorted (),                                        // hiddensWindow.jsxi:49
				posts: Array.prototype.map.call ($ ('.thread .post[data-hidden] [data-post]'),
					function (arg){                                                // hiddensWindow.jsxi:50
						return Posts.get (arg.getAttribute ('data-post'));         // ...
					})
			};
		};
		HiddensWindow.prototype.__tab = function (id){                             // hiddensWindow.jsxi:53
			id = $.camelCase ('hiddensWindow-' + id);                              // hiddensWindow.jsxi:54
			return Mustache.hasOwnProperty (id) ? Mustache[id](this.__HiddensWindow_params ()) : '';
		};
		HiddensWindow.prototype.click = function (button, key, param){             // hiddensWindow.jsxi:58
			switch (key){                                                          // hiddensWindow.jsxi:59
				case 'unhide-all':                                                 // hiddensWindow.jsxi:60
					this.__element.find ('input[data-target]').each (function (arg){
						Hiddens.unhide (this.getAttribute ('data-target'));        // hiddensWindow.jsxi:62
					});
					return true;                                                   // hiddensWindow.jsxi:64
				case 'unhide-selected':                                            // hiddensWindow.jsxi:65
					this.__element.find ('input[data-target]:checked').each (function (arg){
						Hiddens.unhide (this.getAttribute ('data-target'));        // hiddensWindow.jsxi:67
					});
					return true;                                                   // hiddensWindow.jsxi:69
				default:
					if (Window.prototype.click.call (this, button, key, param))    // hiddensWindow.jsxi:76
						return true;                                               // hiddensWindow.jsxi:72
					console.warn ('Not implemented at 73 line of hiddensWindow.jsxi');
			}
		};
		return HiddensWindow;
	}(), 
	PreferencesWindow = function (){                                               // preferencesWindow.jsxi:1
		var PreferencesWindow = function (){                                       // preferencesWindow.jsxi:8
			this.__PreferencesWindow_params = { version: Application.version };    // preferencesWindow.jsxi:5
			Window.call (this, Mustache.preferencesWindowClass ());                // preferencesWindow.jsxi:76
		};
		__pe (PreferencesWindow, Window);
		PreferencesWindow.prototype.__create = function (){
			this.caption (Mustache.preferencesWindowCaption ());                   // ...
			this.bar (Mustache.preferencesWindowBar ());                           // ...
			this.footer (Mustache.preferencesWindowFooter ());                     // ...
			Preferences.on (__bo (this, 'preferences'));                           // preferencesWindow.jsxi:17
			Statistics.on (__bo (this, 'statistics'));                             // preferencesWindow.jsxi:18
			this.__PreferencesWindow_created = true;                               // preferencesWindow.jsxi:20
		};
		PreferencesWindow.prototype.__tab = function (id){                         // preferencesWindow.jsxi:23
			id = $.camelCase ('preferencesWindow-' + id);                          // preferencesWindow.jsxi:24
			return Mustache.hasOwnProperty (id) ? Mustache[id](this.__PreferencesWindow_params) : '';
		};
		PreferencesWindow.prototype.click = function (button, key, param){         // preferencesWindow.jsxi:28
			if (Window.prototype.click.call (this, button, key, param))            // preferencesWindow.jsxi:76
				return true;                                                       // preferencesWindow.jsxi:30
			switch (key){                                                          // preferencesWindow.jsxi:32
				case 'preferences-reset':                                          // preferencesWindow.jsxi:33
					Preferences.reset ();                                          // preferencesWindow.jsxi:34
					return true;                                                   // preferencesWindow.jsxi:35
				default:
					console.warn ('Not implemented at 37 line of preferencesWindow.jsxi');
			}
		};
		PreferencesWindow.prototype.preferences = function (value, key){           // preferencesWindow.jsxi:41
			if (!this.__PreferencesWindow_created)                                 // preferencesWindow.jsxi:76
				return;                                                            // preferencesWindow.jsxi:43
			this.__PreferencesWindow_set (key, value);                             // preferencesWindow.jsxi:76
			if (key === 'autoupdate-desktop-notifications' && value && Notification.permission !== 'granted'){
				if (Notification.permission === 'denied'){                         // preferencesWindow.jsxi:48
					new Message ('error',                                          // preferencesWindow.jsxi:49
						'Увы, но вы заблокировали показ уведомлений на этом сайте',
						2000).show ();                                             // ...
					Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')]('autoupdate-desktop-notifications', false);
				} else
					Notification.requestPermission (function (arg){                // preferencesWindow.jsxi:52
						if (arg !== 'granted'){                                    // preferencesWindow.jsxi:53
							new Message ('error',                                  // preferencesWindow.jsxi:54
								'Увы, но вы заблокировали показ уведомлений на этом сайте',
								2000).show ();                                     // ...
							Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')]('autoupdate-desktop-notifications', false);
						}
					});
			}
			if (key === 'theme' && this.__element.find ('[data-custom-setting=\"theme\"]').length)
				this.__PreferencesWindow_processThemeSelect ();                    // preferencesWindow.jsxi:76
		};
		PreferencesWindow.prototype.statistics = function (value){                 // preferencesWindow.jsxi:63
			if (!this.__PreferencesWindow_created)                                 // preferencesWindow.jsxi:76
				return;                                                            // preferencesWindow.jsxi:65
			var statistics = this.__element.findId ('statistics');                 // preferencesWindow.jsxi:67
			if (statistics.length){                                                // preferencesWindow.jsxi:68
				try {                                                              // preferencesWindow.jsxi:76
					var detStats = JSON.parse (localStorage.DESU_Config)[location.host].stats;
					value = $.extend ({},                                          // preferencesWindow.jsxi:71
						value,                                                     // ...
						{
							threadsVisited: value.threadsVisited + detStats.view,
							threadsCreated: value.threadsCreated + detStats.op,    // preferencesWindow.jsxi:73
							messagesSended: value.messagesSended + detStats.reply
						});
				} catch (e){}                                                      // preferencesWindow.jsxi:76
				statistics.html (Mustache.preferencesWindowStatistics (value));    // preferencesWindow.jsxi:78
			}
		};
		PreferencesWindow.prototype.close = function (){
			Window.prototype.close.apply (this, arguments);                        // preferencesWindow.jsxi:76
			Preferences.off (__bo (this, 'preferences'));                          // preferencesWindow.jsxi:84
			Statistics.off (__bo (this, 'statistics'));                            // preferencesWindow.jsxi:85
		};
		PreferencesWindow.prototype.__PreferencesWindow_type = function (element){
			return element.tagName === 'INPUT' ? element[(element instanceof PreferencesWindow ? '__PreferencesWindow_type' : 'type')] : element.tagName.toLowerCase ();
		};
		PreferencesWindow.prototype.__PreferencesWindow_set = function (target, arg){
			function depends (element, disable){                                   // preferencesWindow.jsxi:93
				var next = element.closest ('[data-id=\"window-body\"] > *').next ();
				if (next.hasClass ('preferences-depend'))                          // preferencesWindow.jsxi:95
					next.find ('input, select').attr ('disabled', disable ? true : null);
				next = element.parent ().prev ();                                  // preferencesWindow.jsxi:98
				if (next.hasClass ('preferences-depend-near'))                     // preferencesWindow.jsxi:99
					next.attr ('disabled', disable ? true : null);                 // preferencesWindow.jsxi:100
			}
			var element = $ (typeof target === 'string' ? '[data-setting=\"' + target + '\"]' : target),
				value = arg !== undefined ? arg : Preferences.get (element.data ('setting'));
			if (element.length)                                                    // preferencesWindow.jsxi:106
				switch (this.__PreferencesWindow_type (element[0])){               // preferencesWindow.jsxi:76
					case 'text':                                                   // preferencesWindow.jsxi:108
						element.val (value);                                       // preferencesWindow.jsxi:109
						break;                                                     // preferencesWindow.jsxi:110
					case 'checkbox':                                               // preferencesWindow.jsxi:111
						element.each (function (arg){                              // preferencesWindow.jsxi:112
							return this.checked = !!value;                         // ...
						});
						depends (element, !value);                                 // preferencesWindow.jsxi:113
						break;                                                     // preferencesWindow.jsxi:114
					case 'select':                                                 // preferencesWindow.jsxi:115
						element.val (value);                                       // preferencesWindow.jsxi:116
						depends (element,                                          // preferencesWindow.jsxi:117
							!value || element.find ('option[value=\"' + value + '\"]').data ('disable-next'));
						break;                                                     // preferencesWindow.jsxi:118
					case 'textarea':                                               // preferencesWindow.jsxi:119
						element.val (value);                                       // preferencesWindow.jsxi:120
						break;                                                     // preferencesWindow.jsxi:121
					default:
						console.warn ('Not implemented at 123 line of preferencesWindow.jsxi');
				}
		};
		PreferencesWindow.prototype.__PreferencesWindow_setStyles = function (data){
			var select = this.__element.find ('[data-custom-setting=\"theme\"]'),
				current = Preferences.get ('theme'),                               // preferencesWindow.jsxi:129
				found = false;                                                     // preferencesWindow.jsxi:130
			for (var _r = 0; _r < data.length; _r ++){                             // preferencesWindow.jsxi:135
				var group = data[_r];                                              // ...
				for (var _q = 0; _q < group.length; _q ++){                        // ...
					var style = group[_q];                                         // ...
					if (style.url === current)                                     // preferencesWindow.jsxi:134
						found = true;                                              // preferencesWindow.jsxi:135
				}
			}
			if (!found)                                                            // preferencesWindow.jsxi:137
				data.push ({
					group: 'Кастомные стили',                                      // preferencesWindow.jsxi:139
					styles: [ { url: current, name: 'Текущий' } ]                  // preferencesWindow.jsxi:140
				});
			select.html (Mustache.preferencesWindowThemeSelect (data)).removeAttr ('disabled').val (current).on ('change',
				function (arg){                                                    // preferencesWindow.jsxi:147
					Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')]('theme', this.value);
				});
		};
		PreferencesWindow.prototype.switchTab = function (id){                     // preferencesWindow.jsxi:152
			var __that = this;                                                     // preferencesWindow.jsxi:76
			Window.prototype.switchTab.call (this, id);                            // ...
			this.__element.find ('[data-setting]').each (function (arg){           // preferencesWindow.jsxi:155
				return __that.__PreferencesWindow_set (this);                      // preferencesWindow.jsxi:76
			}).on ('change',                                                       // preferencesWindow.jsxi:155
				function (arg){                                                    // ...
					var element = $ (this);                                        // preferencesWindow.jsxi:156
					switch (__that.__PreferencesWindow_type (this)){               // preferencesWindow.jsxi:76
						case 'text':                                               // preferencesWindow.jsxi:159
							if (element.attr ('pattern')){                         // preferencesWindow.jsxi:160
								var regExp = new RegExp ('^(' + element.attr ('pattern') + ')$');
								if (!regExp.test (this.value)){                    // preferencesWindow.jsxi:163
									element.addClass ('bad-value');                // preferencesWindow.jsxi:164
									return;                                        // preferencesWindow.jsxi:165
								}
							}
							element.removeClass ('bad-value');                     // preferencesWindow.jsxi:169
							Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')](element.data ('setting'), this.value);
							break;                                                 // preferencesWindow.jsxi:171
						case 'checkbox':                                           // preferencesWindow.jsxi:172
							Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')](element.data ('setting'), this.checked);
							break;                                                 // preferencesWindow.jsxi:174
						case 'select':                                             // preferencesWindow.jsxi:175
							Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')](element.data ('setting'), this.value);
							break;                                                 // preferencesWindow.jsxi:177
						case 'textarea':                                           // preferencesWindow.jsxi:178
							Preferences[(Preferences instanceof PreferencesWindow ? '__PreferencesWindow_set' : 'set')](element.data ('setting'), this.value);
							break;                                                 // preferencesWindow.jsxi:180
						default:
							console.warn ('Not implemented at 182 line of preferencesWindow.jsxi');
					}
				});
			this.__element.find ('[wip], [wip] input, [wip] select').attr ('disabled', true).attr ('title', 'В разработке');
			this.__element.find ('[data-required]').each (function (arg){          // preferencesWindow.jsxi:187
				var required = this.getAttribute ('data-required');                // preferencesWindow.jsxi:188
				if ([object Object].test (required)){                              // preferencesWindow.jsxi:189
					if (!(required in window))                                     // preferencesWindow.jsxi:190
						$ (this).attr ('disabled', true).attr ('title', 'В этом браузере опция не заработает');
				} else
					console.warn ('Not implemented at 193 line of preferencesWindow.jsxi');
			});
			this.statistics ();                                                    // preferencesWindow.jsxi:76
			var themeSelect = this.__element.find ('[data-custom-setting=\"theme\"]');
			if (themeSelect.length)                                                // preferencesWindow.jsxi:199
				this.__PreferencesWindow_processThemeSelect (themeSelect);         // preferencesWindow.jsxi:76
			this.__element.find ('.preferences-textarea').each (function (arg){    // preferencesWindow.jsxi:202
				return __that.__PreferencesWindow_processTextarea ($ (this));      // preferencesWindow.jsxi:76
			});
		};
		PreferencesWindow.prototype.__PreferencesWindow_processThemeSelect = function (select){
			return $.ajax ({
				url: '/clin/styles/styles.json',                                   // preferencesWindow.jsxi:207
				dataType: 'json',                                                  // preferencesWindow.jsxi:208
				success: __bo (this, '__PreferencesWindow_setStyles'),             // preferencesWindow.jsxi:76
				error: function (arg){                                             // preferencesWindow.jsxi:210
					return console.warn ('Not implemented at 210 line of preferencesWindow.jsxi');
				}
			});
		};
		PreferencesWindow.prototype.__PreferencesWindow_processTextarea = function (parent){
			var rows = parent.find ('div').eq (0),                                 // preferencesWindow.jsxi:214
				textarea = parent.find ('textarea'),                               // preferencesWindow.jsxi:215
				count = 20;                                                        // preferencesWindow.jsxi:216
			rows.html (__ca (1, count).join ('<br>'));                             // preferencesWindow.jsxi:218
			textarea.scroll (function (arg){                                       // preferencesWindow.jsxi:221
				rows.css ('top', - this.scrollTop);                                // preferencesWindow.jsxi:222
				var lines = this.value.match ([object Object]).length + 1,         // preferencesWindow.jsxi:224
					html = '';                                                     // preferencesWindow.jsxi:225
				while (count < lines)                                              // preferencesWindow.jsxi:226
					html += '<br>' + ++ count;                                     // preferencesWindow.jsxi:227
				if (html.length)                                                   // preferencesWindow.jsxi:229
					rows[0].insertAdjacentHTML ('beforeend', html);                // preferencesWindow.jsxi:230
			}).keydown (function (arg){                                            // preferencesWindow.jsxi:232
				if (arg.keyCode === 9){                                            // ...
					var start = this.selectionStart,                               // preferencesWindow.jsxi:233
						end = this.selectionEnd,                                   // preferencesWindow.jsxi:234
						value = this.value;                                        // preferencesWindow.jsxi:235
					this.value = value.substring (0, start) + '\t' + value.substring (end);
					this.selectionStart = this.selectionEnd = start + 1;           // preferencesWindow.jsxi:238
					arg.preventDefault ();                                         // preferencesWindow.jsxi:240
				}
			});
		};
		return PreferencesWindow;
	}(), 
	AuthorizePage = function (){                                                   // authorizePage.jsxi:1
		var AuthorizePage = function (){}, 
			phrases = [
				'Дерпи не грустит и ты не грусти.',                                // authorizePage.jsxi:6
				'Пони в каждый дом.',                                              // authorizePage.jsxi:7
				'Брони всех стран, объединяйтесь.',                                // authorizePage.jsxi:8
				'Дружба — магия, пони — милашки.',                                 // authorizePage.jsxi:9
				'Derpy. Connecting ponies.',                                       // authorizePage.jsxi:10
				'Следуй за белой пони.',                                           // authorizePage.jsxi:11
				'Пони расслабляют ум и снимают стресс.',                           // authorizePage.jsxi:12
				'Капля великого в каждой пони.',                                   // authorizePage.jsxi:13
				'Пони исцеляют душу, очищают карму.',                              // authorizePage.jsxi:14
				'Будущее принадлежит пони.',                                       // authorizePage.jsxi:15
				'Ответ прост: нужно стать пони.',                                  // authorizePage.jsxi:16
				'Принцесса Луна — великий миротворец.',                            // authorizePage.jsxi:17
				'Пони — это жизнь!',                                               // authorizePage.jsxi:18
				'Пони — это пони!',                                                // authorizePage.jsxi:19
				'Пони — цветы жизни.',                                             // authorizePage.jsxi:20
				'♪ Do you know you\'re all my very best friends ♪',                // authorizePage.jsxi:21
				'♪ So quietly and nice ♪',                                         // authorizePage.jsxi:22
				'♪ Hush now, quiet now It\'s time to go to bed ♪',                 // authorizePage.jsxi:23
				'♪ She\'s an evil enchantress She does evil dances ♪',             // authorizePage.jsxi:24
				'♪ The time has come to welcome spring ♪',                         // authorizePage.jsxi:25
				'Eeyup!',                                                          // authorizePage.jsxi:26
				'Yay!',                                                            // authorizePage.jsxi:27
				'Дорогая принцесса Селестия…',                                     // authorizePage.jsxi:28
				'Читай книги. Будешь умной как Твайлайт.',                         // authorizePage.jsxi:29
				'Читай книги. Будешь умным как Твайлайт.',                         // authorizePage.jsxi:30
				'Зима прошла, настало лето. Cпасибо, пони, вам за это!',           // authorizePage.jsxi:31
				'Будь пони и пони к тебе потянутся.',                              // authorizePage.jsxi:32
				'PonyCola. Always ask for more.',                                  // authorizePage.jsxi:33
				'Не корми параспрайтов. Защити Эквестрию.',                        // authorizePage.jsxi:34
				'В здоровой пони здоровый дух.',                                   // authorizePage.jsxi:35
				'Селестия любит тебя несмотря ни на что.',                         // authorizePage.jsxi:36
				'Понификация страны. Пятилетку за три года.',                      // authorizePage.jsxi:37
				'Понифицировал себя, понифицируй друга.',                          // authorizePage.jsxi:38
				'10 тысяч тонн дружбы.',                                           // authorizePage.jsxi:39
				'Лучей добра тебе, поняша!',                                       // authorizePage.jsxi:40
				'Из открытого окна мне Эквестрия видна.',                          // authorizePage.jsxi:41
				'Пони — пегас, пока не погас.',                                    // authorizePage.jsxi:42
				'Пони разные важны, пони разные нужны.'                            // authorizePage.jsxi:43
			];
		__pe (AuthorizePage, AbstractPage);
		AuthorizePage.prototype.__title = function (){
			return 'Поня.ч';                                                       // authorizePage.jsxi:53
		};
		AuthorizePage.prototype.build = function (data){                           // authorizePage.jsxi:55
			return Mustache.authorizePage ({
				host: location.host,                                               // authorizePage.jsxi:57
				phrase: phrases[(phrases.length * Math.random () | 0)]             // authorizePage.jsxi:58
			});
		};
		AuthorizePage.prototype.run = function (){
			var __that = this;                                                     // authorizePage.jsxi:76
			AbstractPage.prototype.run.apply (this, arguments);                    // ...
			if (Preferences.get ('authorized'))                                    // authorizePage.jsxi:64
				new AccountTypeRequest ().send (function (data){                   // authorizePage.jsxi:65
					if (data === null){                                            // authorizePage.jsxi:66
						console.warn ('Not implemented at 67 line of authorizePage.jsxi');
					} else {
						if (data === false)                                        // authorizePage.jsxi:69
							__that.__AuthorizePage_requestPassword ();             // authorizePage.jsxi:76
						else
							__that.__AuthorizePage_autorized (Preferences.get ('authorized'), true);
					}
				});
			else
				nextTick (__bo (this, '__AuthorizePage_requestPassword'));         // ...
			this.__AuthorizePage_switchPage ('loading');                           // ...
		};
		AuthorizePage.prototype.__AuthorizePage_switchPage = function (to){        // authorizePage.jsxi:81
			this.__page.find ('.sub, .sub-main').removeClass ('visible').timeout (function (arg){
				return this.filter (':not(.visible)').css ('z-index', - 1);        // authorizePage.jsxi:82
			}, 
			300);                                                                  // ...
			return this.__page.find ('[data-id=\"' + to + '\"]').css ('z-index', null).addClass ('visible');
		};
		AuthorizePage.prototype.__AuthorizePage_autorized = function (login, already){
			var __that = this;                                                     // authorizePage.jsxi:76
			var html;                                                              // authorizePage.jsxi:87
			if (login)                                                             // authorizePage.jsxi:89
				html = Mustache.authorizePageSuccess ({ already: already, login: login });
			else
				html = Mustache.authorizePageExit ();                              // authorizePage.jsxi:92
			this.__AuthorizePage_switchPage ('done').html (html).find ('input[type=\"button\"]').click (function (arg){
				if (arg.which === 1){                                              // authorizePage.jsxi:97
					new AuthorizationRequest ().send (function (data){             // authorizePage.jsxi:98
						if (data === null){                                        // authorizePage.jsxi:99
							console.warn ('Not implemented at 100 line of authorizePage.jsxi');
						} else {
							__that.__AuthorizePage_autorized ();                   // authorizePage.jsxi:76
							Preferences.remove ('authorized');                     // authorizePage.jsxi:103
							setTimeout (function (arg){                            // authorizePage.jsxi:104
								return Page.reload ();                             // ...
							}, 
							2000);                                                 // ...
						}
					});
				}
			});
		};
		AuthorizePage.prototype.__AuthorizePage_requestPassword = function (){
			var __that = this;                                                     // authorizePage.jsxi:76
			this.__AuthorizePage_switchPage ('form');                              // ...
			this.__AuthorizePage_loginInput = this.__page.find ('input[type=\"text\"]');
			this.__AuthorizePage_passwordInput = this.__page.find ('input[type=\"password\"]');
			this.__AuthorizePage_buttonInput = this.__page.find ('input[type=\"button\"]');
			var saved = Preferences.get ('authorize-login', '');                   // authorizePage.jsxi:117
			if (saved){                                                            // authorizePage.jsxi:118
				this.__AuthorizePage_loginInput.val (saved);                       // authorizePage.jsxi:119
				this.__AuthorizePage_passwordInput[0].focus ();                    // authorizePage.jsxi:120
			} else
				this.__AuthorizePage_loginInput[0].focus ();                       // authorizePage.jsxi:122
			this.__AuthorizePage_loginInput.on ('change keyup keydown',            // authorizePage.jsxi:124
				__bo (this, '__AuthorizePage_update'));                            // authorizePage.jsxi:76
			this.__AuthorizePage_passwordInput.on ('change keyup keydown',         // authorizePage.jsxi:125
				__bo (this, '__AuthorizePage_update'));                            // authorizePage.jsxi:76
			this.__AuthorizePage_buttonInput.click (function (arg){                // authorizePage.jsxi:127
				if (arg.which === 1){                                              // ...
					var login = __that.__AuthorizePage_loginInput.val ().trim (),
						password = __that.__AuthorizePage_passwordInput.val ().trim ();
					__that.__AuthorizePage_request = new AuthorizationRequest (login, password).send (function (data){
						if (data === null){                                        // authorizePage.jsxi:132
							console.warn ('Not implemented at 133 line of authorizePage.jsxi');
						} else {
							__that.__AuthorizePage_success = data;                 // authorizePage.jsxi:135
							if (__that.__AuthorizePage_success === false){         // authorizePage.jsxi:137
								new Message ('error', 'Такие логин или пароль никуда не годятся', 2000).show ();
							} else {
								__that.__AuthorizePage_autorized (login);          // authorizePage.jsxi:76
								Preferences.set ('authorized', login);             // authorizePage.jsxi:141
								setTimeout (function (arg){                        // authorizePage.jsxi:142
									return Page.reload ();                         // ...
								}, 
								2000);                                             // ...
							}
						}
						__that.__AuthorizePage_request = null;                     // authorizePage.jsxi:146
						__that.__AuthorizePage_update ();                          // authorizePage.jsxi:76
					});
					__that.__AuthorizePage_update ();                              // ...
				}
			});
			this.__AuthorizePage_update ();                                        // ...
		};
		AuthorizePage.prototype.__AuthorizePage_update = function (){
			var enabled = !this.__AuthorizePage_success && !this.__AuthorizePage_request && this.__AuthorizePage_loginInput.val ().trim () && this.__AuthorizePage_passwordInput.val ().trim ();
			Preferences.set ('authorize-login',                                    // authorizePage.jsxi:158
				this.__AuthorizePage_loginInput.val ().trim ());                   // ...
			this.__AuthorizePage_buttonInput.attr ('disabled', enabled ? null : true);
			this.__AuthorizePage_buttonInput.toggleClass ('visible', !this.__AuthorizePage_request);
		};
		(function (arg){                                                           // authorizePage.jsxi:163
			if (Preferences.get ('authorized', false))                             // authorizePage.jsxi:164
				document.write ('<script src=\"/clin/moderation.js\"></script><link rel=\"stylesheet\" type=\"text/css\" href=\"/clin/moderation.css\"/>');
		}());
		return AuthorizePage;
	}(), 
	Panel = function (){                                                           // panel.jsxi:1
		var Panel = function (){                                                   // panel.jsxi:15
			var __that = this;                                                     // panel.jsxi:76
			this.__Panel_pagesCount = null;                                        // panel.jsxi:9
			this.__Panel_postsCount = null;                                        // panel.jsxi:10
			this.__Panel_imagesCount = null;                                       // panel.jsxi:11
			this.__Panel_element = $ (Mustache.panel ()).appendTo (document.body);
			Page.on ('navigate', __bo (this, '__Panel_navigate'));                 // panel.jsxi:18
			Preferences.on ('autoupdate',                                          // panel.jsxi:20
				function (arg){                                                    // ...
					return __that.__Panel_element.find ('[data-button=\"autoupdate\"]').toggleClass ('icon-autoupdate-disabled', !arg);
				});
			Preferences.on ('panel-expanded',                                      // panel.jsxi:22
				function (arg){                                                    // ...
					__that.__Panel_element.toggleClass ('expanded', arg);          // panel.jsxi:23
					__that.__Panel_updateExpandedState (arg);                      // panel.jsxi:76
				});
			this.__Panel_element.on ('mouseover mouseout',                         // panel.jsxi:27
				function (arg){                                                    // ...
					__that.__Panel_element.toggleClass ('hover', arg.type === 'mouseover');
					__that.__Panel_updateExpandedState ();                         // panel.jsxi:76
				});
		};
		Panel.prototype.__Panel_updateExpandedState = function (arg){              // panel.jsxi:33
			return this.__Panel_element.css ('right',                              // panel.jsxi:34
				arg || this.__Panel_element.hasClass ('hover') || this.__Panel_element.hasClass ('expanded') ? - parseFloat (this.__Panel_element.css ('margin-right')) : 0);
		};
		Panel.prototype.click = function (button, data, param){                    // panel.jsxi:36
			switch (data){                                                         // panel.jsxi:37
				case 'logo':                                                       // panel.jsxi:38
					Preferences.toggle ('panel-expanded');                         // panel.jsxi:39
					break;                                                         // panel.jsxi:40
				case 'mask-images':                                                // panel.jsxi:41
					Preferences.toggle ('mask-images');                            // panel.jsxi:42
					break;                                                         // panel.jsxi:43
				case 'refresh':                                                    // panel.jsxi:44
					Page.reload ();                                                // panel.jsxi:45
					break;                                                         // panel.jsxi:46
				case 'scrollup':                                                   // panel.jsxi:47
					Application.scrollTo (0);                                      // panel.jsxi:48
					break;                                                         // panel.jsxi:49
				case 'scrolldown':                                                 // panel.jsxi:50
					Application.scrollTo (10000000000);                            // panel.jsxi:51
					break;                                                         // panel.jsxi:52
				case 'autoupdate':                                                 // panel.jsxi:53
					Preferences.toggle ('autoupdate');                             // panel.jsxi:54
					break;                                                         // panel.jsxi:55
				default:
					console.warn ('Not implemented at 57 line of panel.jsxi');     // panel.jsxi:57
			}
		};
		Panel.prototype.__Panel_rebuild = function (){
			var html;                                                              // panel.jsxi:61
			switch (this.__Panel_mode){                                            // panel.jsxi:76
				case 'page':                                                       // panel.jsxi:64
					html = Mustache.panelIndex ();                                 // panel.jsxi:65
					break;                                                         // panel.jsxi:66
				case 'section':                                                    // panel.jsxi:68
					html = Mustache.panelSection ({
						backUrl: this.__Panel_pageNumber ? '/' + this.__Panel_section + '/' + this.__Panel_pageNumber - 1 + '.html' : null,
						forwardUrl: this.__Panel_pagesCount > this.__Panel_pageNumber + 1 ? '/' + this.__Panel_section + '/' + this.__Panel_pageNumber + 1 + '.html' : null
					});
					break;                                                         // panel.jsxi:74
				case 'thread':                                                     // panel.jsxi:76
					html = Mustache.panelThread ({
						backUrl: '/' + this.__Panel_section + '/',                 // panel.jsxi:78
						postsCount: this.__Panel_postsCount,                       // panel.jsxi:76
						imagesCount: this.__Panel_imagesCount                      // ...
					});
					break;                                                         // panel.jsxi:82
			}
			this.__Panel_element.find ('[data-id=\"buttons\"]').html (html);       // panel.jsxi:85
			if (!Preferences.get ('autoupdate'))                                   // panel.jsxi:87
				this.__Panel_element.find ('[data-button=\"autoupdate\"]').addClass ('icon-autoupdate-disabled');
			this.__Panel_element.css ('margin-right',                              // panel.jsxi:90
				- this.__Panel_element.find ('.panel-buttons').width ());          // ...
			this.__Panel_updateExpandedState ();                                   // panel.jsxi:76
		};
		Panel.prototype.__Panel_navigate = function (params){                      // panel.jsxi:95
			var __that = this;                                                     // panel.jsxi:76
			this.__Panel_mode = params.page;                                       // panel.jsxi:96
			if (this.__Panel_request)                                              // panel.jsxi:76
				this.__Panel_request.cancel ();                                    // panel.jsxi:99
			Autoupdate.off (__bo (this, '__Panel_update'));                        // panel.jsxi:100
			switch (params.page){                                                  // panel.jsxi:102
				case 'section':                                                    // panel.jsxi:103
					this.__Panel_section = params[(params instanceof Panel ? '__Panel_section' : 'section')];
					this.__Panel_pageNumber = params[(params instanceof Panel ? '__Panel_pageNumber' : 'pageNumber')];
					this.__Panel_pagesCount = null;                                // panel.jsxi:106
					this.__Panel_request = new ThreadsRequest (this.__Panel_section, this.__Panel_pageNumber).send (function (data){
						if (data !== null)                                         // panel.jsxi:109
							__that.__Panel_pagesCount = data[(data instanceof Panel ? '__Panel_pagesCount' : 'pagesCount')];
						__that.__Panel_rebuild ();                                 // panel.jsxi:76
						__that.__Panel_request = null;                             // panel.jsxi:113
					});
					break;                                                         // panel.jsxi:116
				case 'thread':                                                     // panel.jsxi:118
					this.__Panel_section = params[(params instanceof Panel ? '__Panel_section' : 'section')];
					this.__Panel_thread = params[(params instanceof Panel ? '__Panel_thread' : 'thread')];
					this.__Panel_postsCount = this.__Panel_imagesCount = null;     // panel.jsxi:121
					this.__Panel_request = new PostsRequest (this.__Panel_section, this.__Panel_thread).send (function (data, timestamp){
						if (data !== null){                                        // panel.jsxi:124
							__that.__Panel_postsCount = data.length;               // panel.jsxi:125
							__that.__Panel_imagesCount = 0;                        // panel.jsxi:126
							for (var _i = 0; _i < data.length; _i ++){             // panel.jsxi:130
								var post = data[_i];                               // ...
								if (post.file)                                     // panel.jsxi:129
									__that.__Panel_imagesCount ++;                 // panel.jsxi:76
							}
							__that.__Panel_rebuild ();                             // ...
							Autoupdate.on (__bo (__that, '__Panel_update'));       // panel.jsxi:133
						}
						__that.__Panel_request = null;                             // panel.jsxi:136
					});
					break;                                                         // panel.jsxi:139
			}
			this.__Panel_rebuild ();                                               // panel.jsxi:76
		};
		Panel.prototype.__Panel_update = function (){
			var __that = this;                                                     // ...
			console.assert (this.__Panel_mode === 'thread', 'Fixme');              // panel.jsxi:146
			function handler (data){                                               // panel.jsxi:148
				if (data === null){                                                // panel.jsxi:149
					console.warn ('Not implemented at 150 line of panel.jsxi');    // panel.jsxi:150
				} else if (data.length > 0){                                       // panel.jsxi:151
					var posts = Posts[(Posts instanceof Panel ? '__Panel_thread' : 'thread')](__that.__Panel_section, __that.__Panel_thread);
					__that.__Panel_postsCount = posts.length;                      // panel.jsxi:154
					__that.__Panel_imagesCount = 0;                                // panel.jsxi:155
					for (var _j = 0; _j < posts.length; _j ++){                    // panel.jsxi:159
						var post = posts[_j];                                      // ...
						if (post.file)                                             // panel.jsxi:158
							__that.__Panel_imagesCount ++;                         // panel.jsxi:76
					}
					__that.__Panel_rebuild ();                                     // ...
				}
			}
			new ThreadRefreshRequest (this.__Panel_section, this.__Panel_thread).send (handler);
		};
		return Panel;
	}(), 
	FavoritesWindow = function (){                                                 // favoritesWindow.jsxi:1
		var FavoritesWindow = function (arg){                                      // favoritesWindow.jsxi:3
			Window.call (this, Mustache.favoritesWindowClass ());                  // favoritesWindow.jsxi:76
			Favorites.on (__bo (this, '__FavoritesWindow_redraw'));                // favoritesWindow.jsxi:5
		};
		__pe (FavoritesWindow, Window);
		FavoritesWindow.prototype.__FavoritesWindow_redraw = function (){
			this.body (Mustache.favoritesWindowBody ({ threads: Favorites.sorted () }));
		};
		FavoritesWindow.prototype.__create = function (){
			this.caption (Mustache.favoritesWindowCaption ());                     // favoritesWindow.jsxi:76
			this.footer (Mustache.favoritesWindowFooter ());                       // ...
			this.__FavoritesWindow_redraw ();                                      // ...
			this.__element.on ('change',                                           // favoritesWindow.jsxi:19
				function (arg){                                                    // ...
					var checkbox = $ (arg.target),                                 // favoritesWindow.jsxi:20
						type = checkbox.data ('checkbox'),                         // favoritesWindow.jsxi:21
						group = checkbox.closest ('[data-id=\"group\"]'),          // favoritesWindow.jsxi:22
						childs = group.find ('[data-checkbox=\"thread\"]'),        // favoritesWindow.jsxi:23
						main,                                                      // favoritesWindow.jsxi:24
						checked;                                                   // favoritesWindow.jsxi:25
					if (type === 'section'){                                       // favoritesWindow.jsxi:27
						childs.each (function (arg){                               // favoritesWindow.jsxi:28
							this.checked = arg.target.checked;                     // ...
						});
					} else if (type === 'thread'){                                 // favoritesWindow.jsxi:29
						main = group.find ('[data-checkbox=\"section\"]');         // favoritesWindow.jsxi:30
						checked = childs.filter (':checked');                      // favoritesWindow.jsxi:31
						main[0].indeterminate = checked.length > 0 && checked.length < childs.length;
						main[0].checked = checked.length === childs.length;        // favoritesWindow.jsxi:34
					}
				});
		};
		FavoritesWindow.prototype.close = function (){
			Window.prototype.close.apply (this, arguments);                        // favoritesWindow.jsxi:76
			Favorites.off (__bo (this, '__FavoritesWindow_redraw'));               // favoritesWindow.jsxi:41
		};
		FavoritesWindow.prototype.__tab = function (id){};                         // favoritesWindow.jsxi:44
		FavoritesWindow.prototype.click = function (button, key, param){           // favoritesWindow.jsxi:46
			switch (key){                                                          // favoritesWindow.jsxi:47
				case 'remove-selected':                                            // favoritesWindow.jsxi:48
					return true;                                                   // favoritesWindow.jsxi:52
				default:
					if (Window.prototype.click.call (this, button, key, param))    // favoritesWindow.jsxi:76
						return true;                                               // favoritesWindow.jsxi:55
					console.warn ('Not implemented at 56 line of favoritesWindow.jsxi');
			}
		};
		return FavoritesWindow;
	}(), 
	SectionsList = function (){                                                    // sectionsList.jsxi:1
		var SectionsList = function (host){                                        // sectionsList.jsxi:9
			AbstractElement.call (this, host);                                     // sectionsList.jsxi:76
			this.__set (Mustache.sectionsList (), true);                           // ...
			Preferences.on ('custom-sections', __bo (this, '__SectionsList_update'));
			this.__SectionsList_request = new SectionsRequest ().send (__bo (this, '__build'));
		};
		__pe (SectionsList, AbstractElement);
		SectionsList.prototype.__SectionsList_update = function (value){           // sectionsList.jsxi:17
			if (this.__SectionsList_previous)                                      // sectionsList.jsxi:76
				this.__build (this.__SectionsList_previous);                       // ...
		};
		SectionsList.prototype.__build = function (data, errorCode){               // sectionsList.jsxi:22
			if (data === null){                                                    // sectionsList.jsxi:23
				if (this.host.data ('loaded')){                                    // sectionsList.jsxi:24
					new Message ('error',                                          // sectionsList.jsxi:25
						errorCode,                                                 // ...
						'Не удалось загрузить меню:\n\nОшибка #' + Errors.description (errorCode) + ': %1',
						true).show ();                                             // ...
					this.__set (' ', true);                                        // sectionsList.jsxi:76
					this.__loaded ();                                              // ...
				} else
					this.__failed (errorCode);                                     // ...
			} else {
				data = $.extend (true, [], this.__SectionsList_previous = data);   // sectionsList.jsxi:31
				Array.prototype.push.apply (data[0],                               // sectionsList.jsxi:33
					Preferences.get ('custom-sections', []).map (function (arg){   // ...
						return { name: arg, url: '/' + arg + '/', custom: true };
					}));
				if (Page.section && data[0].filter (function (arg){                // sectionsList.jsxi:39
					return arg.name === Page.section;                              // ...
				}).length === 0)                                                   // ...
					data[0].push ({
						name: Page.section,                                        // sectionsList.jsxi:41
						url: '/' + Page.section + '/',                             // sectionsList.jsxi:42
						ghost: true                                                // sectionsList.jsxi:43
					});
				this.__set (Mustache.sectionsList ({ menu: data }), true);         // sectionsList.jsxi:76
				this.__loaded ();                                                  // ...
			}
		};
		SectionsList.prototype.destroy = function (){
			this.__SectionsList_request.cancel ();                                 // sectionsList.jsxi:51
			Preferences.off (__bo (this, '__SectionsList_update'));                // sectionsList.jsxi:52
		};
		SectionsList.customSection = function (name, action){                      // sectionsList.jsxi:55
			switch (action){                                                       // sectionsList.jsxi:56
				case 'add':                                                        // sectionsList.jsxi:57
					Preferences[(Preferences instanceof AbstractElement ? '__set' : 'set')]('custom-sections',
						Preferences.get ('custom-sections', []).concat ([ name ]).sort ());
					break;                                                         // sectionsList.jsxi:62
				case 'remove':                                                     // sectionsList.jsxi:63
					Preferences[(Preferences instanceof AbstractElement ? '__set' : 'set')]('custom-sections',
						Preferences.get ('custom-sections', []).filter (function (arg){
							return arg !== name;                                   // sectionsList.jsxi:66
						}));
					break;                                                         // sectionsList.jsxi:68
				default:
					console.warn ('Not implemented at 70 line of sectionsList.jsxi');
			}
		};
		(function (arg){                                                           // sectionsList.jsxi:5
			AbstractElement.__types['sections-list'] = SectionsList;               // ...
		}());
		return SectionsList;
	}(), 
	Post = function (){                                                            // post.jsxi:1
		var Post = function (section, id){                                         // post.jsxi:9
				var data = Posts.get (section, id);                                // post.jsxi:10
				if (!data){                                                        // post.jsxi:12
					this.__Post_element = $ (Mustache.postLoading ());             // post.jsxi:13
					new PostRequest (section, id).send (__bo (this, '__Post_loaded'));
				} else
					this.__Post_element = $ (Post.buildHtml (data, { threadMode: false }));
			}, 
			useFullImages,                                                         // post.jsxi:92
			useFullGifs,                                                           // post.jsxi:93
			popupEnabled,                                                          // post.jsxi:94
			showTimeout,                                                           // post.jsxi:95
			hideTimeout,                                                           // post.jsxi:96
			linksDetect,                                                           // post.jsxi:97
			ignoreHidden,                                                          // post.jsxi:98
			timeout,                                                               // post.jsxi:99
			displayedHidden;                                                       // post.jsxi:100
		Post.prototype.__Post_loaded = function (data, errorCode){                 // post.jsxi:19
			var html, params;                                                      // post.jsxi:20
			if (data === null){                                                    // post.jsxi:22
				params = {
					section: section,                                              // post.jsxi:24
					id: id,                                                        // post.jsxi:25
					errorCode: errorCode,                                          // post.jsxi:26
					errorDescription: Errors.description (errorCode)               // post.jsxi:27
				};
				switch (errorCode){                                                // post.jsxi:30
					case 1404:                                                     // post.jsxi:31
						html = Mustache.postNotFound (params);                     // post.jsxi:32
						break;                                                     // post.jsxi:33
					default:
						html = Mustache.postError (params);                        // post.jsxi:35
				}
			} else
				html = $ (Post.buildHtml (data, { threadMode: false })).html ();   // post.jsxi:38
			this.__Post_element.html (html);                                       // post.jsxi:40
			if (this.__Post_later){                                                // post.jsxi:76
				this.__Post_popupHighlight (this.__Post_later.highlight);          // ...
				this.__Post_fixPopupStyles ();                                     // ...
			}
		};
		Post.prototype.__Post_popupHighlight = function (arg){                     // post.jsxi:48
			return this.__Post_element.find ('a[data-link=\"' + arg + '\"]').addClass ('reflink-highlight').length > 0;
		};
		Post.prototype.popup = function (parent, link, highlight, from){           // post.jsxi:51
			var rect = link.getBoundingClientRect (),                              // post.jsxi:52
				parentRect = parent.getBoundingClientRect (),                      // post.jsxi:53
				left = rect.left + rect.width / 2 - parentRect.left,               // post.jsxi:54
				top = rect.top + rect.height - parentRect.top;                     // post.jsxi:55
			this.__Post_element.appendTo (parent).css ({ left: Math.round (left), top: Math.round (top) }).addClass ('popup').addClass ('fading').timeout (function (arg){
				return $ (this).addClass ('visible');                              // post.jsxi:62
			}).draggable ();                                                       // post.jsxi:63
			this.__Post_element.find ('[data-post]').data ('from', from);          // post.jsxi:65
			if (!this.__Post_popupHighlight (highlight))                           // post.jsxi:76
				this.__Post_later = { highlight: highlight };                      // post.jsxi:68
			else
				this.__Post_fixPopupStyles ();                                     // post.jsxi:76
			return this.__Post_element;                                            // ...
		};
		Post.prototype.__Post_fixPopupStyles = function (){
			var content = this.__Post_element.find ('.content')[0];                // ...
			console.assert (content, 'Content not found');                         // post.jsxi:77
			var rect = content.getBoundingClientRect (),                           // post.jsxi:79
				dx = Math.min (window.innerWidth - rect.right, 0) - Math.min (rect.left, 0),
				dy = Math.min (window.innerHeight - rect.bottom, 0) - Math.min (rect.top, 0);
			this.__Post_element.css ({
				top: parseInt (this.__Post_element.css ('top')) + dy,              // post.jsxi:83
				left: parseInt (this.__Post_element.css ('left')) + dx,            // post.jsxi:84
				width: rect.width,                                                 // post.jsxi:85
				height: rect.height                                                // post.jsxi:86
			});
		};
		function each (post, fn){                                                  // post.jsxi:175
			return $ ('[data-post=\"' + post + '\"]').each (function (arg){        // post.jsxi:176
				return fn ($ (this).closest ('.post, .thread'));                   // ...
			});
		}
		function remove (post){                                                    // post.jsxi:178
			return each (post,                                                     // post.jsxi:179
				function (arg){                                                    // ...
					return arg.addClass ('deleted').find ('.post-number').remove ();
				});
		}
		function hide (post){                                                      // post.jsxi:181
			each (post,                                                            // post.jsxi:182
				function (arg){                                                    // ...
					return arg.addClass ('hidden').data ('hidden', 'true').find ('.icon[data-button=\"hide\"]').eq (0).removeClass ('hide-icon').addClass ('hidden-show-icon');
				});
			$ ('[data-link=\"' + post + '\"]').data ('strikethrough', true);       // post.jsxi:189
		}
		function show (post){                                                      // post.jsxi:192
			each (post,                                                            // post.jsxi:193
				function (arg){                                                    // ...
					return arg.removeClass ('hidden').find ('.icon[data-button=\"hide\"]').eq (0).removeClass ('hidden-show-icon').addClass ('hidden-hide-icon');
				});
		}
		function unhide (post){                                                    // post.jsxi:201
			each (post,                                                            // post.jsxi:202
				function (arg){                                                    // ...
					return arg.removeClass ('hidden').removeAttr ('data-hidden').find ('.icon[data-button=\"hide\"]').eq (0).removeClass ('hidden-show-icon').removeClass ('hidden-hide-icon').addClass ('hide-icon');
				});
			$ ('[data-link=\"' + post + '\"]').removeAttr ('data-strikethrough');
		}
		function answers (args){                                                   // post.jsxi:213
			for (var _k = 0; _k < args.length; _k ++){                             // post.jsxi:219
				var post = args[_k];                                               // ...
				var elements = $ ('[data-post=\"' + post + '\"] [data-id=\"answers\"]');
				if (elements.length)                                               // post.jsxi:217
					elements.html (Mustache.postAnswers (Posts.get (post)));       // post.jsxi:218
			}
		}
		function favorite (post){                                                  // post.jsxi:222
			each (post,                                                            // post.jsxi:223
				function (arg){                                                    // ...
					return arg.find ('[data-button=\"favorite\"]').eq (0).addClass ('favorite-marked-icon');
				});
		}
		function unfavorite (post){                                                // post.jsxi:226
			each (post,                                                            // post.jsxi:227
				function (arg){                                                    // ...
					return arg.find ('[data-button=\"favorite\"]').eq (0).removeClass ('favorite-marked-icon');
				});
		}
		Post.fullpathAsThumbinal = function (params){                              // post.jsxi:230
			return params.file && useFullImages && (!useFullGifs || params.file.fullpath.slice (- 4) === '.gif');
		};
		Post.buildHtml = function (params, override){                              // post.jsxi:233
			console.assert (params.next, 'Raw post detected');                     // post.jsxi:234
			if (Post.fullpathAsThumbinal (params)){                                // post.jsxi:76
				var file = $.extend ({}, params.file);                             // post.jsxi:237
				if (override === undefined)                                        // post.jsxi:238
					override = { file: file };                                     // post.jsxi:239
				else
					override.file = file;                                          // post.jsxi:241
				file.thumbinal = file.fullpath;                                    // post.jsxi:242
			}
			return Mustache.post ({
				answersHtml: params.next.length > 0 ? Mustache.postAnswers (params) : null,
				embedsHtml: params.embeds.length > 0 ? Embed.buildHtml (params.embeds) : null
			}, 
			params,                                                                // post.jsxi:250
			override);                                                             // post.jsxi:251
		};
		Post.highlight = function (post){                                          // post.jsxi:255
			$ ('.content.highlight').removeClass ('highlight');                    // post.jsxi:256
			$ ('.thread .post:not(.popup) .content[data-post=\"' + Page.section + '/' + post + '\"]').addClass ('highlight');
		};
		Post.mouseover = function (element){                                       // post.jsxi:260
			if (element.hasAttribute ('data-display-hidden')){                     // post.jsxi:261
				var post = $ (element).closest ('.post, .thread');                 // post.jsxi:262
				if (post.hasClass ('hidden')){                                     // post.jsxi:263
					displayedHidden = post.removeClass ('hidden').addClass ('semi-hidden');
				}
			} else if (popupEnabled && (linksDetect || !element.hasAttribute ('data-link-override'))){
				element = $ (element);                                             // post.jsxi:267
				if (ignoreHidden && Posts.isHidden (element.data ('link')))        // post.jsxi:269
					return;                                                        // post.jsxi:270
				timeout = setTimeout (function (arg){                              // post.jsxi:272
					timeout = false;                                               // post.jsxi:273
					var attribute = element.data ('link').split ('/'),             // post.jsxi:275
						parent = element.closest ('.post'),                        // post.jsxi:276
						parentPopup = parent.hasClass ('popup'),                   // post.jsxi:277
						parentContent = parent.find ('[data-post]'),               // post.jsxi:278
						post = new Post (attribute[0], attribute[1]).popup (parentPopup ? parent[0] : document.body,
							element[0],                                            // post.jsxi:282
							parentContent.data ('post'),                           // post.jsxi:283
							parentContent.data (parentPopup ? 'from' : 'post')).on ('mouseenter', mouseenter).on ('mouseleave', mouseleave),
						timeout;                                                   // post.jsxi:288
					function mouseenter (){                                        // post.jsxi:290
						if (timeout){                                              // post.jsxi:291
							clearTimeout (timeout);                                // post.jsxi:292
							timeout = false;                                       // post.jsxi:293
						}
					}
					function mouseleave (){                                        // post.jsxi:296
						return timeout = setTimeout (function (arg){               // post.jsxi:297
							post.removeClass ('visible').timeout (function (arg){
								return post.remove ();                             // post.jsxi:298
							}, 
							300);                                                  // ...
							timeout = false;                                       // post.jsxi:299
						}, 
						hideTimeout);                                              // post.jsxi:300
					}
					element.one ('mouseleave', mouseleave);                        // post.jsxi:302
				}, 
				showTimeout);                                                      // post.jsxi:303
			}
		};
		Post.mouseout = function (){                                               // post.jsxi:306
			if (timeout){                                                          // post.jsxi:307
				clearTimeout (timeout);                                            // post.jsxi:308
				timeout = false;                                                   // post.jsxi:309
			}
			if (displayedHidden){                                                  // post.jsxi:312
				displayedHidden.addClass ('hidden').removeClass ('semi-hidden');   // post.jsxi:313
				displayedHidden = null;                                            // post.jsxi:314
			}
		};
		Post.hideAllPopups = function (){                                          // post.jsxi:318
			$ ('.post.popup.visible').removeClass ('visible').timeout (function (arg){
				return $ (this).remove ();                                         // post.jsxi:321
			}, 
			300);                                                                  // ...
		};
		(function (arg){                                                           // post.jsxi:102
			Page.on ('navigate', Post.hideAllPopups);                              // post.jsxi:103
			Page.on ('hash', Post.highlight);                                      // post.jsxi:104
			Preferences.on ('use-full-images use-full-gifs',                       // post.jsxi:106
				function (arg){                                                    // ...
					useFullImages = Preferences.get ('use-full-images');           // post.jsxi:107
					useFullGifs = Preferences.get ('use-full-gifs');               // post.jsxi:108
					$ ('.post > .content, .thread > .content').each (function (arg){
						var element = $ (this),                                    // post.jsxi:111
							params = Posts.get (element.data ('post'));            // post.jsxi:112
						if (params.file)                                           // post.jsxi:114
							element.find ('.thumb:not(.expanded):not(.center)').each (function (arg){
								return this.src = Post.fullpathAsThumbinal (params) ? params.file.fullpath : params.file.thumbinal;
							});
					});
				});
			Preferences.on ('links-image-detect',                                  // post.jsxi:120
				function (arg){                                                    // ...
					var to = arg ? 'src' : 'data-src',                             // post.jsxi:121
						from = arg ? 'data-src' : 'src';                           // post.jsxi:122
					$ ('.image-preview').each (function (arg){                     // post.jsxi:123
						this.setAttribute (to, this.getAttribute (from));          // post.jsxi:124
						this.removeAttribute (from);                               // post.jsxi:125
					});
				});
			Preferences.on ('links-audio-detect',                                  // post.jsxi:129
				function (arg){                                                    // ...
					var to = arg ? 'src' : 'data-src',                             // post.jsxi:130
						from = arg ? 'data-src' : 'src';                           // post.jsxi:131
					$ ('.audio-preview source').each (function (arg){              // post.jsxi:132
						this.setAttribute (to, this.getAttribute (from));          // post.jsxi:133
						this.removeAttribute (from);                               // post.jsxi:134
						var parent = $ (this.parentNode);                          // post.jsxi:135
						parent.replaceWith (parent.clone ());                      // post.jsxi:136
					});
				});
			Preferences.on ('popup-posts popup-posts-in popup-posts-out links-detect popup-posts-ignore-hidden',
				function (value, key){                                             // post.jsxi:140
					switch (key){                                                  // post.jsxi:141
						case 'popup-posts':                                        // post.jsxi:142
							popupEnabled = !!value;                                // post.jsxi:143
							break;                                                 // post.jsxi:144
						case 'links-detect':                                       // post.jsxi:145
							linksDetect = !!value;                                 // post.jsxi:146
							break;                                                 // post.jsxi:147
						case 'popup-posts-ignore-hidden':                          // post.jsxi:148
							ignoreHidden = !!value;                                // post.jsxi:149
							break;                                                 // post.jsxi:150
						case 'popup-posts-in':                                     // post.jsxi:151
							showTimeout = + value;                                 // post.jsxi:152
							if (Number.isNaN (showTimeout) || showTimeout < 0)     // post.jsxi:153
								showTimeout = 0;                                   // post.jsxi:154
							break;                                                 // post.jsxi:155
						case 'popup-posts-out':                                    // post.jsxi:156
							hideTimeout = + value;                                 // post.jsxi:157
							if (Number.isNaN (hideTimeout) || hideTimeout < 0)     // post.jsxi:158
								hideTimeout = 0;                                   // post.jsxi:159
							break;                                                 // post.jsxi:160
					}
					Post.hideAllPopups ();                                         // post.jsxi:76
				});
			Posts.on ('remove', remove);                                           // post.jsxi:166
			Hiddens.on ('hide', hide);                                             // post.jsxi:167
			Hiddens.on ('show', show);                                             // post.jsxi:168
			Hiddens.on ('unhide', unhide);                                         // post.jsxi:169
			Favorites.on ('add', favorite);                                        // post.jsxi:170
			Favorites.on ('remove', unfavorite);                                   // post.jsxi:171
			Answers.on (answers);                                                  // post.jsxi:172
		}());
		return Post;
	}(), 
	Application = function (){                                                     // application.jsxi:1
		var Application = function (){                                             // application.jsxi:10
			this.__Application_panel = new Panel ();                               // application.jsxi:11
			this.__Application_form = new Form ();                                 // application.jsxi:12
			this.__Application_styles = new Styles ();                             // application.jsxi:13
		};
		Application.prototype.run = function (){
			var __;                                                                // application.jsxi:76
			(__ = (__ = (__ = $ (document.body),                                   // application.jsxi:17
						__[(__ instanceof Application ? '__Application_click' : 'click')]).call (__, __bo (this, '__Application_click')),
					__[(__ instanceof Application ? '__Application_mouseover' : 'mouseover')]).call (__, __bo (this, '__Application_mouseover')),
				__[(__ instanceof Application ? '__Application_mouseout' : 'mouseout')]).call (__, __bo (this, '__Application_mouseout'));
			Page.on ('navigate', __bo (this, '__Application_navigate'));           // application.jsxi:22
			Page.on ('hash', Application.hash);                                    // application.jsxi:23
		};
		Application.prototype.__Application_navigate = function (params){          // application.jsxi:26
			if (this.__Application_page)                                           // application.jsxi:76
				this.__Application_page.destroy ();                                // application.jsxi:28
			switch (params[(params instanceof Application ? '__Application_page' : 'page')]){
				case 'index':                                                      // application.jsxi:31
					this.__Application_page = new IndexPage ();                    // application.jsxi:32
					break;                                                         // application.jsxi:33
				case 'section':                                                    // application.jsxi:34
					this.__Application_page = new SectionPage (params.section, params.pageNumber);
					break;                                                         // application.jsxi:36
				case 'thread':                                                     // application.jsxi:37
					this.__Application_page = new ThreadPage (params.section, params.thread);
					break;                                                         // application.jsxi:39
				case 'authorize':                                                  // application.jsxi:40
					this.__Application_page = new AuthorizePage ();                // application.jsxi:41
					break;                                                         // application.jsxi:42
				case 'static':                                                     // application.jsxi:43
					this.__Application_page = new StaticPage (params.path);        // application.jsxi:44
					break;                                                         // application.jsxi:45
			}
			console.assert (this.__Application_page, 'Wrong page');                // application.jsxi:48
			this.__Application_page.run ();                                        // application.jsxi:49
		};
		Application.prototype.__Application_open = function (windowClass){         // application.jsxi:59
			if (this.__Application_openedWindow instanceof windowClass && !this.__Application_openedWindow.closed){
				this.__Application_openedWindow.close ();                          // application.jsxi:61
				this.__Application_openedWindow = null;                            // application.jsxi:62
			} else {
				if (this.__Application_openedWindow && !this.__Application_openedWindow.closed)
					this.__Application_openedWindow.close ();                      // application.jsxi:65
				this.__Application_openedWindow = new windowClass ();              // application.jsxi:66
			}
		};
		Application.prototype.__Application_buttonClick = function (event, _target){
			var target = $ (_target),                                              // application.jsxi:71
				splitted = target.data ('button').split (':'),                     // application.jsxi:72
				key = splitted[0],                                                 // application.jsxi:73
				argument = splitted[1];                                            // application.jsxi:74
			switch (key){                                                          // application.jsxi:76
				case 'empty':                                                      // application.jsxi:77
					break;                                                         // application.jsxi:78
				case 'image-search':                                               // application.jsxi:81
					ImageSearch.go (target.parent ().data ('param'), argument);    // application.jsxi:82
					break;                                                         // application.jsxi:83
				case 'custom-section':                                             // application.jsxi:85
					SectionsList.customSection (target.parent ().data ('param'), argument);
					break;                                                         // application.jsxi:87
				case 'thread-expand':                                              // application.jsxi:90
					var node = $ ('#' + target.parent ().data ('context')),        // application.jsxi:91
						element = node.closest ('.host'),                          // application.jsxi:92
						thread = currentPage.elementByNode (element[0]);           // application.jsxi:93
					thread.expand (node, + argument);                              // application.jsxi:95
					break;                                                         // application.jsxi:96
				case 'insert-id':                                                  // application.jsxi:99
					if (Preferences.get ('links-insert'))                          // application.jsxi:100
						this.__Application_form.reflinkClick (target);             // application.jsxi:101
					break;                                                         // application.jsxi:102
				case 'reply':                                                      // application.jsxi:105
					this.__Application_form.replyClick (target);                   // application.jsxi:106
					break;                                                         // application.jsxi:107
				case 'hide':                                                       // application.jsxi:110
					var post = target.closest ('.thread, .post'),                  // application.jsxi:111
						data = post.find ('[data-post]').data ('post');            // application.jsxi:112
					if (target.data ('display-hidden'))                            // application.jsxi:113
						Post[(Post instanceof Application ? '__Application_mouseout' : 'mouseout')]();
					Hiddens[(post.hasClass ('hidden') ? 'show' : 'hide')](data);   // application.jsxi:115
					break;                                                         // application.jsxi:116
				case 'favorite':                                                   // application.jsxi:119
					var post = target.closest ('.thread, .post'),                  // application.jsxi:120
						data = post.find ('[data-post]').data ('post');            // application.jsxi:121
					Favorites[(target.hasClass ('favorite-marked-icon') ? 'remove' : 'add')](data);
					break;                                                         // application.jsxi:123
				case 'form-close':                                                 // application.jsxi:126
					this.__Application_form.hide ();                               // application.jsxi:127
					break;                                                         // application.jsxi:128
				case 'embed':                                                      // application.jsxi:131
					if (Preferences.get ('links-embed-detect'))                    // application.jsxi:132
						Embed[(Embed instanceof Application ? '__Application_click' : 'click')](target);
					break;                                                         // application.jsxi:134
				case 'embed-player':                                               // application.jsxi:137
					if (Preferences.get ('embed-player'))                          // application.jsxi:138
						Embed.setPlayer (argument, splitted[2], target);           // application.jsxi:139
					break;                                                         // application.jsxi:140
				case 'preferences':                                                // application.jsxi:142
					this.__Application_open (PreferencesWindow);                   // application.jsxi:76
					break;                                                         // application.jsxi:144
				case 'hiddens':                                                    // application.jsxi:146
					this.__Application_open (HiddensWindow);                       // application.jsxi:76
					break;                                                         // application.jsxi:148
				case 'favorites':                                                  // application.jsxi:150
					this.__Application_open (FavoritesWindow);                     // application.jsxi:76
					break;                                                         // application.jsxi:152
				default:
					if (target.closest ('[data-id=panel]').length)                 // application.jsxi:156
						panel[(panel instanceof Application ? '__Application_click' : 'click')](target, key, argument);
					else if (target.closest ('[data-window]').length)              // application.jsxi:158
						openedWindow[(openedWindow instanceof Application ? '__Application_click' : 'click')](target, key, argument);
					else
						console.warn ('Not implemented at 161 line of application.jsxi');
			}
			event.preventDefault ();                                               // application.jsxi:164
			event.stopPropagation ();                                              // application.jsxi:165
		};
		Application.prototype.__Application_linkClick = function (event, _target){
			if (_target.hasAttribute ('target') || _target.href.indexOf (location.origin) !== 0)
				return;                                                            // application.jsxi:170
			event.preventDefault ();                                               // application.jsxi:172
			event.stopPropagation ();                                              // application.jsxi:173
			var target = $ (_target);                                              // application.jsxi:175
			if (target.data ('message'))                                           // application.jsxi:177
				new Message (target.data ('message-type'), target.data ('message')).show ();
			else
				Page[(Page instanceof Application ? '__Application_navigate' : 'navigate')](_target.href);
		};
		Application.prototype.__Application_click = function (event){              // application.jsxi:183
			var __that = this;                                                     // application.jsxi:76
			function checkFor (element, deep){                                     // application.jsxi:184
				if (element.hasAttribute ('data-button')){                         // application.jsxi:185
					__that.__Application_buttonClick (event, element);             // application.jsxi:76
				} else if (element.tagName === 'A'){                               // application.jsxi:187
					__that.__Application_linkClick (event, element);               // application.jsxi:76
				} else if (element.classList.contains ('thumb')){                  // application.jsxi:189
					ImageExpand[(ImageExpand instanceof Application ? '__Application_click' : 'click')](event, element);
				} else if (element.parentNode !== document.body && deep > 0)       // application.jsxi:191
					checkFor (element.parentNode, deep - 1);                       // application.jsxi:192
			}
			if (event.which === 1){                                                // application.jsxi:195
				checkFor (event.target, 2);                                        // application.jsxi:196
			} else if (event.which === 2 && event.target.getAttribute ('data-button') === 'insert-id' && Preferences.get ('links-insert')){
				Page[(Page instanceof Application ? '__Application_navigate' : 'navigate')](event.target.href);
				event.preventDefault ();                                           // application.jsxi:199
				event.stopPropagation ();                                          // application.jsxi:200
			}
		};
		Application.prototype.__Application_mouseover = function (event){          // application.jsxi:205
			if (event.target.hasAttribute ('data-link') || event.target.hasAttribute ('data-display-hidden')){
				Post[(Post instanceof Application ? '__Application_mouseover' : 'mouseover')](event.target);
			} else if (event.target.hasAttribute ('data-menu')){                   // application.jsxi:208
				Menu[(Menu instanceof Application ? '__Application_mouseover' : 'mouseover')](event.target);
			} else
				return;                                                            // application.jsxi:211
			event.target.setAttribute ('data-mouseover', true);                    // application.jsxi:213
		};
		Application.prototype.__Application_mouseout = function (event){           // application.jsxi:216
			if (event.target.hasAttribute ('data-mouseover')){                     // application.jsxi:217
				event.target.removeAttribute ('data-mouseover');                   // application.jsxi:218
				Post[(Post instanceof Application ? '__Application_mouseout' : 'mouseout')]();
				Menu[(Menu instanceof Application ? '__Application_mouseout' : 'mouseout')]();
			}
		};
		Application.version = '0.5.' + '2563';                                     // application.jsxi:2
		Application.hash = function (value){                                       // application.jsxi:52
			return nextTick (function (arg){                                       // application.jsxi:53
				if (value){                                                        // ...
					var target = $ ('.page [name=\"' + value + '\"]');             // application.jsxi:54
					if (target.length)                                             // application.jsxi:55
						Application.scrollTo (target.offset ().top);               // application.jsxi:76
				}
			});
		};
		Application.scrollTo = function (value){                                   // application.jsxi:224
			document.body.scrollTop = value;                                       // application.jsxi:225
			document.documentElement.scrollTop = value;                            // application.jsxi:226
		};
		return Application;
	}();
(function (){                                                                      // time.jsxi:15
	if ('performance' in window && typeof performance.now === 'function')          // time.jsxi:2
		Preferences.on ('debug-mode',                                              // time.jsxi:3
			function (arg){                                                        // ...
				var timers = {};                                                   // time.jsxi:4
				window.__dt = arg ? function (start, name){                        // time.jsxi:6
					if (start){                                                    // time.jsxi:7
						timers[name] = performance.now ();                         // time.jsxi:8
					} else {
						var delta = performance.now () - timers[name];             // time.jsxi:10
						if (delta > 2)                                             // time.jsxi:11
							console.debug (name + ': ' + delta.toFixed (2) + 'ms');
					}
				} : function (arg){};                                              // time.jsxi:13
			});
}());
(function (){                                                                      // default.jsx:541
	console.log ('Clin, ' + Application.version);                                  // default.jsx:525
	$ (function (arg){                                                             // default.jsx:527
		function fixFavicon (){                                                    // default.jsx:528
			var oldLink = $ ('link[rel=\"shortcut icon\"]'),                       // default.jsx:529
				newLink = $ (oldLink[0].outerHTML.replace ('favicon.ico', 'favicon.ico?r=' + + new Date ()));
			oldLink.remove ();                                                     // default.jsx:532
			newLink.appendTo (document.head);                                      // default.jsx:533
		}
		$ ('noscript').remove ();                                                  // default.jsx:536
		new Application ().run ();                                                 // default.jsx:537
		fixFavicon ();                                                             // default.jsx:539
	});
}());
