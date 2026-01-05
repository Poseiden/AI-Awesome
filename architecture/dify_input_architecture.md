## Dify Input Mermaid

**以下是基于Dify三层输入架构的Mermaid图，展示了Workflow变量层、LLM Message组装层和模型内部推理层的数据流向及可见性：**

```
graph TD
    A[Workflow变量层] -->|包含sys.query<br>sys.files<br>workflow/user| B[LLM Message组装层]
    B -->|拼装system/assistant/user消息<br>包含retrieval结果| C[模型内部推理层]
    C -->|生成回答并可能引用KB| D[输出结果]

    subgraph Debug可见部分
        A
    end

    subgraph 隐藏部分
        B
        C
    end
 
```