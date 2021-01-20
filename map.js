
class Map{
    mapArray = [];
    size_ratio = 4/3;
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
        return new Island(n_tiles, this.average_height, row, column, this.indentation);

    }

    chooseTile(protoTile){

        return new FieldTile;

    }

    //DOC
    appendIslandTiles(island, graphics){

        var tile_chooser = new TileChooser();
        var n_tiles = island.n_tiles;

        for(var i = 0; i < n_tiles; ++i){
            if(island.tiles[i] != undefined){
                var tile = tile_chooser.chooseTile(island.tiles[i]);
                graphics.createTile(tile, island.tiles[i].row, island.tiles[i].column);
                this.appendTile(tile, island.tiles[i].row, island.tiles[i].column);
            }
        }
    }


    constructor(inputs){

        var graphics = new Graphics;
        this.setInputValues(inputs);

        var n_tiles = Math.floor(this.map_height * this.map_width * this.land_ratio);
        var island = this.createIsland(n_tiles);

        this.appendIslandTiles(island, graphics);

    }
}
