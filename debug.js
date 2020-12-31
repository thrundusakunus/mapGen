class Debug{
    graphics = new Graphics;
    counter = 0;
    timeCounter = 0;

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

}
