// Simulate Layer to call enhancedContext
import { EnhancedContextBuilder } from './builder'

const builder = new EnhancedContextBuilder()

const context = builder
  // ===== Prompt Layer =====
  .withSystemRole('AI assistant for technical architecture review')
  .withSystemPolicies([
    'Be precise',
    'Avoid hallucination',
    'Explain reasoning clearly'
  ])
  .withTaskIntent('Review an AI system architecture diagram')
  .withSuccessCriteria([
    'Identify architectural issues',
    'Provide improvement suggestions'
  ])
  .withUserInput(
    'Please review my LLM system mermaid diagram and give feedback',
    { locale: 'zh-CN' }
  )

  // ===== RAG Layer =====
  .addKnowledge({
    source: 'internal-doc:llm-architecture',
    content:
      'EnhancedContext should be the single source of truth for LLM input',
    score: 0.92
  })
  .addKnowledge({
    source: 'paper:RAG-2023',
    content:
      'Retrieval augmented generation improves factual grounding',
    score: 0.87
  })

  // ===== Agent Layer =====
  .addMemory(
    'short',
    'User prefers detailed, engineering-oriented explanations'
  )
  .addMemory(
    'long',
    'User is designing a modular LLM platform'
  )

  // ===== Guardrails =====
  .withConstraints({
    outputFormat: 'markdown',
    safetyLevel: 'medium',
    lengthLimit: 800
  })

  // ===== Finalize =====
  .build()

console.log(JSON.stringify(context, null, 2))