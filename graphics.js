//DOC
class Graphics{

    hexagon_height = 40;
    hexagon_width = this.hexagon_height * Math.sqrt(3) / 2;
    y_offset = this.hexagon_height - this.hexagon_width * Math.sqrt(3) / 6 - 1;

    createTile(tileObject, row, column){

        var add = tileObject.width / 2;
        var delta_y = tileObject.height - tileObject.width * Math.sqrt(3) / 6 - 1;
        //if(row % 2 == 1){   add += tileObject.width / 2;    }

        tileObject.resize(this.hexagon_width, this.hexagon_height);
        tileObject.move( this.hexagon_width * column / 2, this.y_offset * row);

    }



}

//DOC
class GraphicsWindow{

    x1 = 0;
    y1 = 0;
    x2 = null;
    y2 = null;

    constructor(){

        var win_size = [window.innerWidth, window.innerHeight];
        var map_div = document.getElementById("mapDiv");
        var div_size_percents = [map_div.style.width, map_div.style.height];
        var div_size_ratios = [1*("0." + div_size_percents[0].substring(0,2)), 1*("0." + div_size_percents[1].substring(0,2))];
        var map_div_size = [div_size_ratios[0] * win_size[0], div_size_ratios[1] * win_size[1]];


    }

    update(translate_vector){



    }

}
