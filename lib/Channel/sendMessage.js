module.exports = Eris => {
	Eris.TextChannel.prototype.sendMessage = Eris.TextChannel.prototype.createMessage;
};
