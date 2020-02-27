$(function(){
	var n=0;
	var pos=0;
	var h;

	$(".container > section").eq(0).addClass("active");
	$("#gnb li").eq(0).addClass("on");

	setTimeout(function(){
		$("html").animate({scrollTop:pos}, 800, function(){
			// $(".container > section").eq(n).addClass("active");
			// $("#gnb li").eq(n).addClass("on");
		});
	}, 150);

	$(window).resize(function(){
		h=$(window).height();
		$("section").css({height:h});
	});
	$(window).trigger("resize");

	$("#gnb li").click(function(e){
		// if($("html").is(":animated")) return;

		e.preventDefault();
		n=$(this).index();
		pos=n*h;

		$("html").animate({scrollTop:pos}, 800, function(){
			$(".container > section").removeClass("active");
			$(".container > section").eq(n).addClass("active");
			$("#gnb li").removeClass("on");
			$("#gnb li").eq(n).addClass("on");
		});
		if(n%2 == 1){
			$("#header").addClass("Black")
		}
		else {
			$("#header").removeClass("Black")
		}
	});
	$(".container").mousewheel(function(e, delta){
		// if($("html").is(":animated")) return;

		if(delta > 0){
			if(n > 0){
				n=n-1;
			}
			else {
				return;
			}
		}
		else{
			if(n < 4){
				n=n+1;
			}
			else {
				return;
			}
		}
		if(n%2 == 1){
			$("#header").addClass("Black")
		}
		else {
			$("#header").removeClass("Black")
		}
		pos=n*h;

		$("html").stop().animate({scrollTop:pos}, 700, function(){
			$(".container > section").removeClass("active");
			$(".container > section").eq(n).addClass("active");
			$("#gnb li").removeClass("on");
			$("#gnb li").eq(n).addClass("on");
		});
	});

	var mapLatLng = new google.maps.LatLng(37.510257, 126.946595)
	var mapOptions = {
	zoom: 17, 
	center: mapLatLng,
	mapTypeId: google.maps.MapTypeId.ROADMAP 
	}
	var mapGoogle = new google.maps.Map(document.getElementById('map'), mapOptions);
	var mapMarker = new google.maps.Marker({
	map: mapGoogle,
	position: mapLatLng,
	animation: google.maps.Animation.DROP,
	title: "노량진동"
	});

	google.maps.event.addListener(mapMarker, 'click', function () {
	mapGoogle.setCenter(mapMarker.getPosition());
	});

	$(".portBtn").click(function(e){
		e.preventDefault();
		if($(".inner").hasClass("move")){
			$(".inner").removeClass("move");
			$("#portfolio ul").animate({left:0}, 800);
		}
		else {
			$(".inner").addClass("move");
			$("#portfolio ul").animate({left:"-960px"}, 800);
		}
	});
});