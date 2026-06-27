import re


def extract_js_dependencies(file_content):

    dependencies = []

    patterns = [

        # import X from "./file"
        r'import[\s\S]*?from\s+[\'"](.+?)[\'"]',

        # export ... from "./file"
        r'export[\s\S]*?from\s+[\'"](.+?)[\'"]',

        # import("./file")
        r'import\s*\(\s*[\'"](.+?)[\'"]\s*\)',

    ]

    for pattern in patterns:

        matches = re.findall(
            pattern,
            file_content,
            re.MULTILINE
        )

        for match in matches:

            if (
                match.startswith(".")
                and match not in dependencies
            ):

                dependencies.append(match)

    return dependencies