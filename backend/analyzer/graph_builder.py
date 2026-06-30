import os

from analyzer.cycle_detector import find_cycles
from analyzer.dependency_parser import extract_dependencies
from analyzer.file_classifier import classify_file
from analyzer.metrics import analyze_metrics

SUPPORTED_EXTENSIONS = (
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".cc",
    ".cxx",
    ".c",
    ".h",
    ".hpp",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
    ".swift",
    ".kt",
)


def build_graph(repo_path):
    nodes = []
    edges = []
    node_ids = set()

    # PASS 1: Collect all nodes first
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [
            d
            for d in dirs
            if d
            not in ["node_modules", "dist", ".git", "venv", "__pycache__"]
        ]

        for file in files:
            if not file.endswith(SUPPORTED_EXTENSIONS):
                continue

            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, repo_path)
            relative_path = relative_path.replace("\\", "/")

            # Read file + calculate metrics
            try:
                with open(
                    full_path, "r", encoding="utf-8", errors="ignore"
                ) as f:
                    code = f.read()

                loc = len(code.splitlines())
                metrics = analyze_metrics(code)

            except Exception:
                loc = 0
                metrics = {
                    "functions": 0,
                    "classes": 0,
                    "imports": 0,
                    "exports": 0,
                    "complexity": 0,
                }

            nodes.append(
                {
                    "id": relative_path,
                    "data": {
                        "label": file,
                        "type": classify_file(relative_path),
                        "loc": loc,
                        "functions": metrics["functions"],
                        "classes": metrics["classes"],
                        "imports": metrics["imports"],
                        "exports": metrics["exports"],
                        "complexity": metrics["complexity"],
                    },
                }
            )
            node_ids.add(relative_path)

    # PASS 2: Build edges
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [
            d
            for d in dirs
            if d
            not in ["node_modules", "dist", ".git", "venv", "__pycache__"]
        ]

        for file in files:
            if not file.endswith(SUPPORTED_EXTENSIONS):
                continue

            full_path = os.path.join(root, file)
            relative_path = os.path.relpath(full_path, repo_path)
            relative_path = relative_path.replace("\\", "/")

            try:
                with open(
                    full_path, "r", encoding="utf-8", errors="ignore"
                ) as f:
                    content = f.read()

                dependencies = extract_dependencies(content, file)

                for dep in dependencies:
                    # -----------------------
                    # Python
                    # -----------------------
                    if file.endswith(".py"):
                        target_path = dep.replace(".", "/") + ".py"

                        if target_path not in node_ids:
                            matches = [
                                node
                                for node in node_ids
                                if node.endswith(target_path)
                            ]

                            if matches:
                                target_path = matches[0]
                            else:
                                continue

                    # -----------------------
                    # C / C++
                    # -----------------------
                    elif file.endswith(
                        (".c", ".cpp", ".cc", ".cxx", ".h", ".hpp")
                    ):
                        source_dir = os.path.dirname(relative_path)
                        target_path = os.path.normpath(
                            os.path.join(source_dir, dep)
                        )
                        target_path = target_path.replace("\\", "/")

                        if target_path not in node_ids:
                            matches = [
                                node
                                for node in node_ids
                                if node.endswith(dep)
                            ]

                            if matches:
                                target_path = matches[0]
                            else:
                                continue

                    # -----------------------
                    # JavaScript / TypeScript
                    # -----------------------
                    else:
                        source_dir = os.path.dirname(relative_path)
                        target_path = os.path.normpath(
                            os.path.join(source_dir, dep)
                        )
                        target_path = target_path.replace("\\", "/")

                        if not target_path.endswith(
                            (".js", ".jsx", ".ts", ".tsx")
                        ):
                            for ext in [".js", ".jsx", ".ts", ".tsx"]:
                                if target_path + ext in node_ids:
                                    target_path += ext
                                    break

                        if target_path not in node_ids:
                            continue

                    edges.append(
                        {
                            "source": relative_path,
                            "target": target_path,
                        }
                    )

            except Exception:
                pass

    cycles = find_cycles(edges)

    return {
        "total_nodes": len(nodes),
        "total_edges": len(edges),
        "nodes": nodes,
        "edges": edges,
        "cycles": cycles,
        "cycle_count": len(cycles),
    }


def scan_repository(path):
    print("Scanning path:", os.path.abspath(path))
    files = []

    for root, dirs, filenames in os.walk(path):
        print("ROOT =", root)
        print("DIRS =", dirs)
        print("FILES =", filenames)

        dirs[:] = [
            d
            for d in dirs
            if d
            not in [
                "venv",
                "__pycache__",
                ".git",
                "node_modules",
                "dist",
                "build",
            ]
        ]

        for file in filenames:
            relative_path = os.path.relpath(os.path.join(root, file), path)
            files.append(relative_path)

    return files