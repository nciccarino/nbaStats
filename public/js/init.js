(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    $('.modal').modal();
	  $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year,
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: false // Close upon selecting a date,
	  });
	  $(document).ready(function() {
    	$('select').material_select();
  	});
  	$('select').on('contentChanged', function() {
		  $(this).material_select();
		});
  }); // end of document ready
})(jQuery); // end of jQuery name space