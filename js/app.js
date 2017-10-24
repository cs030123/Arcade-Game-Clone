/**
 * app.js
* 本文件用于构建游戏面板上的敌人和玩家对象，并处理其中的逻辑
* 游戏规则：
* 1. 通过键盘的上下左右键控制玩家穿越不断出现敌人的通道，未触碰到任何敌人到达对岸则为获胜。
* 2. 在任何时刻与敌人相遇则返回原地重新开始。
*/

//canvas面板每格高度和宽度，方便update对象
var perHeight = 83;
var perWidth = 101;

/**
* @description 父类对象，包含敌人和玩家的公共属性
* @param {number} x 对象横坐标
* @param {number} y 对象纵坐标
* @param {number} sprite 图片对象
*/
var Actor = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

// 敌人类
var Enemy = function(x, y, s) {
    Actor.call(this, x, y, 'images/enemy-bug.png');
    //移动倍速
    this.s = s;
};

/**
* @description 更新敌人的位置
* @param {number} dt ，表示时间间隙，每次移动*dt，屏蔽不同电脑的时间差
*/
Enemy.prototype.update = function(dt) {
    this.x = this.x + dt * 0.3 * this.s;
    if (this.x > 5) {
        this.x = -1;
    }
};

//在屏幕上绘制敌人对象
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * perWidth, this.y * perHeight);
};

// 玩家类
var Player = function(x, y){
    Actor.call(this, x, y, 'images/char-boy.png');
    //在最上一行的偏移
    this.d = 0;
};

//暂未发挥作用
Player.prototype.update = function(dt){
    
};

//在屏幕上绘制玩家对象
Player.prototype.render = function(){
    //如果玩家成功到达目的地，则呈现不停跳动的动画
    if (this.y < 1) {
        this.d = this.d + 1;
        if (this.d > 10) {
            this.d = 0;
        }
        ctx.drawImage(Resources.get(this.sprite), this.x * perWidth, this.y * perHeight - this.d);  
    } else {
        this.d = 0;
        ctx.drawImage(Resources.get(this.sprite), this.x * perWidth, this.y * perHeight);  
    }
};

Player.prototype.handleInput = function(turn) {
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
        //重置玩家的位置
        player.y = 5;
        player.x = 2;
        player.render();
    }
};

//判断x是否处于(x1, x2)区间
function inRange(x, x1, x2) {
    return x > x1 && x < x2;
};

// 实例化敌人序列和玩家
var allEnemies = [];
allEnemies.push(new Enemy(0, 0.8, 8));
allEnemies.push(new Enemy(-2, 0.8, 16));
allEnemies.push(new Enemy(-1, 1.8, 10));
allEnemies.push(new Enemy(-15, 1.8, 18));
allEnemies.push(new Enemy(-2, 2.8, 10));
allEnemies.push(new Enemy(-8, 2.8, 12));
var player = new Player(2, 5);

// 键盘点击监听事件
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
