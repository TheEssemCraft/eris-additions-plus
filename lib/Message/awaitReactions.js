const EventEmitter = require("events").EventEmitter;
class ReactionCollector extends EventEmitter {
	constructor(message, filter, options = {}) {
		super();
		this.filter = filter;
		this.message = message;
		this.options = options;
		this.ended = false;
		this.collected = [];
		this.bot = message.channel.guild ? message.channel.guild.shard.client : message.channel._client;

		this.listener = reaction => this.verify(reaction);
		this.bot.on("messageReactionAdd", this.listener);
		if(options.time) setTimeout(() => this.stop("time"), options.time);
	}

	verify(reaction) {
		if(this.message.id !== reaction.message.id) return false;
		if(this.filter(reaction)) {
			this.collected.push(reaction);

			this.emit("reaction", reaction);
			if(this.collected.length >= this.options.maxMatches) this.stop("maxMatches");
			return true;
		}
		return false;
	}

	stop(reason) {
		if(this.ended) return;
		this.ended = true;
		this.bot.removeListener("addMessageReaction", this.listener);

		this.emit("end", this.collected, reason);
	}
}

module.exports = Eris => {
	Eris.Message.prototype.awaitReactions = function(filter, options) {
		const collector = new ReactionCollector(this, filter, options);
		return new Promise(resolve => collector.on("end", resolve));
	};
};
