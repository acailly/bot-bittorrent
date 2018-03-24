# bot-bittorrent

Find peers seeding a torrent

## Usage

```
Usage: bittorrent [options] [infohash]

  Find peers seeding a torrent

  Options:

    --help        output usage information
    -s, --simple  Use simple script
    -r, --raw     Use raw script
```

## How it works

### DHT

This command crawl the Bittorrent DHT (https://en.wikipedia.org/wiki/Distributed_hash_table) to find peers for a specific infohash.

### InfoHash

An infohash is the ID of the torrent in the DHT. It allows peers to download torrents without any tracker, in a full distributed mode.

### Where to find the infohash

On some torrent trackers like PirateBay, the infohash is displayed in the torrent front page.

If you have a look on the magnet link, you will see something like `magnet:?xt=urn:btih:here_is_the_infohash`.

## Why is there 2 scripts

* `crawl-simple` uses the `bittorrent-dht` package that simplifies everything
* `crawl-raw` gets its hand dirty
