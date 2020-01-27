$(document).ready(function() {
  
  	$(".scroll").click(function() {
 		$("html, body").animate({
 			scrollTop: $($(this).attr("href")).offset().top + "px"
 		}, {
			duration: 950,
 			easing: "swing"
 		});
 		return false;
 	});
 
});
