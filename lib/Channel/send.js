module.exports = Eris => {
	Eris.TextChannel.prototype.send = Eris.TextChannel.prototype.createMessage;
};
