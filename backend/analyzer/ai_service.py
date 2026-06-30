import os
import json
import hashlib
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

URL = (
    "https://generativelanguage.googleapis.com/v1beta/"
    f"models/gemini-2.5-flash:generateContent?key={API_KEY}"
)

CACHE_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "cache",
    "summary_cache.json",
)
os.makedirs("cache", exist_ok=True)

def load_cache():

    if not os.path.exists(CACHE_FILE):
        return {}

    with open(
        CACHE_FILE,
        "r",
        encoding="utf-8"
    ) as f:

        return json.load(f)


def save_cache(cache):

    os.makedirs(
        os.path.dirname(CACHE_FILE),
        exist_ok=True
    )

    with open(
        CACHE_FILE,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            cache,
            f,
            indent=4
        )


def get_hash(text):

    return hashlib.sha256(
        text.encode("utf-8")
    ).hexdigest()


def ai_analyze(file_path, mode):

    try:

        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as f:

            code = f.read()

    except Exception:

        return "Unable to read file."

    current_hash = get_hash(code)

    cache = load_cache()

    cache_key = f"{file_path}_{mode}"

    if (
        cache_key in cache
        and cache[cache_key]["hash"] == current_hash
    ):

        print("✅ Loaded from cache")

        return cache[cache_key]["summary"]

    print("🤖 Calling Gemini...")

    if mode == "explain":

        prompt = f"""
You are an expert software engineer.

Explain the following code in exactly THREE short sentences.

Use simple English.

Code:

{code}
"""

    elif mode == "refactor":

        prompt = f"""
You are an expert software engineer.

Analyze the following code.

Suggest possible refactoring opportunities.

Focus on:
- Readability
- Maintainability
- Modularity

Keep the answer under 150 words.

Code:

{code}
"""

    elif mode == "bugs":

        prompt = f"""
You are an expert software engineer.

Analyze the following code.

Identify possible:
- Bugs
- Edge cases
- Security issues
- Performance issues

Do NOT invent problems.

Keep the answer under 150 words.

Code:

{code}
"""

    elif mode == "improve":

        prompt = f"""
You are an expert software engineer.

Suggest improvements for this code.

Include:
- Best practices
- Performance improvements
- Modern coding techniques

Keep the answer under 150 words.

Code:

{code}
"""

    else:

        return "Invalid AI mode."

    body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    try:

        response = requests.post(
            URL,
            json=body
        )

        data = response.json()

        summary = data["candidates"][0]["content"]["parts"][0]["text"]

        cache[cache_key] = {
            "hash": current_hash,
            "summary": summary
        }

        save_cache(cache)

        return summary

    except Exception as e:

        return str(e)