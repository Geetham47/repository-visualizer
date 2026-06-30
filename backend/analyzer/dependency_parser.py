import re
import ast


# -----------------------------
# JavaScript / TypeScript
# -----------------------------
def extract_js_dependencies(file_content):

    dependencies = []

    patterns = [

        r'import[\s\S]*?from\s+[\'"](.+?)[\'"]',

        r'export[\s\S]*?from\s+[\'"](.+?)[\'"]',

        r'import\s*\(\s*[\'"](.+?)[\'"]\s*\)',
    ]

    for pattern in patterns:

        matches = re.findall(
            pattern,
            file_content,
            re.MULTILINE,
        )

        for match in matches:

            if match.startswith(".") and match not in dependencies:

                dependencies.append(match)

    return dependencies


# -----------------------------
# Python (AST)
# -----------------------------
def extract_python_dependencies(file_content):

    dependencies = []

    try:

        tree = ast.parse(file_content)

        for node in ast.walk(tree):

            if isinstance(node, ast.Import):

                for alias in node.names:

                    dependencies.append(alias.name)

            elif isinstance(node, ast.ImportFrom):

                if node.module:

                    dependencies.append(node.module)

    except Exception:
        pass

    return dependencies


# -----------------------------
# C / C++
# -----------------------------
def extract_c_dependencies(file_content):

    dependencies = []

    matches = re.findall(
        r'#include\s*"(.+?)"',
        file_content
    )

    for match in matches:

        dependencies.append(match)

    return dependencies


# -----------------------------
# Dispatcher
# -----------------------------
def extract_dependencies(file_content, filename):

    if filename.endswith((".js", ".jsx", ".ts", ".tsx")):

        return extract_js_dependencies(file_content)

    elif filename.endswith(".py"):

        return extract_python_dependencies(file_content)

    elif filename.endswith((".c", ".cpp", ".cc", ".cxx", ".h", ".hpp")):

        return extract_c_dependencies(file_content)

    return []