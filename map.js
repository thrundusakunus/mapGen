
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


    createTile(tileObject, row, column){

        var add = tileObject.width / 2;
        var delta_y = tileObject.height - tileObject.width * Math.sqrt(3) / 6 - 1;
        //if(row % 2 == 1){   add += tileObject.width / 2;    }

        tileObject.move( (tileObject.width - add) * column , delta_y * row);
        this.appendTile(tileObject, row, column);

    }


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

    constructor(inputs){

        this.setInputValues(inputs);

        var n_tiles = Math.floor(this.map_height * this.map_width * this.land_ratio);
        var column = mathematics.uniformRandomDiscrete(0, this.map_width);
        var row = mathematics.uniformRandomDiscrete(0, this.map_height);

        var island = new Island(n_tiles, this.average_height, row, column, this.indentation);

        for(var i = 0; i < this.map_width; ++i){
                if(island.tiles[i] != undefined){

                    this.createTile(new ForestTile, island.tiles[i].row, island.tiles[i].column);

                }
            }
        console.log(island);
        console.log(document.getElementById('mapDiv').style.width);
        /*var f = mathematics.getTemperatureDistribution(this.average_T);
        window.alert(f(90));


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

            this.createTile(new DesertTile, j, 5);
            this.createTile(new FieldTile, j, 6);

        }
        console.log(ForestTile);
        console.log(this.mapArray);
*/
    }
}
