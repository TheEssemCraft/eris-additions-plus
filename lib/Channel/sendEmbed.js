module.exports = Eris => {
	Eris.TextChannel.prototype.sendEmbed = Eris.TextChannel.prototype.createEmbed;
};

module.exports.deps = ["Channel.createEmbed"];
