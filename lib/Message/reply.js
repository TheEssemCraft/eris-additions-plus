module.exports = Eris => {
  Eris.Message.prototype.reply = function(content, file) {
    if(typeof content === 'string'){
      return this.channel.createMessage(this.author.mention+", "+content,file);
    }else if (typeof content === 'object'){
      content.content = this.author.mention+", "+content.content;
      return this.channel.createMessage(content ,file);
    }
  }
}
