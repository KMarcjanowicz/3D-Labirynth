function Minimap() {
    var miniMap = document.getElementById('minimap');
    var ctx = miniMap.getContext('2d');

    this.drawMiniMap = function (y, z) {

        var mapWidth = y[0].length;
        var mapHeight = y.length;

        miniMap.width = mapWidth * z;
        miniMap.height = mapHeight * z;

        miniMap.style.width = (mapWidth * z) + 'px';
        miniMap.style.height = (mapHeight * z) + 'px';

        ctx.fillStyle = 'rgb(64,64,255)';
        ctx.fillRect(0, 0, miniMap.width, miniMap.height);
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                let square = y[i][j];
                if (square > 0) {
                    ctx.fillStyle = 'rgb(0,0,0)';
                    ctx.fillRect(
                        j * z - 3,
                        i * z,
                        11, 11
                    );

                    ctx.fillStyle = 'rgb(255,255,255)';
                    ctx.fillRect(
                        j * z,
                        i * z,
                        z, z
                    );
                }
            }
        }
        for (let i = 0; i < mapHeight; i++) {
            for (let j = 0; j < mapWidth; j++) {
                let square = y[i][j];
                if (square > 0) {
                    if (square > 0) {
                        ctx.fillStyle = 'rgb(255,255,255)';
                        ctx.fillRect(
                            j * z,
                            i * z,
                            z, z
                        );
                    }
                }
            }
        }
    }
    
    this.DrawPlayer = function (x, y, z, r) {

        ctx.fillRect(
            x * z - 2,
            y * z - 2,
            4, 4
        );
        ctx.beginPath();
        ctx.moveTo(x * z, y * z);
        ctx.lineTo(
            (x + Math.cos(r) * 4) * z,
            (y + Math.sin(r) * 4) * z
        );
        ctx.closePath();
        ctx.stroke();
    }
}