//Alias
let Application = PIXI.Application,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text;

//Create a Pixi Application
let app = new Application({width: 400, height: 400});

app.renderer.backgroundColor = 0xFEFDD3;

//Alias for stage
const stage = app.stage;

let arrOfMove = ['stone', 'skissors', 'paper'],
    moveOfPlayer,
    moveOfAndroid;

const textureStoneBig = PIXI.Texture.from('public/images/stoneBig.png');
const textureSkissorsBig = PIXI.Texture.from('public/images/skissorsBig.png');
const texturePaperBig = PIXI.Texture.from('public/images/paperBig.png');
const textureStoneSmall = PIXI.Texture.from('public/images/stoneSmall.png');
const textureSkissorsSmall = PIXI.Texture.from('public/images/skissorsSmall.png');
const texturePaperSmall = PIXI.Texture.from('public/images/paperSmall.png');

const stoneBigForPlayer = new PIXI.Sprite(textureStoneBig);
const stoneBigForAndroid = new PIXI.Sprite(textureStoneBig);
const stoneSmall = new PIXI.Sprite(textureStoneSmall);
const skissorsBigForPlayer = new PIXI.Sprite(textureSkissorsBig);
const skissorsBigForAndroid = new PIXI.Sprite(textureSkissorsBig);
const skissorsSmall = new PIXI.Sprite(textureSkissorsSmall);
const paperBigForPlayer = new PIXI.Sprite(texturePaperBig);
const paperBigForAndroid = new PIXI.Sprite(texturePaperBig);
const paperSmall = new PIXI.Sprite(texturePaperSmall);

const arrBigSpriteForPlayer = [stoneBigForPlayer, skissorsBigForPlayer, paperBigForPlayer];
const arrBigSpriteForAndroid = [stoneBigForAndroid, skissorsBigForAndroid, paperBigForAndroid];

stoneSmall.x = 90;
stoneSmall.y = app.screen.height - 70;

skissorsSmall.x = stoneSmall.x + stoneSmall.width + 75;
skissorsSmall.y = app.screen.height - 70;

paperSmall.x = skissorsSmall.x + skissorsSmall.width + 75;
paperSmall.y = app.screen.height - 70;

for (let index = 0; index < arrBigSpriteForPlayer.length; index++) {
    arrBigSpriteForPlayer[index].x = 70;
    arrBigSpriteForPlayer[index].anchor.set(0.5,0.5);
    arrBigSpriteForPlayer[index].y = app.screen.height / 2;
    arrBigSpriteForPlayer[index].visible = false;
}

for (let index = 0; index < arrBigSpriteForAndroid.length; index++) {
    arrBigSpriteForAndroid[index].x = app.screen.width - stoneBigForAndroid.width - 70;
    arrBigSpriteForAndroid[index].anchor.set(0.5,0.5);
    arrBigSpriteForAndroid[index].y = app.screen.height / 2;
    arrBigSpriteForAndroid[index].visible = false;
}

app.stage.addChild(stoneSmall, skissorsSmall, paperSmall, 
                   stoneBigForPlayer, skissorsBigForPlayer, paperBigForPlayer,
                   stoneBigForAndroid, skissorsBigForAndroid, paperBigForAndroid
                   );

// Opt-in to interactivity
stoneSmall.interactive = true;
skissorsSmall.interactive = true;
paperSmall.interactive = true;

// Shows hand cursor
stoneSmall.buttonMode = true;
skissorsSmall.buttonMode = true;
paperSmall.buttonMode = true;

// Pointers normalize touch and mouse
stoneSmall.on('pointerdown', onClickstoneSmall);
skissorsSmall.on('pointerdown', onClickSkissorsSmall);
paperSmall.on('pointerdown', onClickPaperSmall);

const objViewForAndroid = { 'stone' :  stoneBigForAndroid,
                            'skissors' : skissorsBigForAndroid,
                            'paper' : paperBigForAndroid
                          };

function onClickstoneSmall() {
    fadeOutBigPicture();
    stoneBigForPlayer.visible = true;
    moveOfPlayer = 'stone';
    moveOfAndroid = randomMoveOfAndroid();
    objViewForAndroid[moveOfAndroid].visible = true;
    checkPriority(moveOfPlayer, moveOfAndroid);

}

function onClickSkissorsSmall() {
    fadeOutBigPicture();
    skissorsBigForPlayer.visible = true;
    moveOfPlayer = 'skissors';
    moveOfAndroid = randomMoveOfAndroid();
    objViewForAndroid[moveOfAndroid].visible = true;
    checkPriority(moveOfPlayer, moveOfAndroid);
}

function onClickPaperSmall() {
    fadeOutBigPicture();
    paperBigForPlayer.visible = true;
    moveOfPlayer = 'paper';
    moveOfAndroid = randomMoveOfAndroid();
    objViewForAndroid[moveOfAndroid].visible = true;
    checkPriority(moveOfPlayer, moveOfAndroid);
}

//add info text
totalCountForPlayer = new Text("Player");
totalCountForPlayer.style = {fill: "0X131615", fontSize: 22};
totalCountForPlayer.position.set(40, 10);
stage.addChild(totalCountForPlayer);

playerWins = new Text();
playerWins.text = 0;
playerWins.style = {fill: "0X131615", fontSize: 22};
playerWins.position.set(35 + totalCountForPlayer.width / 2, 20 + totalCountForPlayer.height);
stage.addChild(playerWins);

totalCountForAndroid = new Text("Android");
totalCountForAndroid.style = {fill: "0X131615", fontSize: 22};
totalCountForAndroid.position.set(app.screen.width - totalCountForAndroid.width - 40, 10);
stage.addChild(totalCountForAndroid);

androidWins = new Text();
androidWins.text = 0;
androidWins.style = {fill: "0X131615", fontSize: 22};
androidWins.position.set(app.screen.width - totalCountForAndroid.width - 5, 20 + totalCountForAndroid.height);
stage.addChild(androidWins);

messageWins = new Text();
messageWins.style = {fill: "0X131615", fontSize: 22};
messageWins.anchor.set(0.5,0.5);
messageWins.position.set(app.screen.width / 2, app.screen.height / 2);
messageWins.visible = false;
stage.addChild(messageWins);

function checkPriority(player, android) {
    if ( player == 'skissors' && android == 'paper' ||  
         player == 'stone' && android == 'skissors' ||
         player == 'paper' && android == 'stone' ) {
            playerWins.text = Number(playerWins.text) + 1;
            messageWins.text = "Player wins!";
            messageWins.visible = true;
            return;
    }
    else if ( player == 'skissors' && android == 'skissors' ||  
              player == 'stone' && android == 'stone' ||
              player == 'paper' && android == 'paper' ) {
                messageWins.text = "Draw!";
                messageWins.visible = true;  
                return;                
    } 
    androidWins.text = Number(androidWins.text) + 1;
    messageWins.text = "Android wins!";
    messageWins.visible = true;
}

function randomMoveOfAndroid() {
    return arrOfMove[Math.floor(Math.random() * 3)];
}

function fadeOutBigPicture() {
    stoneBigForPlayer.visible = false;
    skissorsBigForPlayer.visible = false;
    paperBigForPlayer.visible = false;
    stoneBigForAndroid.visible = false;
    skissorsBigForAndroid.visible = false;
    paperBigForAndroid.visible = false;    
}

document.body.appendChild(app.view);