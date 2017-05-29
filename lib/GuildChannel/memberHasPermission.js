module.exports = function(Eris) {
	Eris.GuildChannel.prototype.memberHasPermission = function(memberID, perm) {
		if(memberID.id) memberID = memberID.id;
		return this.permissionOf(memberID).has(perm);
	};
};