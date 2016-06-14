var count =0;
(function($) {
    $.fn.menu = function(b) {
        var c,
        item,
        httpAdress;
        b = jQuery.extend({
            Speed: 220,
            autostart: 1,
            autohide: 1
        },
        b);
        c = $(this);
        item = c.children("ul").parent("li").children("a");
       // httpAdress = window.location;
        httpAdress='';
        
        if(count==0){
        	 item.addClass("inactive");
        	 count++;
        }
        
//        if(item.attr("class")== "active inactive"){
//        	 item.removeAttr("class");
//        	 item.addClass("inactive");
//        }else{
//        item.addClass("inactive");
//        }
        
        
//        item.addClass("inactive");
       
        
      
        
        function _item() {
            var a = $(this);
            if (b.autohide) {
//                a.parent().parent().find(".active").parent("li").children("ul").slideUp(b.Speed / 1.2, 
//                function() {
//                    $(this).parent("li").children("a").removeAttr("class");
//                    $(this).parent("li").children("a").attr("class", "inactive")
//                })
              $(this).parent("li").children("a").removeAttr("class");
              $(this).parent("li").children("a").attr("class", "inactive");
            }
                        
            
            if (a.attr("class") == "inactive") {
                a.parent("li").children("ul").slideDown(b.Speed, 
                function() {
                    a.removeAttr("class");
                    a.addClass("active");
                })
            }
            
            if (a.attr("class") == "active") {
                a.removeAttr("class");
                a.addClass("inactive");
                a.parent("li").children("ul").slideUp(b.Speed);
            }
            
            if (a.attr("class") == "active inactive") {
                a.removeAttr("class");
                a.addClass("active");
            }
            
            
        }
        item.unbind('click').click(_item);
        
        if (b.autostart) {
            c.children("a").each(function() {
            	//$(this).parent('li').parent('ul').slideUp(b.Speed);
//                if (this.href == httpAdress) {
//                    $(this).parent("li").parent("ul").slideDown(b.Speed, 
//                    function() {
//                        $(this).parent("li").children(".inactive").removeAttr("class");
//                        $(this).parent("li").children("a").addClass("active")
//                    })
//                }
            })
        }
    }
})(jQuery);