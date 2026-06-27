import re


def analyze_metrics(code):

    function_patterns = [

        # function test() {}
        r'\bfunction\s+\w+\s*\(',

        # export default function App() {}
        r'export\s+default\s+function\s+\w+\s*\(',

         # async function fetchData() {}
         r'async\s+function\s+\w+\s*\(',

         # const App = () => {}
         r'\b(?:const|let|var)\s+\w+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>',

         # const App = async () => {}
         r'\b(?:const|let|var)\s+\w+\s*=\s*async\s*\([^)]*\)\s*=>'
         ]

    functions = 0

    for pattern in function_patterns:

        functions += len(
            re.findall(
                pattern,
                code
        )
    )

    classes = len(
        re.findall(
            r'\bclass\b',
            code
        )
    )

    imports = len(
        re.findall(
            r'\bimport\b',
            code
        )
    )

    exports = len(
        re.findall(
            r'\bexport\b',
            code
        )
    )

    complexity = 1

    complexity += len(
        re.findall(
            r'\bif\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\belse\s+if\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\bfor\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\bwhile\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\bswitch\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\bcase\b',
            code
        )
    )

    complexity += len(
        re.findall(
            r'\bcatch\b',
            code
        )
    )

    complexity += code.count("&&")
    complexity += code.count("||")
    complexity += code.count("?")

    return {

        "functions": functions,

        "classes": classes,

        "imports": imports,

        "exports": exports,

        "complexity": complexity

    }