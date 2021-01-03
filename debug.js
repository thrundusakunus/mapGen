class Debug{
    graphics = new Graphics;
    counter = 0;
    timeCounter = 0;
    logger = null;

    addCount(){    ++this.counter;  }
    resetCounter(){ this.counter = 0;   }

    renderTileAfterTime(tile, time, coordinates){

        setTimeout(this.graphics.createTile, time*this.timeCounter, tile, coordinates[0], coordinates[1]);
        ++this.timeCounter;
    }

    //tohle nefunguje
    unrenderTileAfterTime(time, tile){

        setTimeout(tile.unrender, time*this.timeCounter);

    }

    constructor(){

        this.logger = new Logger;

    }
}

//DOC
class Logger{

    //var musi byt predano ve formatu {var}
    logVariable(dict_with_var){

        var name = Object.keys(dict_with_var)[0];
        var value = dict_with_var[name];
        console.log("VAR " + name + " -> " + value);

    }
}
