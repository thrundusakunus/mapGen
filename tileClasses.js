class ProtoTile{

    row = null;
    column = null;
    neighbours = [null, null, null, null, null, null]; //NE, NW, W, SW, SE, E
    index = null;

    constructor(row, column, neighbours, index){

        this.row = row;
        this.column = column;
        this.neighbours = neighbours;
        this.index = index;

    }
}

//OBSOLETE DOC
class Tile{
    imageSrc = null;
    htmlObject = null;
    visible = true;
    x = null;
    y = null;


    constructor(x, y, imageSrc){

        this.x = x;
        this.y = y;
        this.htmlObject = document.createElement("img");
        this.htmlObject.style.position = "absolute";

        if(x != undefined){ this.htmlObject.style.left = x; }
        if(y != undefined){ this.htmlObject.style.top = y;  }

        this.imageSrc = imageSrc;
        this.htmlObject.src = this.imageSrc;
        this.htmlObject.classList.add("selectDisable");
        this.htmlObject.style.zIndex = "-1";

        document.getElementById('mapDiv').appendChild(this.htmlObject);

    }

    resize(width, height){

        this.htmlObject.style.width = width;
        this.htmlObject.style.height = height;

    }

    setCoord(x,y){

        this.x = x;
        this.y = y;

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

    resize(width, height){

        this.width = width;
        this.height = height;
        this.htmlObject.style.width = this.width;
        this.htmlObject.style.height = this.height;

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
