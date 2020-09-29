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

    get width(){
        return this.width;
    }
    get height(){
        return this.height;
    }

    delete(){       //odstrani html element ze stranky

        this.htmlObject.remove();
        this.htmlObject = null;
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

class MountainTile extends Tile{
    constructor(x, y){

        super(x, y);
        this.imageSrc = "./tiles/mountain.png";

        this.htmlObject.src = this.imageSrc;
        document.body.appendChild(this.htmlObject);
    }

}


class Map{

    constructor(){

        var tile0 = new ForestTile(1,1);
        var width = tile0.width, height = tile0.height;
        tile0.delete();

        for(var i = 0; i < 5; ++i){

            var l = new ForestTile(70 + width * i * 1.01, 100);
            var k = new MountainTile(120 + width * i, 180);

        }

    }
}
