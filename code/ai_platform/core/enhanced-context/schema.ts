// core/enhanced-context/schema.ts

export interface EnhancedContext {
  /** 系统级约束：角色、边界、行为规范 */
  system: {
    role: string
    policies?: string[]
  }

  /** 当前任务的明确目标 */
  task: {
    intent: string
    successCriteria?: string[]
  }

  /** 用户输入（原始 or 轻处理） */
  user: {
    input: string
    metadata?: Record<string, any>
  }

  /** 外部知识（RAG / Tool / DB） */
  knowledge?: Array<{
    source: string
    content: string
    score?: number
  }>

  /** 可长期积累的状态（Memory） */
  memory?: Array<{
    type: 'short' | 'long'
    content: string
  }>

  /** 输出约束（格式 / 安全 / 风格） */
  constraints?: {
    outputFormat?: 'text' | 'json' | 'markdown'
    safetyLevel?: 'low' | 'medium' | 'high'
    lengthLimit?: number
  }
}