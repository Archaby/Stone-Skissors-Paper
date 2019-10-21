let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

//Create a Pixi Application
let app = new Application({width: 400, height: 400});

// loader
//     .add("public/images/paperSmall.png")
//     .load(setup);

app.renderer.backgroundColor = 0xFEFDD3;

//Alias for stage
const stage = app.stage;

let scoreForPlayer = 0,
    scoreForAndroid = 0;

const textureStoneBig = PIXI.Texture.from('public/images/stoneBig.png');
const textureStoneSmall = PIXI.Texture.from('public/images/stoneSmall.png');
const textureSkissorsBig = PIXI.Texture.from('public/images/skissorsBig.png');
const textureSkissorsSmall = PIXI.Texture.from('public/images/skissorsSmall.png');
const texturePaperBig = PIXI.Texture.from('public/images/paperBig.png');
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

stoneSmall.x = 90;
stoneSmall.y = app.screen.height - 70;

skissorsSmall.x = stoneSmall.x + stoneSmall.width + 75;
skissorsSmall.y = app.screen.height - 70;

paperSmall.x = skissorsSmall.x + skissorsSmall.width + 75;
paperSmall.y = app.screen.height - 70;

stoneBigForPlayer.x = 60;
stoneBigForPlayer.y = app.screen.height / 2.5;
stoneBigForPlayer.visible = false;

skissorsBigForPlayer.x = 60;
skissorsBigForPlayer.y = app.screen.height / 2.5;
//skissorsBigForPlayer.visible = false;

paperBigForPlayer.x = 60;
paperBigForPlayer.y = app.screen.height / 2.5;
paperBigForPlayer.visible = false;

stoneBigForAndroid.x = app.screen.width - stoneBigForAndroid.width - 150;
stoneBigForAndroid.y = app.screen.height / 2.5;
//stoneBigForAndroid.visible = false;

skissorsBigForAndroid.x = app.screen.width - skissorsBigForAndroid.width - 150;
skissorsBigForAndroid.y = app.screen.height / 2.5;
skissorsBigForAndroid.visible = false;

paperBigForAndroid.x = app.screen.width - paperBigForAndroid.width - 150;
paperBigForAndroid.y = app.screen.height / 2.5;
paperBigForAndroid.visible = false;

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

function onClickstoneSmall() {
    console.log('hello');
}

function onClickSkissorsSmall() {
    console.log('hello');
}

function onClickPaperSmall() {
    console.log('hello');
}

function setup() {

    // id = loader.resources["images/sprite.json"].textures;
    // stoneBig = new Sprite(id["stoneBig.png"]);
    // app.stage.addChild(stoneBig);

    // stoneBig = new Sprite(
    //     resources["images/sprite.json"].Texture["stoneBig.png"]
    // );
    // stoneBig.x = 68;
    // stoneBig.y = 68;
    // app.stage.addChild(stoneBig);

    // let paper = new Sprite(
    //     loader.resources["public/images/paperSmall.png"].texture
    // );
    //stage.addChild(paper);
}

//add info text
totalCountForPlayer = new Text("Player");
totalCountForPlayer.style = {fill: "0X131615", fontSize: 22};
totalCountForPlayer.position.set(40, 10);
stage.addChild(totalCountForPlayer);

playerWins = new Text();
playerWins.text = scoreForPlayer;
playerWins.style = {fill: "0X131615", fontSize: 22};
playerWins.position.set(35 + totalCountForPlayer.width / 2, 20 + totalCountForPlayer.height);
stage.addChild(playerWins);

totalCountForAndroid = new Text("Android");
totalCountForAndroid.style = {fill: "0X131615", fontSize: 22};
totalCountForAndroid.position.set(app.screen.width - totalCountForAndroid.width - 40, 10);
stage.addChild(totalCountForAndroid);

androidWins = new Text();
androidWins.text = scoreForAndroid;
androidWins.style = {fill: "0X131615", fontSize: 22};
androidWins.position.set(app.screen.width - totalCountForAndroid.width - 5, 20 + totalCountForAndroid.height);
stage.addChild(androidWins);

document.body.appendChild(app.view);