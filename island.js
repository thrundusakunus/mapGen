class Island{
    tiles = [];
    row = null;
    column = null;
    n_tiles = null;
    h_average = null;
    indentation = null;

    getPerimeter(){

        var perimeter = 0;
        for(var i = 0; i < this.n_tiles; ++i){
            for(var side = 0; side < 6; ++side){

                if(this.tiles[i].neighbours[side] == null){  ++perimeter;   }
            }
        }
        return perimeter;
    }

    getArea(){

        return this.n_tiles;

    }

    //DOC
    getTileFromCoordinates(row, column){

        var len = this.tiles.length;
        for(var i = 0; i < len; ++i){

            if(this.tiles[i].row == row && this.tiles[i].column == column){ return this.tiles[i];   }

        }
    }


    //DOC
    sideRowModifier(side){

        if(side == 2 || side == 5){  return 0;  }
        else if(side == 0 || side == 1){    return -1;  }
        else if(side == 3 || side == 4){   return 1;   }
    }

    //DOC
    sideColumnModifier(side){

        if(side == 0 || side == 4){ return 1;   }
        else if(side == 1 || side == 3){    return -1;  }
        else if(side == 5){ return 2;   }
        else if(side == 2){ return -2;  }

    }

    //DOC
    getPositionFromSideAndNeighbour(side, neighbour){

        var row = neighbour.row + this.sideRowModifier(side);
        var column = neighbour.column + this.sideColumnModifier(side);
        return [row, column];

    }

    //DOC
    updateTileInArray(tile){

        var index = tile.index;
        this.tiles[index] = tile;

    }

    //DOC
    dropTileFromNeighbour(dropped_tile, dropping_tile){

        for(var i = 0; i < 6; ++i){

            if(dropping_tile.neighbours[i] == dropped_tile){    dropping_tile.neighbours[i] = null; }
        }
    }

    //DOC
    dropAllNeighbours(tile){

        var neighbours = tile.neighbours;
        for(var i = 0; i < 6; ++i){
            if(neighbours[i] != null){

                var neighbour = neighbours[i];
                this.dropTileFromNeighbour(tile, neighbour);
                this.updateTileInArray(neighbour);
            }
        }
    }

    //DOC
    moveTile(tile, row, column){

        this.dropAllNeighbours(tile);
        tile.neighbours = [null, null, null, null, null, null];

        var old_row = tile.row;
        var old_column = tile.column;

        tile.row = row;
        tile.column = column;

        tile.neighbours = this.findNeighbours(row, column);
        this.updateSurroundingNeighbours(tile);
        this.updateTileInArray(tile);

        var coordinates_matrix =    [[old_row, old_column],
                                    [row, column]];

        return coordinates_matrix;

    }

    //DOC
    randomReshape(){

        var side = mathematics.uniformRandomDiscrete(0, 5);

        var array_len = this.tiles.length;
        var moved_tile_index = null;

        while(this.tiles[moved_tile_index] == null){

            moved_tile_index = mathematics.uniformRandomDiscrete(0, array_len);

        }

        var new_neighbour_index = moved_tile_index;

        while(new_neighbour_index == moved_tile_index || this.tiles[new_neighbour_index] == null){
            new_neighbour_index = mathematics.uniformRandomDiscrete(0, array_len);
        }

        var moved_tile = this.tiles[moved_tile_index];
        var new_neighbour = this.tiles[new_neighbour_index];

        var coordinates = this.getPositionFromSideAndNeighbour(side, new_neighbour);
        return this.moveTile(moved_tile, coordinates[0], coordinates[1]);

    }


    //DOC
    tryRandomReshape(desired_gradient){

        var ratio = this.getPerimeter() / this.getArea();

        var coordinates_matrix = this.randomReshape();

        var new_ratio = this.getPerimeter() / this.getArea();
        var gradient = Math.sign(new_ratio - ratio);

        window.alert("Pozadovany gradient: "+ desired_gradient + "; ziskany gradient: " + gradient);

        //navrat do puvodniho stavu pokud zmena neni k lepsimu
        if(gradient != desired_gradient){

            var old_coord = coordinates_matrix[0];
            var new_coord = coordinates_matrix[1];

            this.moveTile( this.getTileFromCoordinates(new_coord[0], new_coord[1]), old_coord[0], old_coord[1]);
            return false;

        }
        else{
;
            return true;    }
    }

    findNeighbours(row, column){

        var len = this.tiles.length;
        var neighbours = [null, null, null, null, null, null];

        for(var i = 0; i < len; ++i){

            var tile = this.tiles[i];
            if(tile == undefined){  break;  }

            if((tile.row + 1 == row) && ( tile.column - 1 == column)){   neighbours[0] = tile;   }
            if((tile.row + 1 == row) && ( tile.column + 1 == column)){   neighbours[1] = tile;   }
            if((tile.row == row) && ( tile.column + 2 == column)){   neighbours[2] = tile;   }
            if((tile.row - 1 == row) && ( tile.column + 1 == column)){   neighbours[3] = tile;   }
            if((tile.row - 1 == row) && ( tile.column - 1 == column)){   neighbours[4] = tile;   }
            if((tile.row == row) && ( tile.column - 2 == column)){   neighbours[5] = tile;   }

        }

        return neighbours;
    }


    updateSurroundingNeighbours(new_tile){

        var neighbours = new_tile.neighbours;

        for(var i = 0; i < 6; ++i){

            if(neighbours[i] != null){

                var index = (i + 3) % 6;
                neighbours[i].neighbours[index] = new_tile;

            }
        }
    }


    createTile(index){

        while(this.tiles[index] == undefined){

            var neighbour_index = mathematics.uniformRandomDiscrete(0, index-1);
            var side = mathematics.uniformRandomDiscrete(0, 5);

            var neighbour = this.tiles[neighbour_index];

            if(neighbour.neighbours[side] == null){

                var column = neighbour.column + this.sideColumnModifier(side);
                var row = neighbour.row + this.sideRowModifier(side);
                var new_tile_neighbours = this.findNeighbours(row, column);

                var new_tile = new ProtoTile(row, column, new_tile_neighbours, index);

                this.updateSurroundingNeighbours(new_tile);

                this.tiles.push( new_tile);
                neighbour.neighbours[side] = new_tile;

            }
        }
    }

    //DOC
    indentate(){

        var desired_ratio = mathematics.getPerimeterAreaRatio(this.indentation, this.n_tiles);
        var efficient_iterations = 1000;
        var ratio = this.getPerimeter() / this.getArea();
        var deviation = 0.1;
        var i = 0;

        while( i < efficient_iterations){

            var gradient = Math.sign(desired_ratio - ratio);
            if( this.tryRandomReshape(gradient) ){  ++i; }
            //window.alert(i);
            ratio = this.getPerimeter() / this.getArea();

            window.alert(desired_ratio + " ale zatim jen " + ratio);

            if( (ratio >= desired_ratio - deviation) && (ratio <= desired_ratio + deviation) ){   break;  }

        }

        console.log("DESIRED: " + desired_ratio);
        console.log("ACTUAL: " + ratio);
    }


    constructor(N_tiles, h_aver, row, column, indentation){

        this.n_tiles = N_tiles;
        this.h_average = h_aver;
        this.row = row;
        this.column = column;
        this.indentation = indentation;

        this.tiles.push( new ProtoTile(this.row, this.column, [null, null, null, null, null, null], 0 )); //prvni policko

        //for(var i = 1; i < N_tiles; ++i){
        for(var i = 1; i < N_tiles; ++i){

            this.createTile(i)

        }

        this.indentate();
        //window.alert(mathematics.getPerimeterAreaRatio(this.indentation, this.n_tiles));
    }
}
