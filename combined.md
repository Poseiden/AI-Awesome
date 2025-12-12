```mermaid
flowchart TB

  %% Top: User and App
  User[User] --> AppUI
  AppUI[App Layer]

  %% Request and Prompt
  AppUI --> ReqHandler
  ReqHandler[Request Handler] --> PromptLayer
  PromptLayer[Prompt Builder]

  %% Prompt Engineering
  subgraph PromptEngine[Prompt Engineering]
    PE_Task[Task Design]
    PE_Context[Context Setup]
    PE_Ref[Examples]
    PE_Format[Output Format]
    PE_Reason[Reasoning Style]
  end
  PromptLayer -. uses .-> PromptEngine
  PromptLayer --> EnhancedContext[Enhanced Context]

  %% RAG
  RAGLayer[RAGLayer]
  PromptLayer --> RAGLayer
  RAGLayer -. uses .-> RAG
  subgraph RAG[RAG]
    Rag_Retriever[Retriever]
    Rag_VectorDB[Vector DB]
    Rag_Chunk[Chunking]
    Rag_Rerank[Reranker]
    Rag_Embedding[Embedding]
  end
  RAGLayer --> EnhancedContext[Enhanced Context]

  %% Inference
  EnhancedContext --> LLM
  LLM[LLM Inference]

  subgraph InferenceSys[Inference System]
    Inf_vllm[vLLM]
    Inf_Quant[Quantization]
    Inf_Cache[KV Cache]
    Inf_Parallel[Parallel Exec]
  end
  LLM -. uses .-> InferenceSys

  %% Agents and Tools
  LLM --> AgentLayer
  AgentLayer[Agent Layer]

  subgraph AgentSys[Agent System]
    Agent_ToolDesign[Tool Design]
    Agent_Routing[Routing]
    Agent_Planning[Planning]
  end
  AgentLayer -. uses .-> AgentSys

  AgentLayer --> Tools[External Tools]

  %% Output
  AgentLayer --> Output
  Output[Output] --> Eval

  subgraph EvalSys[Evaluation]
    Eval_Human[Human Eval]
    Eval_Model[Model Eval]
    Eval_Auto[Auto Tests]
  end

  Eval[Evaluation] -. feedback .-> PromptLayer

  %% Skill Map
  subgraph SkillMap[Skill Map]
    Skill_Eng[Engineering]
    Skill_Prompt[Prompt Eng]
    Skill_RAG[RAG]
    Skill_Infer[Inference]
    Skill_Agent[Agents]
  end

  PromptEngine -. maps .-> Skill_Prompt
  RAG -. maps .-> Skill_RAG
  AgentSys -. maps .-> Skill_Agent
  InferenceSys -. maps .-> Skill_Infer
  ReqHandler -. maps .-> Skill_Eng
  ```
