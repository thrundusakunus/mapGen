
class Map{
    mapArray = [];
    map_height = null;
    island_n = null;
    land_ratio = null;
    average_height = null;
    humidity = null;
    indentation = null;
    average_T = null;


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


    destroy(){

        for(var i = 0; i < this.mapArray.length; ++i){
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


    }

    constructor(inputs){

        this.setInputValues(inputs);

        var x_arr = [0,10,20,30,40,50,60,70,80,90,-10,-20,-30,-40,-50,-60,-70,-80, -90];
        var y_arr = [27,26,25,21,15,7,3,0,-2,-3,26,25,21,15,7,3,0,-2,-3];

        var f = getTemperatureDistribution(x_arr, y_arr, this.average_T);
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

    }
}
