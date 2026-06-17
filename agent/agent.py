#!/usr/bin/env python3
"""
Blog agent — reads current work, fetches trending topics, picks the best
intersection, drafts a post, and saves it to posts/drafts/ for PR review.
"""

import os
import sys
import time

# Add agent/ dir to path so local imports work when run from project root
sys.path.insert(0, os.path.dirname(__file__))

from rss_fetcher import fetch_trending
from topic_selector import select_topic
from post_writer import write_post


CURRENT_WORK_PATH = os.path.join(os.path.dirname(__file__), "current-work.txt")
MIN_TRENDING_ITEMS = 5


def read_current_work() -> str:
    if not os.path.exists(CURRENT_WORK_PATH):
        print("Error: current-work.txt not found.")
        print("Update current-work.txt before running agent.")
        sys.exit(1)

    content = open(CURRENT_WORK_PATH, encoding="utf-8").read().strip()
    if not content:
        print("Error: current-work.txt is empty.")
        print("Update current-work.txt before running agent.")
        sys.exit(1)

    return content


def main():
    print("=== Blog Agent ===\n")

    print("[1/4] Reading current-work.txt ...")
    current_work = read_current_work()
    print(f"  OK ({len(current_work)} chars)\n")

    print("[2/4] Fetching trending RSS items ...")
    trending = fetch_trending()
    if len(trending) < MIN_TRENDING_ITEMS:
        print(f"  Warning: only {len(trending)} items found (expected >= {MIN_TRENDING_ITEMS}). Continuing anyway.")
    print()

    print("[3/4] Selecting best topic ...")
    topic_data = select_topic(trending, current_work)
    print(f"  Topic: {topic_data['topic']}")
    print(f"  Angle: {topic_data['angle']}\n")

    time.sleep(2)

    print("[4/4] Writing blog post ...")
    slug, title = write_post(topic_data, current_work)
    print()

    print("=== Done ===")
    print(f"Draft saved: posts/drafts/{slug}.mdx")
    print(f"Title: {title}")
    print("Review the PR on GitHub and merge to publish.")

    sys.exit(0)


if __name__ == "__main__":
    main()
