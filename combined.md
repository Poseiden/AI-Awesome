```mermaid
flowchart TB
    %% ========== 顶层：用户与应用 ==========
    User[用户<br/>Human] --> AppUI[应用层<br/>Web / App / Chat Interface]

    AppUI --> ReqHandler[请求处理层<br/>Session / Auth / Routing]
    ReqHandler --> PromptLayer[Prompt 构建层<br/>Task / Context / Reference / Format / Thought]

    %% ========== Prompt Engineering 能力模块 ==========
    subgraph PromptEngineering[Prompt 工程能力体系]
        direction TB
        PE_Task[🔹 Task Design<br/>任务定义]
        PE_Context[🔹 Context Engineering<br/>上下文构造]
        PE_Reference[🔹 Reference Injection<br/>示例设计 Few-shot]
        PE_Format[🔹 Output Format<br/>结构化输出 JSON]
        PE_Reasoning[🔹 Thought Strategy<br/>CoT / ToT / Self-Consistency]
    end

    PromptLayer -. 使用能力模块 .-> PromptEngineering

    %% ========== RAG 扩展 ==========
    PromptLayer --> RAG

    subgraph RAG[RAG（检索增强生成）]
        direction TB
        Retriever[🔹 检索器<br/>BM25 / Dense]
        VectorDB[🔹 向量库<br/>FAISS / Milvus]
        Chunking[🔹 文本切分<br/>Chunking / Embedding]
        Reranker[🔹 重排序<br/>Cross-Encoder]
    end

    RAG --> EnhancedContext[检索结果<br/>增强后的上下文]

    %% ========== 推理层 ==========
    EnhancedContext --> LLMInference[LLM 推理层<br/>OpenAI / Qwen / Llama / vLLM]
    PromptLayer --> LLMInference

    subgraph InferenceDetail[推理能力体系]
        direction TB
        vllm[🔹 vLLM / PagedAttention]
        Quant[🔹 量化<br/>Q4 / GGUF]
        Cache[🔹 KV Cache]
        Parallel[🔹 推理并行]
    end

    LLMInference -. 使用能力 .-> InferenceDetail

    %% ========== Agents & Tools ==========
    LLMInference --> AgentLayer[Agent / ToolChain 层]

    subgraph AgentSystem[Agent 工程能力]
        direction TB
        ToolDesign[🔹 工具设计<br/>Search / DB / API 调用]
        Routing[🔹 Agent Routing<br/>ReAct / MRKL]
        Planning[🔹 Plan & Execute<br/>任务拆解]
    end

    AgentLayer -. 使用能力 .-> AgentSystem

    AgentLayer --> ExternalTools[外部工具<br/>API / DB / Services]

    %% ========== 输出与评估 ==========
    AgentLayer --> Output[输出生成]
    Output --> Evaluation

    subgraph EvalSystem[评估体系]
        direction TB
        EvalHuman[🔹 人类评估<br/>标注 / 评分]
        EvalLLM[🔹 LLM 评估<br/>Rubric / Judge Model]
        EvalAuto[🔹 自动化评估<br/>回归测试 / Bench
```
