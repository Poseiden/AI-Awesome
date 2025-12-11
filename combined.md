```mermaid
flowchart TB
    %% ========== 顶层：用户与应用 ==========
    User([用户]) --> AppUI[应用层\n(Web / App / Chat Interface)]

    AppUI --> ReqHandler[请求处理层\n(Session / Auth / Routing)]
    ReqHandler --> PromptLayer[Prompt 构建层\n(Task / Context / Reference / Format / Thought)]

    %% ========== Prompt Engineering 能力模块 ==========
    subgraph PromptEngineering[Prompt 工程能力体系]
        direction TB
        PE_Task[🔹 Task Design\n任务定义]
        PE_Context[🔹 Context Engineering\n上下文构造]
        PE_Reference[🔹 Reference Injection\n示例设计 Few-shot]
        PE_Format[🔹 Output Format\n结构化输出 JSON]
        PE_Reasoning[🔹 Thought Strategy\nCoT / ToT / Self-Consistency]
    end

    PromptLayer -. 使用能力模块 .-> PromptEngineering

    %% ========== RAG 扩展 ==========
    PromptLayer --> RAG

    subgraph RAG[RAG（检索增强生成）]
        direction TB
        Retriever[🔹 检索器\nBM25 / Dense]
        VectorDB[🔹 向量库\nFAISS / Milvus]
        Chunking[🔹 文本切分\nChunking / Embedding]
        Reranker[🔹 重排序\nCross-Encoder]
    end

    RAG --> EnhancedContext[检索结果\n增强后的上下文]

    %% ========== 推理层 ==========
    EnhancedContext --> LLMInference[LLM 推理层\n(OpenAI, Qwen, Llama, vLLM)]
    PromptLayer --> LLMInference

    subgraph InferenceDetail[推理能力体系]
        direction TB
        vllm[🔹 vLLM / PagedAttention]
        Quant[🔹 量化\nQ4 / GGUF]
        Cache[🔹 KV Cache]
        Parallel[🔹 推理并行]
    end

    LLMInference -. 使用能力 .-> InferenceDetail

    %% ========== Agents & Tools ==========
    LLMInference --> AgentLayer[Agent / ToolChain 层]

    subgraph AgentSystem[Agent 工程能力]
        direction TB
        ToolDesign[🔹 工具设计\nSearch / DB / API 调用]
        Routing[🔹 Agent Routing\nReAct / MRKL]
        Planning[🔹 Plan & Execute\n任务拆解]
    end

    AgentLayer -. 使用能力 .-> AgentSystem

    AgentLayer --> ExternalTools[外部工具\nAPI / DB / Services]

    %% ========== 输出与评估 ==========
    AgentLayer --> Output[输出生成]
    Output --> Evaluation

    subgraph EvalSystem[评估体系]
        direction TB
        EvalHuman[🔹 人类评估\n标注 / 评分]
        EvalLLM[🔹 LLM 评估\nRubric / Judge Model]
        EvalAuto[🔹 自动化评估\n回归测试 / Benchmarks]
    end

    Evaluation([评估与反馈]) -.-> PromptLayer

    %% ========== 能力体系（全局） ==========
    subgraph SkillTree[AI 工程师能力全景图]
        direction LR
        ST_Prompt[🟦 Prompt Engineering]
        ST_RAG[🟩 RAG Pipeline]
        ST_Agent[🟨 Agents & Tools]
        ST_Inference[🟧 LLM 推理与优化]
        ST_Engineering[🟥 工程化：API / 流程 / Observability]
    end

    %% 将能力体系映射到模块
    PromptEngineering -. 属于 .-> ST_Prompt
    RAG -. 属于 .-> ST_RAG
    AgentSystem -. 属于 .-> ST_Agent
    InferenceDetail -. 属于 .-> ST_Inference
    ReqHandler -. 属于 .-> ST_Engineering
```
