/*FONCTION z-index*/
jQuery(function ($) {
    var breakpoint = 1025;

    var mustDrag = function () {
        return window.innerWidth >= breakpoint;
    };

    //    var maxz = $('.dragme:last').css("zIndex");
    var windowTemplate = $($("#windowTemplate").clone());
    $("#windowTemplate").remove();
    //    $(".dragme").on("click",function(){
    //            maxz++;
    //          $(this).css('z-index',maxz);
    //        }
    //    );

    $('.dragme').each(function (i) {
        $(this).fadeTo(1, 1);
    });

    /*FONCTION AFFICHER/CACHER GROUPES DE FENETRES*/
    $(".catButton").each(function () {
        $(this).data("toggleStatus", false);
        $("." + $(this).attr("data-windowGrp")).hide();
    });

    $(".catButton").click(function (e) {
        e.preventDefault();

        if ($(this).data("toggleStatus")) {
            $("." + $(this).attr("data-windowGrp")).hide();
            $(this).removeClass("active");
            $(this).data("toggleStatus", false);
        } else {
            $("." + $(this).attr("data-windowGrp")).show();
            $(this).addClass("active");
            $(this).data("toggleStatus", true);
        }
    });

    /*QUAND ON SURVOLE LE BOUTON ABOUT*/
    $(".about_projects").on('mouseover', function () {
        $($(".about_text")[$(this).parent().parent().index()]).show();
    });

    $(".about_projects").on('mouseout', function () {
        $($(".about_text")[$(this).parent().parent().index()]).hide();
    });

    /*QUAND ON APPUIE SUR LA CROIX*/
    $(".croix").click(function () {
        $(this).parent().parent().hide();
    });

    /*ANIM MENU*/
    $("#open-menu").on("click", function () {
        $("#menu").toggleClass("opened");
    });

    /*RETENIR LA POSITION DES FENETRES*/
    if (mustDrag()) {
        var windowStates = JSON.parse(localStorage.windowStates || "{}");
        var windowState, currentWindow;
        for (var windowId in windowStates) {
            currentWindow = document.getElementById(windowId);
            if (currentWindow) {
                windowState = windowStates[windowId];
                if (windowState.visible) $(currentWindow).show();

                currentWindow.style.top = windowState.top + 'px';
                currentWindow.style.left = windowState.left + 'px';
            }
        }
    }

    window.addEventListener('beforeunload', function () {
        var windows = document.querySelectorAll('.fenetre');

        if (windows.length !== 0) {
            var currentWindow;
            var windowStates = {};

            for (var i = 0; i < windows.length; i++) {
                currentWindow = windows[i];
                windowStates[currentWindow.id] = {
                    visible: getComputedStyle(currentWindow).display === 'block',
                    top: parseInt(getComputedStyle(currentWindow).top, 10),
                    left: parseInt(getComputedStyle(currentWindow).left, 10)
                };
            }

            localStorage.windowStates = JSON.stringify(windowStates);
        }
    });

    /*RESPONSIVE*/
    window.onresize = function () {
        var w = window.innerWidth;
        var els = document.querySelectorAll('.fenetre');
        var el;
        if (w < 1025) {
            console.log('hidden');
            for (var i = 0; i < els.length; i++) {
                el = els[i];
                el.classList.remove("dragme", "hguyg", "gyytt");
                el.style.top = null;
                el.style.left = null;
            }
        } else {
            for (var i = 0; i < els.length; i++) {
                els[i].classList.add("dragme");
                $('#menu').removeClass('opened')
            }
        }
    };

    /* FONCTION DRAG */
    Array.prototype.forEach.call(document.querySelectorAll('.dragme'), function (element) {
        element.addEventListener('mousedown', function (event) {
            if (mustDrag()) {
                $('.dragme').css('z-index', 1);
                $(this).css('z-index', 100);

                event.preventDefault();

                var previous = {
                    x: event.clientX,
                    y: event.clientY
                };

                var mousemove = function (event) {
                    event.preventDefault();
                    var current = {
                        x: event.clientX,
                        y: event.clientY
                    };

                    element.style.left = element.offsetLeft + (current.x - previous.x) + 'px';
                    element.style.top = element.offsetTop + (current.y - previous.y) + 'px';

                    previous = current;
                };

                var mouseup = function () {
                    window.removeEventListener('mousemove', mousemove);
                    window.removeEventListener('mouseup', mouseup);
                };

                window.addEventListener('mousemove', mousemove);
                window.addEventListener('mouseup', mouseup);
            }
        });
    });

    $('body').css('opacity', 1);
});

window.addEventListener('load', function () {
    document.body.style.opacity = 1;
});

/*QUAND ON SURVOLE LE BOUTON ABOUT*/
$(".about_project").on('mouseover', function () {
    $($(".about_text2").show());
});

$(".about_project").on('mouseout', function () {
    $($(".about_text2").hide());
});
