class Tile{
    imageSrc = null;
    width = 100;
    height = 100;
    htmlObject = null;
    constructor(x, y){

        this.htmlObject = document.createElement("img");
        this.htmlObject.style.width = this.width;
        this.htmlObject.style.height = this.height;
        this.htmlObject.style.position = "absolute";
        this.htmlObject.style.left = x;
        this.htmlObject.style.top = y;

    }


}

class ForestTile extends Tile{
    constructor(x, y){

        super(x, y);
        this.imageSrc = "./tiles/forest.png";

        this.htmlObject.src = this.imageSrc;
        document.body.appendChild(this.htmlObject);
    }

}

class Map{

    constructor(){

        for(var i = 0; i < 5; ++i){

            var l = new ForestTile(100 * i, 100 * i);

        }

    }
}
