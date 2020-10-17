class Island{
    tiles = [];
    row = null;
    column = null;
    n_tiles = null;
    h_average = null;

    getPerimeter(){


    }

    getArea(){


    }

    findNeighbours(row, column){

        var len = this.tiles.length;
        var neighbours = [null, null, null, null, null, null];

        for(var i = 0; i < len; ++i){

            var tile = this.tiles[i];
            if(tile == undefined){  break;  }

            if(tile.row + 1 == row && tile.column - 1 == column){   neighbours[0] = tile;   }
            if(tile.row - 1 == row && tile.column - 1 == column){   neighbours[1] = tile;   }
            if(tile.row - 1 == row && tile.column == column){   neighbours[2] = tile;   }
            if(tile.row - 1 == row && tile.column + 1 == column){   neighbours[3] = tile;   }
            if(tile.row + 1 == row && tile.column + 1 == column){   neighbours[4] = tile;   }
            if(tile.row + 1 == row && tile.column - 1 == column){   neighbours[5] = tile;   }

        }

        return neighbours;
    }


    updateTileNeighbours(new_tile){

        var neighbours = new_tile.neighbours;

        for(var i = 0; i < 6; ++i){

            if(neighbours[i] != null){

                var tile = neighbours[i];
                var index = (i + 3) % 6;
                tile.neighbours[index] = new_tile;

            }
        }
    }


    chooseNeighbourAndSide(index){

        while(this.tiles[index] == undefined){

            var neighbour_index = mathematics.uniformRandomDiscrete(0, index-1);
            var side = mathematics.uniformRandomDiscrete(0, 5);

            var neighbour = this.tiles[neighbour_index];

            if(neighbour.neighbours[side] == null){

                var row = neighbour.row + ( (side > 0 && side < 5) ? -1 : 1 );  //vlevo nebo vpravo
                var column = neighbour.column + ( (side == 0 || side == 1) ? -1 : ((side == 4 || side == 5) ? 1 : 0) );

                var new_tile_neighbours = this.findNeighbours(row, column);

                var new_tile = new ProtoTile(row, column, new_tile_neighbours);

                this.updateTileNeighbours(new_tile);

                this.tiles.push( new_tile);
                neighbour.neighbours[side] = new_tile;

            }

        }
    }

    constructor(N_tiles, h_aver, row, column){

        this.n_tiles = N_tiles;
        this.h_average = h_aver;
        this.row = row;
        this.column = column;

        this.tiles.push( new ProtoTile(this.row, this.column, [null, null, null, null, null, null]) );

        for(var i = 1; i < N_tiles; ++i){


            this.chooseNeighbourAndSide(i)

        }
    }
}
