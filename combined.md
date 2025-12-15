## Combined Architecture

```mermaid
flowchart TB

  %% Top: User and App
  User[User] --> AppUI
  AppUI[App Layer]

  %% Request and Prompt
  AppUI --> ReqHandler
  ReqHandler[Request Handler] --> InputGuard
  InputGuard --> PromptLayer
  PromptLayer[Prompt Runtime/Builder]

  %% Prompt Engineering
  subgraph PromptEngine[Prompt Engineering]
    PE_Task[Task Design]
    PE_Context[Context Setup]
    PE_Ref[Examples]
    PE_Format[Output Format]
    PE_Reason[Reasoning Style]
  end
  PromptLayer -. uses .-> PromptEngine
  PromptLayer -. queries .-> RAGLayer
  PromptLayer --> EnhancedContext[Enhanced Context]

  %% RAG
  RAGLayer[RAGLayer]
  RAGLayer -. uses .-> RAG
  subgraph RAG[RAG]
    Rag_Retriever[Retriever]
    Rag_VectorDB[Vector DB]
    Rag_Chunk[Chunking]
    Rag_Rerank[Reranker]
    Rag_DocEmbedding[DocEmbedding]
    Rag_QueEmbedding[QueEmbedding]
  end

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
  EnhancedContext --> AgentLayer
  LLM <--> AgentLayer
  AgentLayer[Agent Layer]
  

  subgraph AgentSys[Agent System]
    Agent_ToolDesign[Tool Design]
    Agent_Routing[Routing]
    Agent_Planning[Planning]
    Agent_Memory[Memory]
  end
  AgentLayer -. uses .-> AgentSys
  AgentLayer --> Agent_Memory
  Agent_Memory --> AgentLayer
  AgentLayer --> EnhancedContext

  AgentLayer --> Tools[External Tools]
  Tools --> AgentLayer

  %% Output
  AgentLayer --> Output
  Output[Output] --> Eval
  Output --> OutputGuard[Output Guardrail]
  OutputGuard --> User

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
  PromptEngine -. maps .-> Skill_Eng
  RAG -. maps .-> Skill_RAG
  AgentSys -. maps .-> Skill_Agent
  InferenceSys -. maps .-> Skill_Infer
  ReqHandler -. maps .-> Skill_Eng
  ```

## ToDo
#### Fix
1. ~~PromptLayer 映射到Engineering ＋ Prompt~~
2. 在RAG中加入隐含链路（DocEmbedding，QueEmbedding）（***Optional***）
3. ~~修改LLM层和AgentLayer层的关系~~
4. ~~增加Memory~~
5. ~~加 Guardrail/Saftey~~
6. Agent Loop 细化成Planner/Executor/Memory
7. 给EnhancedContext 定义一个“结构契约（schema）”
8. 将这张图落地为代码结构（PromptBuilder/RAGService/AgentLoop）
