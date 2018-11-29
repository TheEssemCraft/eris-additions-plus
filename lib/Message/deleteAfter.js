module.exports = Eris => {
	Eris.Message.prototype.deleteAfter = function(timer,reason){
    return new Promise(async resolve => {
        setTimeout(f=>{ 
            return resolve(this.delete(reason));
        },timer);
        
    });
  }
};
