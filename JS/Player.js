function Player() {
    var settings = new Settings();

    this.x = 16;
    this.y = 10;
    this.direction = 0;
    this.rotation = 0;
    this.speed = 0;
    this.moveSpeed = 0.2;
    this.rotSpeed = 4 * Math.PI / 100;

    this.CheckCollisions = function (x, y) {
        if (y < 0 || y >= settings.mapHeight || x < 0 || x >= settings.mapWidth) {
            return true;
        }
        return (settings.map[Math.floor(y)][Math.floor(x)] != 0);
    }

    this.move = function () {
        var moveStep = this.speed * this.moveSpeed;
        this.rotation += this.direction * this.rotSpeed;
        var newX = this.x + Math.cos(this.rotation) * moveStep;
        var newY = this.y + Math.sin(this.rotation) * moveStep;
        if (this.CheckCollisions(newX, newY) == false) {
            this.x = newX;
            this.y = newY;
        }
    }
}    