document.addEventListener("DOMContentLoaded", function (event) {
    var settings = new Settings();
    var player = new Player();
    var raycaster = new Raycaster();
    var minimap = new Minimap();

    var wall = document.getElementById("wall");
    console.log(wall)

    function init() {
        var screen = document.getElementById("screen");
        screen.width = settings.w;
        screen.height = settings.h;
        minimap.drawMiniMap(settings.map, settings.miniMapScale);
        frame();
    }

    function frame() {

        player.move();
        minimap.drawMiniMap(settings.map, settings.miniMapScale);
        minimap.DrawPlayer(player.x, player.y, settings.miniMapScale, player.rotation);
        raycaster.castRays(player.rotation, player.x, player.y, player.rotation, wall);
        setTimeout(frame, 1000 / 30);
    }



    document.body.addEventListener("keydown", function (e) {
        var x = e.keyCode
        if (x == 37) {
            player.direction = -1;
        }
        else if (x == 38) {
            player.speed = 1;
        }
        else if (x == 39) {
            player.direction = 1;
        }
        else if (x == 40) {
            player.speed = -1;
        }
    })

    document.body.addEventListener("keyup", function (e) {
        var x = e.keyCode
        if (x == 37) {
            player.direction = 0;
        }
        else if (x == 38) {
            player.speed = 0;
        }
        else if (x == 39) {
            player.direction = 0;
        }
        else if (x == 40) {
            player.speed = 0;
        }
    })

    init();
});
