class ProtoTile{

    row = null;
    column = null;
    height = 80;
    width = this.height * Math.sqrt(3) / 2; //pravidelny sestiuhelnik
    neighbours = [null, null, null, null, null, null] //NE, NW, W, SW, SE, E
    index = null;

    constructor(row, column, neighbours, index){

        this.row = row;
        this.column = column;
        this.neighbours = neighbours;
        this.index = index;

    }
}


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

class FieldTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/field.png");
    }

}

class IceTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/ice.png");
    }

}

class DesertTile extends Tile{
    constructor(x, y){

        super(x, y, "./tiles/desert.png");
    }

}
