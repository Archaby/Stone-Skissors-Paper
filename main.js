let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

//Create a Pixi Application
let app = new Application({width: 400, height: 400});

loader
    .add("public/images/paperSmall.png")
    .load(setup);

app.renderer.backgroundColor = 0xFEFDD3;

//Alias for stage
const stage = app.stage;

function setup() {
    let paper = new Sprite(
        loader.resources["public/images/paperSmall.png"].texture
    );
    stage.addChild(paper);
}

totalCountForPlayer = new Text("Player: ");
totalCountForPlayer.style = {fill: "0X131615", fontSize: 22};
totalCountForPlayer.position.set(10, 10);
stage.addChild(totalCountForPlayer);

totalCountForAndroid = new Text("Android: ");
totalCountForAndroid.style = {fill: "0X131615", fontSize: 22};
totalCountForAndroid.position.set(400 - totalCountForAndroid.width, 10);
console.log(app.width);
stage.addChild(totalCountForAndroid);    

document.body.appendChild(app.view);