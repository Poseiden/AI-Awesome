# chunking.py

from dataclasses import dataclass

@dataclass
class Chunk:
    id: str
    content: str
    source: str
    metadata: dict



def chunk_text(
    text: str,
    source: str,
    chunk_size: int = 300,
    overlap: int = 50
):
    chunks = []
    start = 0
    idx = 0

    while start < len(text):
        end = start + chunk_size
        content = text[start:end]

        chunks.append(
            Chunk(
                id=f"{source}-{idx}",
                content=content.strip(),
                source=source,
                metadata={
                    "start": start,
                    "end": end
                }
            )
        )

        start += chunk_size - overlap
        idx += 1

    return chunks



# run test code.

if __name__ == "__main__":
    sample = """
    RAG（Retrieval-Augmented Generation）是一种结合向量检索与生成模型的架构，
    通过从知识库检索相关内容提升模型输出质量。
    """

    chunks = chunk_text(sample, source="test")

    for c in chunks:
        print("---")
        print(f"id: {c.id}")
        print(c.content)