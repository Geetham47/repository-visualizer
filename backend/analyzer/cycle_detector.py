from collections import defaultdict


def find_cycles(edges):

    graph = defaultdict(list)

    for edge in edges:
        graph[edge["source"]].append(edge["target"])

    visited = set()
    stack = []
    cycles = []

    def dfs(node):

        visited.add(node)
        stack.append(node)

        for neighbor in graph[node]:

            if neighbor not in visited:

                dfs(neighbor)

            elif neighbor in stack:

                cycle = stack[
                    stack.index(neighbor):
                ] + [neighbor]

                if cycle not in cycles:
                    cycles.append(cycle)

        stack.pop()

    for node in list(graph.keys()):

     if node not in visited:
        dfs(node)

    return cycles