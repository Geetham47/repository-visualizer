import os


def classify_file(path):

    name = os.path.basename(path).lower()

    if name.endswith(".jsx"):
        return "component"

    if "route" in name:
        return "route"

    if "controller" in name:
        return "controller"

    if "service" in name:
        return "service"

    if "model" in name:
        return "model"

    if "util" in name or "helper" in name:
        return "utility"

    if "config" in name:
        return "config"

    return "file"