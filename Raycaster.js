function Raycaster() {
    let settings = new Settings();
    let miniMap = document.getElementById('minimap');
    let ctx = miniMap.getContext('2d');
    let screen = document.getElementById('screen');
    let s_ctx = screen.getContext('2d');


    this.DrawRay = function (x, y, px, py) {

        ctx.strokeStyle = "rgba(100,100,100,0.5)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(px * settings.miniMapScale, py * settings.miniMapScale);
        ctx.lineTo(
            x * settings.miniMapScale,
            y * settings.miniMapScale
        );
        ctx.closePath();
        ctx.stroke();
    }

    this.DrawStripe = function (x1, y1, x2, y2, d, w, wall) {
        s_ctx.fillStyle = 'rgb(0,0,0)';
        s_ctx.fillRect(x1, 0, x2, settings.h);
        var xd = 1 - (d / 25)
        s_ctx.fillStyle = "rgba(64,64,255," + xd.toFixed(2) + ")"; //'rgba(255, 165, 0, 1)'
        s_ctx.fillRect(x1, y1, x2, y2);
        wall.style.height = Math.floor(y2) + "px";
        wall.style.width = Math.floor(w * 2) + "px";
        if (x1 < 512) {
            s_ctx.drawImage(wall, x1, 0, settings.stripWidth, 512, x1, y1, x2, y2);
        }
        else if (x1 < 1024) {
            s_ctx.drawImage(wall, x1 - 512, 0, settings.stripWidth, 512, x1, y1, x2, y2);
        }
        else if (x1 < 1536) {
            s_ctx.drawImage(wall, x1 - 1024, 0, settings.stripWidth, 512, x1, y1, x2, y2);
        } else {
            s_ctx.drawImage(wall, x1 - 1536, 0, settings.stripWidth, 512, x1, y1, x2, y2);
        }
    }

    this.castSingleRay = function (rayAngle, StripID, px, py, r, wall) {
        rayAngle %= settings.circle;
        if (rayAngle < 0) {
            rayAngle += settings.circle;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////PION
        var right = (rayAngle > settings.circle * 0.75 || rayAngle < settings.circle * 0.25);
        var up = (rayAngle < 0 || rayAngle > Math.PI);

        var angleSin = Math.sin(rayAngle);
        var angleCos = Math.cos(rayAngle);

        var dist = 0;	//  odległość od udzerzenia
        var xHit = 0; 	// x, y uderzenia (do rysowania promieni na minimapie)
        var yHit = 0;

        var wallX;	// x,y uderzonego bloka w tablicy mapy
        var wallY;

        var slope = angleSin / angleCos; 	// przeciwprostkątna ray'a
        var dX = right ? 1 : -1;
        var dY = dX * slope;

        var x = right ? Math.ceil(px) : Math.floor(px);
        var y = py + (x - px) * slope;

        while (x >= 0 && x < settings.mapWidth && y >= 0 && y < settings.mapHeight) {
            var wallX = Math.floor(x + (right ? 0 : -1));
            var wallY = Math.floor(y);

            if (settings.map[wallY][wallX] > 0) {
                var distX = x - px;
                var distY = y - py;

                dist = distX * distX + distY * distY;

                xHit = x;
                yHit = y;
                break;
            }
            x += dX;
            y += dY;
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////POZIOM
        var slope = angleCos / angleSin;
        var dY = up ? -1 : 1;
        var dX = dY * slope;
        var y = up ? Math.floor(py) : Math.ceil(py);
        var x = px + (y - py) * slope;

        while (x >= 0 && x < settings.mapWidth && y >= 0 && y < settings.mapHeight) {
            var wallY = Math.floor(y + (up ? -1 : 0));
            var wallX = Math.floor(x);
            if (settings.map[wallY][wallX] > 0) {
                var distX = x - px;
                var distY = y - py;
                var blockDist = distX * distX + distY * distY;
                if (!dist || blockDist < dist) {
                    dist = blockDist;
                    xHit = x;
                    yHit = y;
                }
                break;
            }
            x += dX;
            y += dY;
        }
        if (dist) {
            this.DrawRay(xHit, yHit, px, py);

            dist = Math.sqrt(dist);

            dist = dist * Math.cos(r - rayAngle);

            var height = Math.round(settings.viewDistance / dist);
            var top = Math.round((settings.h - height) / 2);
            var width = height * settings.stripWidth;

            this.DrawStripe(StripID * settings.stripWidth, top, StripID * settings.stripWidth + settings.stripWidth, height, dist, width, wall);
        }
    }





    this.castRays = function (x, y, z, r, wall) {
        var StripID = 0;
        for (var i = 0; i < settings.rayCount; i++) {

            var rayScreenPos = (-settings.rayCount / 2 + i) * settings.stripWidth;
            var rayViewDist = Math.sqrt(rayScreenPos * rayScreenPos + settings.viewDistance * settings.viewDistance); //przeciwprostokatna w trójkacie
            var rayAngle = Math.asin(rayScreenPos / rayViewDist);

            this.castSingleRay(x + rayAngle, StripID++, y, z, r, wall);
        }
    }
}