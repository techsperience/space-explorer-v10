controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        3 3 3 3 3 3 3 3 
        3 . . . . . . 3 
        3 . 3 3 3 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 . . 3 . 3 
        3 . 3 3 3 3 . 3 
        3 . . . . . . 3 
        3 3 3 3 3 3 3 3 
        `, mySprite, 0, -70)
    projectile.startEffect(effects.fire)
})
info.onLifeZero(function () {
    music.powerDown.play()
    game.splash("G A M E  O V E R !", "Tap Spacebar to try again")
    game.reset()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprite.destroy(effects.spray, 500)
    otherSprite.destroy(effects.warmRadial, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 500)
})
let myEnemy: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
game.splash("WELCOME TO SPACE EXPLORER", "Tap Spacebar to Start")
game.showLongText("Created by Jason Takahashi using MakeCode", DialogLayout.Bottom)
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 1 . . . . . . . . . . 1 . . 
    . . b . . . . . . . . . . b . . 
    . . b . . . 1 . . 1 . . . b . . 
    . . b . . . b . . b . . . b . . 
    . . b b b b b b b b b b b b . . 
    . . 1 b b b b b b b b b b 1 . . 
    . . . b 9 9 9 9 9 9 9 9 b . . . 
    . . . b . 4 . . . . 4 . b . . . 
    . . . b . 4 . . . . 4 . b . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setPosition(75, 100)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
})
