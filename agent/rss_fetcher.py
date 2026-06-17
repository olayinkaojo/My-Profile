import feedparser
from datetime import datetime, timezone, timedelta
from dateutil import parser as dateutil_parser


FEEDS = [
    "https://hnrss.org/frontpage",
    "https://dev.to/feed/tag/ai",
    "https://dev.to/feed/tag/cybersecurity",
    "https://dev.to/feed/tag/webdev",
    "https://krebsonsecurity.com/feed/",
    "https://feeds.feedburner.com/TheHackersNews",
    "https://www.anthropic.com/rss.xml",
]

LOOKBACK_DAYS = 7


def _parse_date(entry) -> datetime | None:
    for attr in ("published", "updated"):
        raw = getattr(entry, attr, None)
        if raw:
            try:
                dt = dateutil_parser.parse(raw)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                return dt
            except Exception:
                continue
    return None


def fetch_trending() -> list[dict]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=LOOKBACK_DAYS)
    results = []

    for url in FEEDS:
        print(f"  Fetching {url} ...")
        try:
            feed = feedparser.parse(url)
            source = feed.feed.get("title", url)
            for entry in feed.entries:
                pub_date = _parse_date(entry)
                if pub_date is None or pub_date < cutoff:
                    continue
                results.append({
                    "title": entry.get("title", "").strip(),
                    "link": entry.get("link", "").strip(),
                    "summary": entry.get("summary", "")[:500].strip(),
                    "source": source,
                    "date": pub_date.strftime("%Y-%m-%d"),
                })
        except Exception as exc:
            print(f"  Warning: failed to fetch {url}: {exc}")
            continue

    print(f"  Found {len(results)} items from the last {LOOKBACK_DAYS} days.")
    return results
