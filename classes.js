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
    mapArray = [];

    createTile(proto, row, column){

        var tile = proto;
        this.appendTile(tile, row, column);

    }

    appendTile(tile, row, column){

        if(this.mapArray[row] == undefined){

            this.mapArray[row] = [];

        }

        this.mapArray[row][column] = tile;

    }

    constructor(){

        var tile0 = new ForestTile(1,1);
        var width = tile0.width, height = tile0.height;
        tile0.delete();

        for(var i = 0; i < 5; ++i){

            /*this.appendTile( new ForestTile(70 + width * i, 100), 0, i);
            this.appendTile(new MountainTile(120 + width * i, 180), 1, i);*/

            this.createTile(ForestTile.prototype, 0, i);

        }

        //this.appendTile(new ForestTile(70, 260), 3, 0);
        console.log(ForestTile.prototype);
        console.log(this.mapArray);

    }
}
