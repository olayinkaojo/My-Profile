import json
import os
from datetime import date
import anthropic
from style_guide import STYLE_GUIDE


MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 4000
DRAFTS_DIR = os.path.join(os.path.dirname(__file__), "..", "posts", "drafts")

SYSTEM_PROMPT = (
    STYLE_GUIDE
    + """

You are writing as Olayinka Samuel Ojo, founder of Lit Creative Designs, a security engineer and AI engineering student based in Abuja, Nigeria. Write the complete blog post.

Return JSON only, no explanation, no markdown fences:
{
  "title": "...",
  "excerpt": "...(one sentence, max 30 words)",
  "tags": ["...", "...", "..."],
  "slug": "...(kebab-case)",
  "body": "...(full MDX body, no frontmatter)"
}"""
)


def _user_prompt(topic_data: dict, current_work: str) -> str:
    return f"""Topic: {topic_data['topic']}

Angle: {topic_data['angle']}

Why this was selected: {topic_data['why']}

Source URLs for reference: {", ".join(topic_data.get('source_urls', []))}

What the author is currently working on:
{current_work}

Write the complete blog post now."""


def write_post(topic_data: dict, current_work: str) -> tuple[str, str]:
    client = anthropic.Anthropic()

    print("  Calling Claude API to write post ...")
    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": _user_prompt(topic_data, current_work)}],
    )
    raw = message.content[0].text.strip()

    post = json.loads(raw)

    today = date.today().isoformat()
    tags_yaml = json.dumps(post["tags"])
    frontmatter = f"""---
title: "{post['title']}"
date: "{today}"
tags: {tags_yaml}
excerpt: "{post['excerpt']}"
draft: true
---

"""
    mdx_content = frontmatter + post["body"]

    os.makedirs(DRAFTS_DIR, exist_ok=True)
    slug = post["slug"]
    output_path = os.path.join(DRAFTS_DIR, f"{slug}.mdx")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(mdx_content)

    print(f"  Saved draft to {output_path}")
    return slug, post["title"]
