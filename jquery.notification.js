/*!
 * jquery-notification 1.2a
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */

;(function($) {
	$.notificationOptions = {
		showOnWindowFocused: false,
		restoreTitle: true,
		limit: false,
		queue: false,
		duration: 5000,
		fadeOut: 600,
		slideUp: 200,
		fadeIn: 400,
		title: $('title').html(),
		horizontal: 'right',
		appendToTitle: '',
		vertical: 'top',
		background: '',
		textColor: '',
		className: '',
		content: '',
		focus_queue: [],
		onFocusOutQueue: function(){},
		afterClose: function(){},
		afterShow: function(){},
		click: function(){}
	};

	var queue = [];

	var Notification = function(board, options) {
		var that = this;

		// build notification template

		var elementStyle = [
			'display: none',
			'background: ' + options.background || 'url("black-transparency.png") repeat',
			'color:' + options.color || '#fff'
		].join(';')

		var htmlElement = $(
			[
			'<div class="notification ' + options.className + '" style="' + elementStyle + '">',
				'<div class="close"></div>',
				options.content,
			'</div>'
			].join('')
		);

		// getter for template

		this.getHtmlElement = function() {
			return htmlElement;
		};

		// custom hide

		this.hide = function() {
			htmlElement.addClass('hiding');
			htmlElement.animate({opacity: .01}, options.fadeOut, function(){
				var queued = queue.shift();

				if (queued){
					$.createNotification(queued);
				}
			});

			htmlElement.slideUp(options.slideUp, function() {
				$(this).remove();
        		options.afterClose();
			});

			if (options.appendToTitle && options.restoreTitle){
				$('title').html(options.title);
			}
		};

		// show in board

		this.show = function() {
			// append to board and show

			htmlElement[options.vertical == 'top' ? 'appendTo' : 'prependTo'](board);
			htmlElement.fadeIn(options.fadeIn, options.afterShow());

			if (options.appendToTitle){
				$('title').html(options.title + options.appendToTitle);
			}
		};

		// set custom click callback

		htmlElement.on('click', function() {
			options.click.apply(that);
		});

		// helper classes to avoid hide when hover

		htmlElement.on('mouseenter', function() {
			htmlElement.addClass('hover');
			if (htmlElement.hasClass('hiding')) {
				// recover
				htmlElement.stop(true);
				// reset slideUp, could not find a better way to achieve this
				htmlElement.attr('style', 'opacity: ' + htmlElement.css('opacity'));
				htmlElement.animate({ opacity: 1 }, options.fadeIn);
				htmlElement.removeClass('hiding');
				htmlElement.addClass('pending');
			}
		});

		htmlElement.on('mouseleave', function() {
			if (htmlElement.hasClass('pending')) {
				// hide was pending
				that.hide();
			}
			htmlElement.removeClass('hover');
		});

		// close button bind

		htmlElement.children('.close').on('click', function() {
			that.hide();
		});

		if (options.duration) {
			// hide timer
			setTimeout(function() {
				if (htmlElement.hasClass('hover')) {
					// hovering, do not hide now
					htmlElement.addClass('pending');
				} else {
					that.hide();
				}
			}, options.duration);
		}
		return this;
	};

	$.createNotification = function(options) {
		options = $.extend(
			{},
			$.notificationOptions,
			options || {}
		);

		// get notification container (aka board)

		var board = $('.notification-board.' + options.horizontal + '.' + options.vertical);

		if (!board.length) {
			board = $('<div class="notification-board ' + options.horizontal + ' ' + options.vertical + '" />');
			board.appendTo('body');
		}

		if (options.showOnWindowFocused){
			if (!document.hasFocus()){
				options.focus_queue.push(options);
				options.onFocusOutQueue();
				return;
			}
		}

		if (options.limit && board.children('.notification:not(.hiding)').length >= options.limit) {

			// limit reached

			if (options.queue) {
				queue.push(options);
			}

			return;
		}

		// create new notification and show

		var notification = new Notification(board, options);
		notification.show(board);

		return notification;
	};

	window.onfocus = function(){
		options = $.notificationOptions;

		for (i = 0; i < options.focus_queue.length; i++){
			$.createNotification(options.focus_queue[i]);
		}

		options.focus_queue = [];
	}

})(jQuery);
