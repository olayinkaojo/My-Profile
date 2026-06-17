import json
import time
import anthropic


MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 2000


def _build_prompt(trending_items: list[dict], current_work: str) -> str:
    items_text = "\n".join(
        f"- [{item['source']}] {item['title']} ({item['date']})\n  {item['summary'][:200]}"
        for item in trending_items[:40]
    )
    return f"""Here are trending topics in AI engineering and cybersecurity from the past week:

{items_text}

The author is currently working on:
{current_work}

Given these trending topics and the author's current work, identify the single best intersection for a blog post. The post should:
1. Be genuinely relevant to current trends
2. Connect to the author's actual work or experience
3. Be something an engineer in Nigeria/Africa would have a unique angle on
4. Not have been obviously covered a hundred times already

Return JSON only, no explanation, no markdown fences:
{{
  "topic": "...",
  "angle": "...",
  "why": "...",
  "source_urls": ["...", "..."]
}}"""


def select_topic(trending_items: list[dict], current_work: str) -> dict:
    client = anthropic.Anthropic()

    print("  Calling Claude API for topic selection ...")
    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        messages=[{"role": "user", "content": _build_prompt(trending_items, current_work)}],
    )
    raw = message.content[0].text.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        print("  JSON parse failed, retrying with stricter prompt ...")
        time.sleep(2)

        strict_prompt = (
            _build_prompt(trending_items, current_work)
            + "\n\nCRITICAL: Your entire response must be a single valid JSON object. "
            "No text before or after. No markdown. No code fences. Raw JSON only."
        )
        message = client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            messages=[{"role": "user", "content": strict_prompt}],
        )
        raw = message.content[0].text.strip()
        return json.loads(raw)
