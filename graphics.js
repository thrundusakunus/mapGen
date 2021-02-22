//DOC
class Graphics{

    hexagon_height = 60;
    hexagon_width = this.hexagon_height * Math.sqrt(3) / 2;
    y_offset = this.hexagon_height - this.hexagon_width * Math.sqrt(3) / 6 - 1;
    my_tiles = [];

    createTile(tileObject, row, column){

        tileObject.resize(this.hexagon_width, this.hexagon_height);
        tileObject.setCoord(this.hexagon_width * column / 2, this.y_offset * row);
        tileObject.move( this.hexagon_width * column / 2, this.y_offset * row);
        this.my_tiles.push(tileObject);

    }

    render(coord_matrix){

        var my_tiles_len = this.my_tiles.length;
        for(var i=0; i < my_tiles_len; ++i){

            var tile = this.my_tiles[i];
            var x = tile.x;
            var y = tile.y;
            /*console.log(coord_matrix);
            console.log([x,y]);*/
            if( (coord_matrix[0][0] < (this.hexagon_width+x)) && (x < coord_matrix[1][0])
                && (coord_matrix[0][1] < (this.hexagon_height+y)) && (y < coord_matrix[1][1])){

                tile.render();
                tile.move(x - coord_matrix[0][0], y - coord_matrix[0][1]);
            }else{
                tile.unrender();
            }
        }
    }


}


//DOC
class GraphicsWindow{

    x1 = 0;
    y1 = 0;
    x2 = null;
    y2 = null;
    map_div_size = null;
    graphics = null;

    constructor(graphics){

        this.graphics = graphics;

        var win_size = [window.innerWidth, window.innerHeight];
        var map_div = document.getElementById("mapDiv");
        var div_size_percents = [map_div.style.width, map_div.style.height];
        var div_size_ratios = [1*("0." + div_size_percents[0].substring(0,2)), 1*("0." + div_size_percents[1].substring(0,2))];
        this.map_div_size = [div_size_ratios[0] * win_size[0], div_size_ratios[1] * win_size[1]];

        var tile_size = [graphics.hexagon_width, graphics.hexagon_height];

        this.recalcSecondaryCoord();
    }

    recalcSecondaryCoord(){

        this.y2 = this.y1 + this.map_div_size[1];
        this.x2 = this.x1 + this.map_div_size[0];

    }

    update(translate_vector){

        var k = 1;
        this.x1 += Math.round(k * translate_vector[0]);
        this.y1 += Math.round(k * translate_vector[1]);
        this.recalcSecondaryCoord();

        var coord_matrix = [[this.x1, this.y1],
                        [this.x2, this.y2]];

        this.graphics.render(coord_matrix);
    }

}
