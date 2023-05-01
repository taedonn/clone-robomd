gsap.registerPlugin(ScrollTrigger);

// //인덱스페이지 스크롤 효과
// var tl = gsap.timeline({
//     scrollTrigger:{
//         trigger:'.index_content1',
//         pin:true,
//         scrub:true,
//         start:'center center',
//         end:'+=1500',
//         width:"100%",
//         height:"100%",
//         toggleAction:"play none reverse none"
//     }
// });

// tl
// .from('.content1_2',{
//     yPercent:200,
//     opacity:0
// })
// .to({},{
//     duration:2
// })
// .to('.content1_2',{
//     yPercent:0,
//     opacity:1,
//     ease:'none',
//     duration:2
// })
// .to({},{
//     duration:2
// });

//카운트업 효과
$('.counts').each(function(index,element){
    var count = $(this),
        zero = {val:0},
        num = count.data('number'),
        split = (num + "").split("."),
        decimals = split.length > 1 ? split[1].length : 0;

    gsap.to(zero,{
        val:num,
        duration:2,
        scrollTrigger:{
            trigger:element
        },
        onUpdate:function(){
            count.text(zero.val.toFixed(decimals));
        }
    });
});