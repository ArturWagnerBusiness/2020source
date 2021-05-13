class Goblin {
    constructor(scene, index) {
        this.name = "goblin";
        this.scene = scene;
        this.index = index;
        this.create(this.scene);
        this.createSpriteBody();
        this.sprite.setActive(false);
        this.sprite.setVisible(false);
        this.healthbar.setVisible(false);
        this.setPosition(-50, 0 - 40 * this.index);
        this.sprite.setVelocityX(0);
        this.sprite.setVelocityY(0);
        this.reusable = true;
        this.last_shot = 0;
    }
    summon(hp, speed, x, y, reward) {
        this.reusable = false;
        this.sprite.setActive(true);
        this.sprite.setVisible(true);
        this.healthbar.setVisible(true);
        this.data = {
            hp: hp,
            max_hp: hp,
            mana: 0,
            max_mana: 0,
            speed: speed,
            reward: reward
        };
        this.setPosition(x, y);
        this.healthbar.setPosition();
        this.last_shot = 0;
    }
    disable() {
        this.sprite.setActive(false);
        this.sprite.setVisible(false);
        this.healthbar.clear();
        this.healthbar.setVisible(false);
        this.sprite.setVelocityX(0);
        this.sprite.setVelocityY(0);
        this.sprite.setVelocity(0);
        this.setPosition(-50, 0 - 40 * this.index);
        this.reusable = true;
    }
    shot(speed, angleOffset, dmg) {
        const crosshairX = this.scene.object_manager.player.sprite.x;
        const crosshairY = this.scene.object_manager.player.sprite.y;
        var rotation = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, crosshairX, crosshairY) + Math.PI;
        this.scene.object_manager.fireProjectileArrow(rotation + angleOffset, speed, this, dmg, ["boss", "arrow", "goblin"], 200);
        this.last_shot = 0;
    }
    createSpriteBody() {
        var M = Phaser.Physics.Matter.Matter;
        var playerBody = M.Bodies.rectangle(0, 0, 26, 32, { chamfer: { radius: 12 } });
        playerBody.position.y += 4;
        var compoundBody = M.Body.create({
            parts: [
                playerBody
            ],
            label: this.name,
            friction: 0,
            restitution: 0
        });
        this.sprite = this.scene.matter.add.sprite(0, 0, "player").setExistingBody(compoundBody).setFixedRotation();
        this.healthbar = this.scene.add.graphics();
    }
    pause() {
        this.sprite.setStatic(true);
    }
    unpause() {
        this.sprite.setStatic(false);
    }
    collision(entity) {
        if (entity.name === "arrow") {
            try {
                if (entity.owner.name !== "player") {
                    return;
                }
            }
            catch {
                return;
            }
            this.data.hp -= entity.dmg;
            if (this.data.hp <= 0) {
                try {
                    entity.owner.killed(this);
                }
                catch (error) {
                }
                ;
                this.data.reward = 0;
                this.disable();
            }
        }
    }
    setPositionTile(x, y) {
        this.sprite.setPosition(x * 32 + 16, y * 32 + 16);
    }
    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }
    preload(self) {
        self.load.spritesheet("goblin", "./assets/images/goblin.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }
    create(self) {
    }
    update(time, delta) {
        this.sprite.setVelocity(0);
        this.last_shot += delta;
        var distance = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.scene.object_manager.player.sprite.x, this.scene.object_manager.player.sprite.y);
        if (this.last_shot > 1000 && distance < 70) {
            this.shot(5, 0, 10);
        }
        var rotation = Phaser.Math.Angle.Between(this.sprite.x, this.sprite.y, this.scene.object_manager.player.sprite.x, this.scene.object_manager.player.sprite.y) + Math.PI;
        this.sprite.setVelocityX(Math.cos(rotation + Math.PI) * this.data.speed);
        this.sprite.setVelocityY(Math.sin(rotation + Math.PI) * this.data.speed);
        this.healthbar.clear();
        this.healthbar.fillStyle(0x000000, 1);
        this.healthbar.fillRect(this.sprite.x - 16, this.sprite.y + 16, 40, 5);
        if (this.data.hp / this.data.max_hp < 0.25) {
            this.healthbar.fillStyle(0xff0000, 1);
        }
        else if (this.data.hp / this.data.max_hp < 0.50) {
            this.healthbar.fillStyle(0xffaa00, 1);
        }
        else {
            this.healthbar.fillStyle(0x00ff00, 1);
        }
        this.healthbar.fillRect(this.sprite.x - 16, this.sprite.y + 16, Math.floor(40 * this.data.hp / this.data.max_hp), 5);
    }
}
