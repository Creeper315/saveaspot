class Post {
    constructor({
        id,
        requesterid,
        time,
        description,
        locationid,
        lat,
        long,
        helper,
        reward,
        visible,
    }) {
        // 这里的 input 是一个 object，因为很多 field 会是 null。

        this.id = id;
        this.requesterid = requesterid;
        this.time = time;
        this.description = description;
        this.locationid = locationid;
        this.helper = helper; // Helper 是 User name
        this.reward = reward;
        this.visible = visible;
        this.lat = lat;
        this.long = long;
    }
}
exports.Post = Post;
