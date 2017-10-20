var perHeight = 83;
var perWidth = 101;
// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, s) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    //起始位置
    this.x = x;
    this.y = y;
    //移动倍速
    this.s = s;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + dt * 0.3 * this.s;
    if (this.x > 5) {
        this.x = -1;
    }
    this.render();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * perWidth, this.y * perHeight);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y, s){
    this.sprite = 'images/char-boy.png';
    //起始位置
    this.x = x;
    this.y = y;
    //在最上一行的偏移
    this.d = 0;
}

Player.prototype.update = function(dt){
    
};

Player.prototype.render = function(){
    if (this.y < 1) {
        this.d = this.d + 0.03;
        if (this.d >= 0.15) {
            this.d = 0;
        }
    } else {
        this.d = 0;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x * perWidth, (this.y - this.d) * perHeight);    
};

Player.prototype.handleInput = function(turn){
    switch(turn) {
        case 'up':
            if (this.y > 0) {
                this.y = this.y - 1;
            }
        break;
        case 'down':
            if (this.y < 4) {
                this.y = this.y + 1;
            }
        break;
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 1;
            }
        break;
        case 'right':
            if (this.x < 4) {
                this.x = this.x + 1;
            }
        break;
        default:
        break;
    }
};

function checkCollisions(){
    var isConflicting = false;
    allEnemies.forEach(function(enemy) {
        if (!isConflicting 
                && inRange(player.x, enemy.x - 0.5, enemy.x + 0.5)
                && inRange(player.y, enemy.y - 0.5, enemy.y + 0.5) 
            ) {
            isConflicting = true;
        }
    });
    if (isConflicting) {
        resetPlayer();
    }
}

function showSuccess(){

}

function inRange(x, x1, x2){
    return x > x1 && x < x2;
}

function resetPlayer(){
    player.y = 4.8;
    player.x = 2;
    player.render();
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
//allEnemies.push(new Enemy(1, 2.8, 16));
allEnemies.push(new Enemy(0, 0.8, 8));
allEnemies.push(new Enemy(-2, 0.8, 16));
allEnemies.push(new Enemy(-1, 1.8, 10));
allEnemies.push(new Enemy(-15, 1.8, 18));
allEnemies.push(new Enemy(-2, 2.8, 10));
allEnemies.push(new Enemy(-8, 2.8, 12));
var player = new Player(2, 5, 10);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
