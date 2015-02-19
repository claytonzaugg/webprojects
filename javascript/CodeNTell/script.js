$(document).ready(function() {
	$('.addButton').click(function() {
		var theTask = $('input[name=itemFromList]').val();
		var critical = $('input[type=checkbox]');
		if ($('#critCheckBox').is(':checked')) {
			$('ul').append("<li class='aTask backgroundColorRed'>&nbsp;" + theTask + "<p class='completeTask'>CLICK COMPLETE</p></li>");
			$('.height40px').css('height', '+=37');
		} else {
			$('ul').append("<li class='aTask'>&nbsp;" + theTask + "<p class='completeTask'>CLICK COMPLETE</p></li>");
			$('.height40px').css('height', '+=37');
		}
	});
	$('input').keypress(function(e) {
		if (e.which == 13) {
			var theTask = $('input[name=itemFromList]').val();
			$('ul').append("<li class='aTask'>&nbsp;" + theTask + "<p class='completeTask'>CLICK COMPLETE</p></li>");
			$('.height40px').css('height', '+=37');
		}
	});

	$('form[name=theList]').submit(function() {
		return false;
	});

	$(document).on('mouseenter', '.completeTask', function() {
		$(this).css('background-color', '#669933');
	});

	$(document).on('mouseleave', '.completeTask', function() {
		$(this).css('background-color', '#777');
	});

	$(document).on('click', '.aTask', function() {
		$(this).remove();
		$('.height40px').css('height', '-=37');
	});
});
