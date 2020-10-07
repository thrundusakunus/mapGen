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

    constructor(N_tiles, h_aver, row, column){

        this.n_tiles = N_tiles;
        this.h_average = h_aver;
        this.row = row;
        this.column = column;

        this.tiles[0] = new ProtoTile(this.row, this.column);


    }
}
