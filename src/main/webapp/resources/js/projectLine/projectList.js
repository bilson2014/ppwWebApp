$().ready(function(){
	originTool();
	controlEnglish();
});

function originTool() {

    // 滚动监听 start
    $('.projectType').waypoint(function(direction) {
        if (direction == "up") { // 了解 拍片网之前
           $('.motionTitles').removeClass('setTop');
        }else{
           $('.motionTitles').addClass('setTop');
        }
    });  
}