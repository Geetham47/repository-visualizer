import os

def scan_repository(path):
    print("Scanning path:", os.path.abspath(path))

    files = []

    for root, dirs, filenames in os.walk(path):
        print("ROOT =", root)
        print("DIRS =", dirs)
        print("FILES =", filenames)

        dirs[:] = [
    d for d in dirs
    if d not in [
        "venv",
        "__pycache__",
        ".git",
        "node_modules",
        "dist",
        "build"
    ]
]

        for file in filenames:
            relative_path = os.path.relpath(
                os.path.join(root, file),
                path
            )

            files.append(relative_path)

    return files