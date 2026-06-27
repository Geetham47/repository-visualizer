from fastapi import FastAPI
from analyzer.scanner import scan_repository
from analyzer.dependency_parser import extract_js_dependencies
from analyzer.graph_builder import build_graph
from fastapi.middleware.cors import CORSMiddleware
from analyzer.ai_service import ai_analyze

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Repository Visualizer Backend Running"
    }


from fastapi import FastAPI
from analyzer.scanner import scan_repository

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Repository Visualizer Backend Running"
    }


@app.get("/scan")
def scan(path: str):

    files = scan_repository(path)

    return {
        "total_files": len(files),
        "files": files
    }
@app.get("/test-parser")
def test_parser():

    with open(
        "C:/Users/geeth/Documents/CIG_DEV_PS/server/server.js",
        "r",
        encoding="utf-8"
    ) as f:
        content = f.read()

    dependencies = extract_js_dependencies(content)

    return {
        "dependencies": dependencies
    }
@app.get("/graph")
def graph(path: str):

    return build_graph(path)
@app.get("/ai")
def ai(path: str, repo_path: str, mode: str):

    import os

    full_path = os.path.join(
        repo_path,
        path
    )

    summary = ai_analyze(
    full_path,
    mode
)

    return {
        "summary": summary
    }