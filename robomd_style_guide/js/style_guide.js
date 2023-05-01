$(document).ready(function(){
// 셀렉트박스
    //
    var total_height = $("#wrap").outerHeight();
    var button,
        button_length,
        button_height,
        select_top,
        select_height,
        select_not;

    function drop_down(select){
        // 버튼 높이 설정
        button = select.next("label").find("button");
        if(select.next("label").find("button").length <= 5){
            button_length = select.next("label").find("button").length;
        }
        else{
            button_length = 5;
        }

        // 버튼이 위로 올라갈지 아래로 내려갈지 설정
        button_height = button.outerHeight() * button_length;
        select_top = select.next("label").offset().top;
        select_height = parseInt(select.next("label").css("height"),10);
        select_not = $(".select").not(select);

        if(total_height <= (select_top + select_height + button_height)){ // 버튼이 영역 위로 올라갈 때
            select.next("label").find("div").css({"top":-button_height, "transform":"translate(-50%,-4px)"});

            if(select.is(":checked")){ // 다운
                select.next("label").find("div") // 클릭한 셀렉트박스 드롭다운
                .css({"border":"1px solid #8b8b8b","top":"-2px"})
                .animate({
                    "top":(button.outerHeight() * button_length + 2) * -1,
                    "height":button.outerHeight() * button_length
                },300);

                if(select_not.is(":checked")){
                    select_not.next("label").find("div").animate({ // 클릭하지않은 셀렉트박스 드롭업
                        "top":"0px",
                        height: 0
                    },300,function(){
                        $(this).css("border","none");
                        select_not.prop("checked",false);
                    });
                }
            }
            else{ // 업
                select.next("label").find("div").animate({
                    "top":"0px",
                    height: 0
                },300,function(){
                    $(this).css("border","none");
                });
            }
        }
        else{ // 버튼이 영역 밑으로 내려갈 때
            select.next("label").find("div").css({"top":select_height, "transform":"translate(-50%,2px"});

            if(select.is(":checked")){ // 다운
                select.next("label").find("div")
                .css("border","1px solid #8b8b8b")
                .animate({
                    height: button.outerHeight() * button_length + 2
                },300);

                if(select_not.is(":checked")){
                    select_not.next("label").find("div").animate({ // 클릭하지않은 셀렉트박스 드롭업
                        height: 0
                    },300,function(){
                        $(this).css("border","none");
                        select_not.prop("checked",false);
                    });
                }
            }
            else{ // 업
                select.next("label").find("div").animate({
                    height: 0
                },300,function(){
                    $(this).css("border","none");
                });
            }
        }
        return;
    }
    
    // 셀렉트박스 - 드롭다운 이벤트
    $(".select").on("click",function(e){
        e.stopPropagation();
        select = $(this);
        drop_down(select);
        return;
    });

    // 셀렉트박스 외부영역 클릭 시 드롭다운 해제
    $("html").on("click",function(e){
        if(!$(e.target).hasClass("select_label")){
            if($(".select").is(":checked")){
                select = $(".select:checked");
                select.prop("checked",false);
                drop_down(select);
            }
        }
        return;
    });

    // 셀렉트박스 - 목록 클릭 시 목록 활성화 및 제목 변경
    $(".select_label").find("button").on("click",function(){
        txt = $(this).find("span").text();

        // 활성화 된 목록에 active 클래스명 지정
        $(this).parents(".select_label").find("button").removeClass("active");
        $(this).addClass("active");

        // 제목 활성화된 목록의 제목으로 변경
        $(this).parent("div").siblings(".select_txt").text(txt);

        return;
    });

// Text Inputs
    //

    // Text Input의 상태 표시 설정
    function text_inputs_status(){
        $(".select.error").next("label").after("<span class='error_msg'>에러 메세지</span>");
        $("input[type='text'].error").after("<span class='error_msg'>에러 메세지</span>");
        $("input[type='text'].helper").after("<span class='helper_msg'>헬퍼 메세지</span>");
        return;
    }
    text_inputs_status();

// Text Area
    //
    var textarea_width,
        textarea_maxLength,
        textarea_length;

    // Text Area 글자수 표시하는 텍스트 넓이 계산
    $("textarea").each(function(){
        textarea_width = $(this).outerWidth();
        textarea_maxLength = $(this).attr("maxlength");
        textarea_length = $(this).val().length;
        $(this).next(".textarea_length").css("width",textarea_width).text(textarea_length + " / " + textarea_maxLength);
        return;
    });

    // Text Area의 글자수 계산
    $("textarea").on("input",function(){
        textarea_maxLength = $(this).attr("maxlength");
        textarea_length = $(this).val().length;
        $(this).next(".textarea_length").text(textarea_length + " / " + textarea_maxLength);
        return;
    });

// Tab
    //
    var tab,
        tabWidth;

    // Tab - 가로스크롤 넓이 계산
    $(".tab_scroll_wrap").each(function(){
        tab = $(this).find("label");
        tabWidth = 0;
        for(let i = 0; i < tab.length; i++){
            tabWidth += tab.eq(i).outerWidth(true);
        }
        $(this).find(".tab_scroll").css("width",tabWidth);
    });
});

// Text Area 높이 계산
function resize(obj){
    obj.style.height = "1px";
    obj.style.height = (2+obj.scrollHeight)+"px";
}