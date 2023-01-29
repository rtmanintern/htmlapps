jQuery(function($) {
	$(".slide").each(function( index ) {
		$(".tiles").append('<a class="tile tile-circle m-1 bg-info" href="#post-'+ $(this).data("slide") +'" data-tile="'+ $(this).data("slide") +'">'+ (index+1) +'</a>');
	});
	
	$(".tiles").on('click', '.tile', function (e) { 
		var tile = $(this).data("tile");
		$('html,body').animate({
			scrollTop: $("#post-" + tile).offset().top
		}, 'slow');
		Looper.toggleSidebar();
	});
	
	var attempt = 0, corect = 0, wrong = 0;
	$(".isQuiz").show();
	
	$('[name^="my-radio"]').on('change', function (e) { 
	    $(this).closest(".options").find('[name^="my-radio"]').attr('disabled', 'disabled');
		var attempted = $(this).closest(".options").find(".attempted").val();
		 
		$(this).closest(".options").find(".custom-radio").each(function( index ) {
			if($(this).closest(".custom-radio").hasClass("correct"))
			{
				$(this).closest(".custom-radio").addClass("list-group-item-success");
				$(this).closest(".custom-radio").find(".tile").removeClass("bg-yellow").addClass("bg-success");
			}
		});
		if(!$(this).closest(".custom-radio").hasClass("correct"))
		{
			if(attempted == "false")
			{
				$(this).closest(".custom-radio").addClass("list-group-item-red");
				$(this).closest(".custom-radio").find(".tile").removeClass("bg-yellow").addClass("bg-red");
				wrong++;
				attempt++;
			}
		}
		else
		{
			if(attempted == "false")
			{
				corect++;
				attempt++;
			}
		}
		 
		$(this).closest(".options").find(".attempted").val("true");
		$(".attempt").text(attempt);
		$(".wrong").text(wrong);
		$(".corect").text(corect);

		if(attempt > 0){
			$(".isQuiz").show();
		}
		$(this).closest(".slide").find(".solution-item").collapse('show');
	});
		
	if(typeof MathJax != "undefined")
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	
	$("a").each(function() {   
		if (this.href == window.location.href) {
			$(this).addClass("active");
		}
	});
	
	var lastId,
    topMenu = $("#tiles"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems.removeClass("bg-danger")
			 .parent()
			 .end().filter("[href='#"+id+"']").addClass("bg-danger");
	   }                   
	});
	
	var url = window.location.href;
	var hash = url.substring(url.indexOf('#')+1);
	$('#myTab li:eq(0) a').tab('show');
	if(hash == "tab2")
		$('#myTab li:eq(1) a').tab('show');
	if(hash == "tab3")
		$('#myTab li:eq(2) a').tab('show');
});