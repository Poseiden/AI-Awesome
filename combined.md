```mermaid
flowchart TB
  %% Top: User and App
  User --> AppUI
  User[User / Human]
  AppUI[Application Layer (Web App / Chat)]

  %% Request handling and prompt layer
  AppUI --> ReqHandler
  ReqHandler[Request Handler (Session Auth Routing)] --> PromptLayer
  PromptLayer[Prompt Build Layer (Task Context Examples Format Reasoning)]

  %% Prompt engineering capability block
  subgraph PromptEngineering [Prompt Engineering Capabilities]
    PE_Task[Task Design]
    PE_Context[Context Engineering]
    PE_Reference[Reference Injection]
    PE_Format[Output Format]
    PE_Reasoning[Reasoning Strategies]
  end
  PromptLayer -. uses .-> PromptEngineering

  %% RAG block
  PromptLayer --> RAG
  subgraph RAG [RAG - Retrieval Augmented Generation]
    Retriever[Retriever (BM25 or Dense)]
    VectorDB[Vector DB (FAISS Milvus)]
    Chunking[Chunking & Embedding]
    Reranker[Reranker (Cross-Encoder)]
  end
  RAG --> EnhancedContext[Enhanced Context]

  %% Inference layer
  EnhancedContext --> LLMInference
  PromptLayer --> LLMInference
  LLMInference[LLM Inference (Llama Qwen GPT vLLM)]

  subgraph InferenceDetails [Inference Capabilities]
    vllm[PagedAttention / vLLM]
    Quant[Quantization / Q4 GGUF]
    Cache[KV Cache]
    Parallel[Parallel Inference]
  end
  LLMInference -. uses .-> InferenceDetails

  %% Agents and tools
  LLMInference --> AgentLayer
  AgentLayer[Agent and ToolChain Layer]

  subgraph AgentSystem [Agent Engineering]
    ToolDesign[Tool Design (Search DB API)]
    Routing[Agent Routing Patterns]
    Planning[Plan and Execute]
  end
  AgentLayer -. uses .-> AgentSystem
  AgentLayer --> ExternalTools[External Tools and Services]

  %% Output and evaluation
  AgentLayer --> Output
  Output[Generated Output (Answer Action Report)] --> Evaluation
  subgraph EvalSystem [Evaluation System]
    EvalHuman[Human Evaluation]
    EvalLLM[Model-as-Judge Evaluation]
    EvalAuto[Automated Tests and Benchmarks]
  end
  Evaluation[Evaluation and Feedback] -.-> PromptLayer

  %% Skill mapping
  subgraph SkillTree [Engineer Skill Map]
    ST_Prompt[Prompt Engineering]
    ST_RAG[RAG Pipeline]
    ST_Agent[Agents and Tools]
    ST_Inference[LLM Inference Optimization]
    ST_Engineering[Engineering: API Observability]
  end

  PromptEngineering -. maps to .-> ST_Prompt
  RAG -. maps to .-> ST_RAG
  AgentSystem -. maps to .-> ST_Agent
  InferenceDetails -. maps to .-> ST_Inference
  ReqHandler -. maps to .-> ST_Engineering
```
