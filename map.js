
class Map{
    mapArray = [];
    size_ratio = 10/3;
    map_height = null;
    island_n = null;
    land_ratio = null;
    average_height = null;
    humidity = null;
    indentation = null;
    average_T = null;

    map_width = null;
    islands_array = [];


    appendTile(tile, row, column){

        if(this.mapArray[row] == undefined){

            this.mapArray[row] = [];

        }

        this.mapArray[row][column] = tile;

    }

    destroy(){

        for(var i = 0; i < this.mapArray.length; ++i){
            if(this.mapArray[i] == undefined){ continue;   }
            for(var j = 0; j < this.mapArray[i].length; ++j){

                if(this.mapArray[i][j] != undefined){
                    this.mapArray[i][j].delete();
                }
            }
        }

        this.mapArray = [];
    }

    setInputValues(input){

        this.map_height = input[0];
        this.island_n = input[1];
        this.land_ratio = input[2];
        this.average_height = input[3];
        this.humidity = input[4];
        this.indentation = input[5];
        this.average_T = input[6];

        this.map_width = Math.floor( this.size_ratio * this.map_height );
    }

    //DOC
    createIsland(n_tiles){

        var column = mathematics.uniformRandomDiscrete(0, this.map_width);
        var row = mathematics.uniformRandomDiscrete(0, this.map_height);
        return new Island(n_tiles, this.average_height, row, column, this.indentation, this.map_width, this.map_height);

    }

    chooseTile(protoTile){

        return new FieldTile;

    }

    /*getLattitudeFromCoord(row, column){



    }*/


/*    //DOC
    correctIndex(index, upper_bound){
        console.log(upper_bound);
        if(index >= 0)
        { return index % upper_bound; }

        if(index < 0)
        {  return upper_bound - ((-1*index) % upper_bound);    }
        return index

    }

    //DOC
    correctCoordinates(row, column){

        var new_row = this.correctIndex(row, this.map_height);
        var new_column = this.correctIndex(column, this.map_width);

        return [new_row, new_column];

    }*/

    //DOC
    appendIslandTiles(island, graphics){

        var tile_chooser = new TileChooser();
        var n_tiles = island.n_tiles;

        for(var i = 0; i < n_tiles; ++i){
            if(island.tiles[i] != undefined){

                /*var coord = this.correctCoordinates(island.tiles[i].row, island.tiles[i].column);
                island.tiles[i].row = coord[0];
                island.tiles[i].column = coord[1];*/
                var coord = [island.tiles[i].row, island.tiles[i].column];

                var tile = tile_chooser.chooseTile(island.tiles[i]);

                graphics.createTile(tile, coord[0], coord[1]);
                this.appendTile(tile, coord[0], coord[1]);
            }
        }
    }


    constructor(inputs, graphics){

        this.setInputValues(inputs);
        graphics.hexagon_map_width = this.map_width * graphics.hexagon_width;

        //var n_tiles = Math.floor(this.map_height * this.map_width * this.land_ratio);
        var n_tiles = 40;
        var island = this.createIsland(n_tiles);

        this.appendIslandTiles(island, graphics);
        console.log(island);

    }
}
