jQuery.fn.center = function(pos) {
    var parent = window;
    this.css({
        'position': 'absolute',
        'top': ($(parent).height() - pos + 'px'),
        'left': ((($(parent).width() - this.width()) / 2))
    });
    return this;
}

jQuery(function($){
    //Submenu
    $('.nav').superfish({
        animation: {
            opacity: 'show',
            height: 'show'
        },
        speed: 'fast',
        delay: 500
    });

    //Hide Slider
    $('#hide-slider').click(function(){
        $('#t').fadeOut('fast', function(){
            $('#l').fadeOut('fast', function(){
                $('#b').fadeOut('fast',function(){
                    $('#r').fadeOut('fast', function(){
                        $('#header').fadeOut('fast', function(){
                            $('#home-set').fadeOut('fast');
                        });
                    });
                });

            });
        });
        $(this).removeClass('show').hide();
        $('#show-slider').addClass('show');
        return false;
    });

    //Show Slider
    $('#show-slider').click(function(){
        $('#t').fadeIn('fast', function(){
            $('#l').fadeIn('fast', function(){
                $('#b').fadeIn('fast',function(){
                    $('#r').fadeIn('fast', function(){
                        $('#header').fadeIn('fast', function(){
                            $('#home-set').fadeIn('fast');
                        });
                    });
                });

            });
        });
        $(this).removeClass('show').hide();
        $('#hide-slider').addClass('show');
        return false;
    });

    // Responsive Menu
    // Create the dropdown base
    $('<select />').appendTo('#navigation');

    // Create default option 'Go to...'
    $('<option />', {
       'selected': 'selected',
       'value'   : '',
       'text'    : 'Go to...'
    }).appendTo('#navigation select');

    // Populate dropdown with menu items
    $('nav a').each(function() {
     var el = $(this);
     $('<option />', {
         'value'   : el.attr('href'),
         'text'    : el.text()
     }).appendTo('nav select');
    });

    $('#navigation select').change(function() {
      window.location = $(this).find('option:selected').val();
    });

    // animate zoom icons
    var imgh = $('.set').find('img').height();
    var zoom = $('.set').find('.zoom');
    zoom.height(imgh);
    zoomicons();

    // position control bar and sets
    positionControls();
    $(window).resize(function(e){
        positionControls();
    });

    //prettyPhoto
    if ($('a[rel^="pp"]').length>1) {
        $('a[rel^="pp"]').prettyPhoto();
    }

});

function positionControls(){
    var cw = $('#controls-wrapper');
    var hs = $('#home-set');
    cw.center(66);
    hs.center(345);
}

function zoomicons() {
    $('.set').hover(
        function(){
            var imgh    = $(this).find('img').height();
            var zoomw   = ((parseInt($(this).find('.zoom').width())/2)-31);
            var zoomh   = ((parseInt($(this).find('.zoom').height()) / 2)-10);
            var zoom    = $(this).find('.zoom');
            var viewset = $(this).find('.view-set').css({left:'45%',top:'45%'});
            var viewart = $(this).find('.view-article');
            zoom.height(imgh).fadeIn('fast');
            viewset.show();
            viewart.remove();
            // viewset.animate({left:zoomw, top:zoomh}, 350);
            // viewart.animate({right:zoomw, top:zoomh}, 350);
        },
        function(){
            var zoom    = $(this).find('.zoom');
            var viewset = $(this).find('.view-set').css({left:0,top:0});
            var viewart = $(this).find('.view-article');
            zoom.fadeOut('fast');
            viewset.hide();
            viewart.remove();
            // viewset.animate({left:0, top:0}, 350);
            // viewart.animate({right:0, top:0}, 350);
        }
    );
}

function initialize() {
        var myLatlng = new google.maps.LatLng(33.59,-80);

        var mapOptions = {
          zoom: 8,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          draggable: false
        }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var contentString = '<div id="content">Change it to whatever your want! <strong>HTML</strong> too!</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
}
