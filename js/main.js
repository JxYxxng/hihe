$(function(){
	var n=0;
	var pos=0;
	var h;

	$(".container > section").eq(0).addClass("active");
	$("#gnb li").eq(0).addClass("on");

	setTimeout(function(){
		$("html").animate({scrollTop:pos}, 800);
	}, 150);

	$(window).resize(function(){
		h=$(window).height();
		$("section").css({height:h});
	});
	$(window).trigger("resize");

	// gnb 클릭
	$("#gnb li").click(function(e){
		// if($("html").is(":animated")) return;

		e.preventDefault();
		n=$(this).index();
		pos=n*h;

		$("html").animate({scrollTop:pos}, 700, function(){
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

	// 마우스 스크롤
	$(".container").mousewheel(function(e, delta){
		// if($("html").is(":animated")) return;

		if(delta > 0){
			if(n > 0){ n=n-1; }
			else return;
		}
		else{
			if(n < 4){ n=n+1; }
			else return;
		}

		if(n%2 == 1){
			$("#header").addClass("Black")
		}
		else {
			$("#header").removeClass("Black")
		}

		pos=n*h;
		$("html").stop().animate({scrollTop:pos}, 800, function(){
			$(".container > section").removeClass("active");
			$(".container > section").eq(n).addClass("active");
			$("#gnb li").removeClass("on");
			$("#gnb li").eq(n).addClass("on");
		});

	});



	// 포트폴리오
	var n=0; // 갤러리 번호 변수
	var w=920; // 갤러리 가로 크기 변수
	var total=2; // 갤러리 전체 개수 변수
	var amount=0; // 갤러리 움직일 위치 변수
	var id=setInterval(leftMoving, 20000); // 갤러리 타이머 변수
	$(".timer .gage").animate({width:"100%"}, 20000);


	setTimeout(function(){ // 갤러리 초기 설정 타이머
		// $(".slider_wrap .slider").css({width:total*w});
		// $(".slider_wrap, .slider_wrap .slider").css({height:$(".slider_wrap img").height()});
		// $(".top .title").html(titleArray[n]).css({opacity:0}).animate({opacity:1}, 500);
		$(".pager .current").text("01");
		$(".pager .total").text("0"+total);
	}, 150);

	$(".controls .prev").click(leftMoving);
	$(".controls .next").click(rightMoving);

	$(".pause").click(function(){
		clearInterval(id);
		$(".timer .gage").stop().animate({width:0},800);
	});
	$(".play").click(function(){
		$(".timer .gage").animate({width:"100%"}, 20000);
		id=setInterval(rightMoving, 9000);
	});

	function leftMoving(){ // 왼쪽 이동 함수
		if(n < (total-1)){
			n++;
		}else{
			n=0;
		}
		console.log(n);
		
		amount=n* -1 * 960 + "px";
		$("#portfolio ul").animate({left:amount}, 800);
		$(".timer .gage").stop().animate({width:0}, 0).animate({width:"100%"}, 20000);
		$(".pager .current").text("0"+(n+1));
	}
	function rightMoving(){ // 오른쪽 이동 함수
		if(n > 0){
			n--;
		}
		else{
			n=(total-1);
		}
		console.log(n);

		amount=n* -1 * 960 + "px";
		$("#portfolio ul").animate({left:amount}, 800);
		$(".timer .gage").stop().animate({width:0}, 0).animate({width:"100%"}, 20000);
		$(".pager .current").text("0"+(n+1));
	}

	

	// 단어
	var word_list = [
		{text: "jQuery", weight: 13, url: ""},
		{text: "JxYxxng", weight: 10.5, url: ""},
		{text: "Parallax", weight: 9.4}, // url: "javascript:alert('JavaScript in URL is OK!');
		{text: "HTML5", weight: 8},
		{text: "CSS3", weight: 6.2},
		{text: "API", weight: 5},
		{text: "VanillaJS", weight: 5},
		{text: "SASS", weight: 5},
		{text: "반응형(Responsive Web)", weight: 5},
		{text: "모바일", weight: 4},
		{text: "PlugIn", weight: 4},
		{text: "웹표준", weight: 3},
		{text: "웹접근성", weight: 3},
		{text: "의사소통", weight: 3},
		{text: "웹디자인기능사", weight: 3},
		{text: "워드프로세서1급", weight: 2},
		{text: "자기개발", weight: 2},
		{text: "수학과", weight: 2},
		{text: "Movie", weight: 2},
		{text: "Blog", weight: 2},
		{text: "PHOTO", weight: 2},
		{text: "Web Publisher", weight: 2},
		{text: "빠른속도", weight: 2},
		{text: "꼼꼼함", weight: 2},
		{text: "성실함", weight: 2},
		{text: "책임감", weight: 2},
		{text: "크로스 브라우징", weight: 2},
		{text: "Zeplin", weight: 1},
		{text: "Photoshop", weight: 1},
		{text: "Illustrator", weight: 1},
		{text: "Eclipse", weight: 1},
		{text: "VScode", weight: 1},
		{text: "GitHub", weight: 1}
		];
	$(document).ready(function() {
		$("#my_favorite_latin_words").jQCloud(word_list);
	});
	  

	// // 카카오맵
	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(37.510257, 126.946595), // 중심좌표
		level: 3 // 지도 크기
	};
	var map = new kakao.maps.Map(container, options);
	var markerPosition  = new kakao.maps.LatLng(37.510257, 126.946595); // 마커 위치
	var marker = new kakao.maps.Marker({ // 마커 생성
		position: markerPosition
	});
	marker.setMap(map); // 마커 표시
	map.setZoomable(false); // 스크롤 막기
	var zoomControl = new kakao.maps.ZoomControl(); // 확대 축소 버튼
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
});