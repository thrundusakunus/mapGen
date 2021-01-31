//DOC
class Graphics{

    createTile(tileObject, row, column){

        var add = tileObject.width / 2;
        var delta_y = tileObject.height - tileObject.width * Math.sqrt(3) / 6 - 1;
        //if(row % 2 == 1){   add += tileObject.width / 2;    }

        tileObject.move( (tileObject.width - add) * column , delta_y * row);

    }



}

//DOC
class GraphicsWindow{

    constructor(){



    }

    update(translate_vector){

        

    }

}
