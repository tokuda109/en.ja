$(document).ready(function() {

(function() {
		var control = $('.js-toc-control').toggle(function() {
			var $this = $(this);
			$this.siblings('ul').slideDown('fast', function() {
				$this.children('span').attr('data-icon', '-');
			});
		}, function() {
			var $this = $(this);
			$this.siblings('ul').slideUp('fast', function() {
				$this.children('span').attr('data-icon', '+');
			});
		});
// END
})();

// END
});
