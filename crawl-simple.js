var DHT = require("bittorrent-dht");
var _ = require("lodash");
var geoip = require("geoip-lite-country");

var crawl = function(infohash, callback) {
  var peers = [];

  var dht = new DHT();

  dht.listen(20000, function() {
    console.log("now listening");
  });

  dht.on("peer", function(peer, infoHash, from) {
    console.log(
      "found potential peer " +
        peer.host +
        ":" +
        peer.port +
        " through " +
        from.address +
        ":" +
        from.port
    );

    var geo = geoip.lookup(peer.host);

    peers.push(peer.host + ":" + peer.port + ":" + geo.country);
  });

  setTimeout(function() {
    console.log("Done crawling");
    dht.destroy();

    console.log("Found " + _.uniq(peers).length + " peers");

    callback(_.uniq(peers));
  }, 10 * 1000);

  dht.lookup(infohash);
};

module.exports = exports = crawl;
