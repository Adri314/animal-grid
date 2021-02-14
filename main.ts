namespace SpriteKind {
    export const Animal = SpriteKind.create()
}
function setupText () {
    textSprite = textsprite.create("animal", 1, 6)
    textSprite.setBorder(1, 3, 2)
    textSprite.setPosition(80, 110)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Animal, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        if (animalPick == sprites.readDataString(otherSprite, "nombre")) {
            info.changeScoreBy(1)
            if (info.score() == 9) {
                game.over(true)
            } else {
                otherSprite.say("¡Bien!", 500)
                music.baDing.playUntilDone()
                animalNames.removeAt(animalNames.indexOf(animalPick))
                grid.place(sprite, tiles.getTileLocation(0, 3))
                startRound()
            }
        } else {
            music.knock.play()
            otherSprite.say("No", 500)
            scene.cameraShake(4, 500)
            statusbar.value += -1
            otherSprite.setFlag(SpriteFlag.Ghost, true)
        }
    }
})
function setupGrid () {
    animalImages = [
    sprites.duck.duck3,
    sprites.builtin.angelFish1,
    sprites.builtin.cat0,
    sprites.builtin.dog0,
    sprites.builtin.forestBat0,
    sprites.builtin.forestMonkey4,
    sprites.builtin.forestSnake0,
    sprites.builtin.hermitCrabAwaken5,
    sprites.builtin.clam1
    ]
    animalNames = [
    "pato",
    "pez",
    "gato",
    "perro",
    "murciélago",
    "mono",
    "serpiente",
    "cangrejo",
    "ostra"
    ]
    for (let y = 0; y <= 2; y++) {
        for (let x = 0; x <= 2; x++) {
            mySprite2 = sprites.create(animalImages[x + y * 3], SpriteKind.Animal)
            grid.place(mySprite2, tiles.getTileLocation(x * 3 + 2, y * 2 + 1))
            sprites.setDataString(mySprite2, "nombre", animalNames[x + y * 3])
        }
    }
}
function setupLife () {
    statusbar = statusbars.create(60, 6, StatusBarKind.Health)
    statusbar.max = 4
    statusbar.setPosition(32, 6)
    statusbar.setColor(6, 2)
    statusbar.setBarBorder(1, 9)
}
function startRound () {
    for (let value of sprites.allOfKind(SpriteKind.Animal)) {
        value.setFlag(SpriteFlag.Ghost, false)
    }
    animalPick = animalNames._pickRandom()
    textSprite.setText(animalPick)
    if (animalPick == "serpiente" || animalPick == "ostra") {
        article = "la "
    } else {
        article = "el "
    }
    game.showLongText("¿" + "Dónde está " + article + animalPick + "?", DialogLayout.Bottom)
}
let article = ""
let mySprite2: Sprite = null
let animalImages: Image[] = []
let statusbar: StatusBarSprite = null
let animalNames: string[] = []
let animalPick = ""
let textSprite: TextSprite = null
tiles.setTilemap(tilemap`level1`)
game.setDialogTextColor(1)
game.setDialogFrame(img`
    88888..8888888888888888....88888.
    87768888777877787778777888867778.
    87777686767876767678767688777778.
    87767767667676676676766786776768.
    8677676767767767677677678676778..
    .877768777686767776867678667768..
    .886668888888888888888888886688..
    .888888866666666666666668877768..
    88677786666666666666666668766778.
    87766686666666666666666668776678.
    87667786666666666666666668677778.
    87777686666666666666666668866888.
    88866886666666666666666668677778.
    87777686666666666666666668776678.
    87667786666666666666666668666778.
    87766786666666666666666668777688.
    88677786666666666666666668766778.
    87766686666666666666666668776678.
    87667786666666666666666668677778.
    87777686666666666666666668866888.
    88866886666666666666666668677778.
    87777686666666666666666668776678.
    87667786666666666666666668666778.
    87766786666666666666666668777688.
    .867778866666666666666668888888..
    .886688888888888888888888866688..
    .867766876768677767686777867778..
    .8776768767767767677677676767768.
    86767768766767667667676676776778.
    87777788676787676767876768677778.
    87776888877787778777877788886778.
    88888..88888888888888888....8888.
    .................................
    `)
game.showLongText("¿Dónde está el animal? Move with the arrow keys and select with A.", DialogLayout.Center)
info.setScore(0)
let mySprite = sprites.create(img`
    1 1 1 1 1 1 . . . . 1 1 1 1 1 1 
    1 1 1 1 1 1 . . . . 1 1 1 1 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 . . . . . . . . . . . . 1 1 
    1 1 1 1 1 1 . . . . 1 1 1 1 1 1 
    1 1 1 1 1 1 . . . . 1 1 1 1 1 1 
    `, SpriteKind.Player)
grid.place(mySprite, tiles.getTileLocation(0, 3))
grid.moveWithButtons(mySprite)
mySprite.z = 1
setupGrid()
setupLife()
setupText()
startRound()
