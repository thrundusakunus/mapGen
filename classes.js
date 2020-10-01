class Tile{
    imageSrc = null;
    height = 80;
    width = this.height * Math.sqrt(3) / 2; //pravidelny sestiuhelnik
    htmlObject = null;
    visible = true;


    constructor(x, y, imageSrc){

        this.htmlObject = document.createElement("img");
        this.htmlObject.style.width = this.width;
        this.htmlObject.style.height = this.height;
        this.htmlObject.style.position = "absolute";

        if(x != undefined){ this.htmlObject.style.left = x; }
        if(y != undefined){ this.htmlObject.style.top = y;  }

        this.imageSrc = imageSrc;
        this.htmlObject.src = this.imageSrc;

        document.getElementById('mapDiv').appendChild(this.htmlObject);

    }

    get width(){
        return this.width;
    }
    get height(){
        return this.height;
    }

    move(x, y){

        if(this.visible){

            this.htmlObject.style.top = y;
            this.htmlObject.style.left = x;
        }
    }

    delete(){       //odstrani html element ze stranky

        this.unrender();
        this.htmlObject.remove();
        this.htmlObject = null;
    }

    render(){

        this.visible = true;
        this.htmlObject.style.display = 'initial';

    }

    unrender(){

        this.visible = false;
        this.htmlObject.style.display = 'none';

    }


}

class ForestTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/forest.png");
    }

}

class MountainTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/mountain.png");
    }

}

class OceanTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/ocean.png");
    }

}


class Map{
    mapArray = [];

    createTile(tileObject, row, column){

        var add = 0;
        var delta_y = tileObject.height - tileObject.width * Math.sqrt(3) / 6 - 1;
        if(row % 2 == 1){   add += tileObject.width / 2;    }

        tileObject.move(tileObject.width * column + add, delta_y * row);
        this.appendTile(tileObject, row, column);

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

            //this.appendTile( new ForestTile(70 + width * i, 100), 0, i);
            this.createTile(new MountainTile, 1, i);
            this.createTile(new MountainTile, 3, i);
            this.createTile(new ForestTile, 2, i);
            this.createTile(new ForestTile, 0, i);

        }

        for(var j = 0; j < 5; ++j){

            this.createTile(new OceanTile, j, 5);

        }

        //this.appendTile(new ForestTile(70, 260), 3, 0);
        console.log(ForestTile);
        console.log(this.mapArray);

    }
}
