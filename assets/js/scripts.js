// core
jQuery.fn.center = function(pos) {
    var parent = window;
    this.css({
        "position": "absolute",
        "top": ($(parent).height() - pos + "px"),
        "left": ((($(parent).width() - this.width()) / 2))
    });
    return this;
};

function positionControls(){
    var cw, hs;
    cw = $("#controls-wrapper");
    hs = $("#home-set");
    cw.center(66);
    hs.center(345);
}
function zoomicons() {
    $(".set").hover(
        function(){
            var imgh, zoomw, zoomh, zoom, viewset, viewart;
            imgh    = $(this).find("img").height();
            zoomw   = ((parseInt($(this).find(".zoom").width())/2)-31);
            zoomh   = ((parseInt($(this).find(".zoom").height()) / 2)-10);
            zoom    = $(this).find(".zoom");
            viewset = $(this).find(".view-set").css({left:"45%",top:"45%"});
            viewart = $(this).find(".view-article");
            zoom.height(imgh).fadeIn("fast");
            viewset.show();
            viewart.remove();
            // viewset.animate({left:zoomw, top:zoomh}, 350);
            // viewart.animate({right:zoomw, top:zoomh}, 350);
        },
        function(){
            var zoom, viewset, viewart;
            zoom    = $(this).find(".zoom");
            viewset = $(this).find(".view-set").css({left:0,top:0});
            viewart = $(this).find(".view-article");
            zoom.fadeOut("fast");
            viewset.hide();
            viewart.remove();
            // viewset.animate({left:0, top:0}, 350);
            // viewart.animate({right:0, top:0}, 350);
        }
    );
}

jQuery(function($){

    //Hide Slider
    $("#hide-slider").click(function(){
        $("#t").fadeOut("fast", function(){
            $("#l").fadeOut("fast", function(){
                $("#b").fadeOut("fast",function(){
                    $("#r").fadeOut("fast", function(){
                        $("#header").fadeOut("fast", function(){
                            $("#home-set").fadeOut("fast");
                        });
                    });
                });

            });
        });
        $(this).removeClass("show").hide();
        $("#show-slider").addClass("show");
        return false;
    });

    //Show Slider
    $("#show-slider").click(function(){
        $("#t").fadeIn("fast", function(){
            $("#l").fadeIn("fast", function(){
                $("#b").fadeIn("fast",function(){
                    $("#r").fadeIn("fast", function(){
                        $("#header").fadeIn("fast", function(){
                            $("#home-set").fadeIn("fast");
                        });
                    });
                });

            });
        });
        $(this).removeClass("show").hide();
        $("#hide-slider").addClass("show");
        return false;
    });

    // Responsive Menu
    // Create the dropdown base
    $("<select />").appendTo("#navigation");

    // Create default option 'Go to...'
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Go to..."
    }).appendTo("#navigation select");

    // Populate dropdown with menu items
    $("nav a").each(function() {
     var el = $(this);
     $("<option />", {
         "value": el.attr("href"),
         "text" : el.text()
     }).appendTo("nav select");
    });

    $("#navigation select").change(function() {
      window.location = $(this).find("option:selected").val();
    });

    // animate zoom icons
    var imgh, zoom;
    imgh = $(".set").find("img").height();
    zoom = $(".set").find(".zoom");
    zoom.height(imgh);
    zoomicons();

    // position control bar and sets

    $(window).resize(function(e){
        e = null;
        positionControls();
    });
    positionControls();

    //prettyPhoto
    if ($("a[rel^=\"pp\"]").length>1) {
        $("a[rel^=\"pp\"]").prettyPhoto();
    }
});

/* audio player */
// audio support test
// var has_audio = document.createElement("audio");

/*exported setAudio */
function setAudio(src){
  // JavaScript object for later use
  $("#home").append("<audio id='song' src='"+ src +"' type='audio/mp3' />" );
  var player = $("#song").mediaelementplayer({
    startVolume: 0.5,
    audioWidth: 0,
    audioHeight: 0,
    alwaysShowHours: false,
    showTimecodeFrameCount: false,
    alwaysShowControls: false
  });
  $(".mejs-audio").hide();
  return player;
}
/*exported pauseAudio */
function pauseAudio(player){
  player.trigger("pause");
}
/*exported playAudio */
function playAudio(player){
  player.trigger("play");
}
