module.exports = function(vorpal) {
  vorpal
    .command("bittorrent [infohash]")
    .description("Find peers seeding a torrent")
    .option("-s, --simple", "Use simple script")
    .option("-r, --raw", "Use raw script")
    .action(function(args, callback) {
      var infohash =
        args.infohash || "96BFF9E1F47398C3807071B55AD658ED50F2042F"; //cité de la peur https://pirateproxy.sh/torrent/4168931/La_citA__de_la_Peur_by_LADB
      if (args.options.raw) {
        var crawl = require("./crawl-raw");

        crawl.init(function() {
          crawl(infohash, function(err, results) {
            console.log(results);
            callback("Crawl ended");
          });
        });
      } else {
        console.log("Finding peers seeding " + infohash);

        require("./crawl-simple")(infohash, function(peers) {
          console.log(peers);
          callback("Crawl ended");
        });
      }
    });
};
