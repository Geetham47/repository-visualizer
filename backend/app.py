from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

from analyzer.scanner import scan_repository
from analyzer.dependency_parser import extract_js_dependencies
from analyzer.graph_builder import build_graph
from analyzer.ai_service import ai_analyze

import os
import uuid
import zipfile
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


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


@app.post("/upload")
async def upload_repository(file: UploadFile = File(...)):
    if not file.filename.endswith(".zip"):
        return {
            "error": "Please upload a ZIP file."
        }

    repo_id = str(uuid.uuid4())
    repo_folder = os.path.join(
        UPLOAD_FOLDER,
        repo_id
    )

    os.makedirs(repo_folder, exist_ok=True)

    zip_path = os.path.join(
        repo_folder,
        file.filename
    )

    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(repo_folder)

    os.remove(zip_path)

    extracted_items = os.listdir(repo_folder)
    actual_repo_folder = repo_folder

    if len(extracted_items) == 1:
        extracted_path = os.path.join(
            repo_folder,
            extracted_items[0]
        )
        if os.path.isdir(extracted_path):
            actual_repo_folder = extracted_path

    graph = build_graph(actual_repo_folder)

    return {
        "repo_id": repo_id,
        "graph": graph
    }
@app.get("/repository")
def get_repository(repo_id: str):

    repo_folder = os.path.join(
        UPLOAD_FOLDER,
        repo_id
    )

    if not os.path.exists(repo_folder):
        return {
            "error": "Repository not found."
        }

    items = os.listdir(repo_folder)

    if len(items) == 1:

        nested = os.path.join(
            repo_folder,
            items[0]
        )

        if os.path.isdir(nested):
            repo_folder = nested

    graph = build_graph(repo_folder)

    return {
        "repo_id": repo_id,
        "graph": graph
    }

@app.get("/ai")
def ai(
    repo_id: str,
    path: str,
    mode: str
):
    repo_folder = os.path.join(
        UPLOAD_FOLDER,
        repo_id
    )

    items = os.listdir(repo_folder)

    if len(items) == 1:
        nested = os.path.join(
            repo_folder,
            items[0]
        )
        if os.path.isdir(nested):
            repo_folder = nested

    full_path = os.path.join(
        repo_folder,
        path
    )

    if not os.path.exists(full_path):
        return {
            "summary": "File not found."
        }

    summary = ai_analyze(
        full_path,
        mode
    )

    return {
        "summary": summary
    }


@app.get("/source")
def get_source(
    repo_id: str,
    path: str
):
    repo_folder = os.path.join(
        UPLOAD_FOLDER,
        repo_id
    )

    items = os.listdir(repo_folder)

    if len(items) == 1:
        nested = os.path.join(
            repo_folder,
            items[0]
        )
        if os.path.isdir(nested):
            repo_folder = nested

    full_path = os.path.join(
        repo_folder,
        path
    )

    if not os.path.exists(full_path):
        return PlainTextResponse(
            "File not found.",
            status_code=404
        )

    with open(
        full_path,
        "r",
        encoding="utf-8",
        errors="ignore"
    ) as f:
        content = f.read()

    return PlainTextResponse(content)