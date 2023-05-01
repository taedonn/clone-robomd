$(document).ready(function(){
    //맨위로 버튼 클릭시 이벤트
    $(window).scroll(function(){
        var header_height = $("header").height();
        var footer_top = $("footer").offset().top;
        var footer_height = $("footer").outerHeight();
        var top_btn_top = $(".top_btn_wrap").offset().top;
        var top_btn_height = $(".top_btn_wrap").outerHeight();
        var top_btn_encounter = top_btn_top + top_btn_height;
        var window_scrollTop = $(window).scrollTop();
        var window_height = $(window).height();
        var window_encounter = window_height * 0.5;
        var window_scrollBottom = window_scrollTop + window_height;

        //맨위로 버튼이 풋터 만났을 때 이벤트
        if(top_btn_encounter >= footer_top){
            $(".top_btn_wrap").css({
                "position":"absolute",
                "bottom":footer_height
            });
        }
        if(window_scrollBottom < top_btn_encounter){
            $(".top_btn_wrap").css({
                "position":"fixed",
                "bottom":"0px"
            });
        }

        //헤더가 메인배너 벗어낫을 때 이벤트
        if(window_scrollTop >= window_encounter){
            $(".top_btn").css({
                "opacity":"1"
            });
        }
        else{
            $(".top_btn").css({
                "opacity":"0"
            });
        }

        nowScrollTop = $(this).scrollTop();
        if(wheelDelta() == "down"){
            $("#wrap header").css({
                "top":-header_height
            });
        }
        if(wheelDelta() == "up"){
            $("#wrap header").css({
                "top":0
            });
        }
        prevScrollTop = nowScrollTop;

        //헤더가 웹사이트 맨위랑 만날 때
        if(nowScrollTop == 0){
            $("#wrap header").css({
                "top":0
            });
        }
    });

    //맨위로 버튼 클릭 시 이벤트
    $(".top_btn").on('click',function(){
        $("html,body").animate({
            scrollTop:0
        },700);
        return false;
    });

    //스크롤 감지
    var prevScrollTop = 0;
    var nowScrollTop = 0;

    function wheelDelta(){
        return prevScrollTop - nowScrollTop > 0 ? "up" : "down";
    }

    // 모바일 헤더 이벤트
    $("#menu_m").on("click",function() {
        scrollTop = $(window).scrollTop();

        if($(this).is(":checked")){ // 펼치기
            // 1080px 이하일 때 뒷배경 고정
            $("html")
            .addClass('hidden');
        }
        else{ // 접기
            // 1080px 이하일 때 뒷배경 고정 해제
            $("html")
            .removeClass('hidden')
            .scrollTop(scrollTop);
        }
        return;
    });
});