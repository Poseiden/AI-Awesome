// core/enhanced-context/builder.ts

import { EnhancedContext } from './schema'

export class EnhancedContextBuilder {
  private context: EnhancedContext

  constructor() {
    this.context = {
      system: { role: 'assistant' },
      task: { intent: '' },
      user: { input: '' },
      knowledge: [],
      memory: [],
      constraints: {}
    }
  }

  //EnhancedContextBuilder
  //├─ withSystemRole()
  //├─ withTaskIntent()
  //├─ withUserInput()
  //├─ addKnowledge()
  //├─ addMemory()
  //├─ withConstraints()
  //└─ build()

  withSystemRole(role: string) {
    this.context.system.role = role
    return this
  }

  withTaskIntent(intent: string) {
    this.context.task.intent = intent
    return this;
  }

  withUserInput(input:string, metadata?:Record<string, any>) {
    this.context.user = { input, metadata }
    return this
  }
  withSuccessCriteria(criteria: string[]) {
    this.context.task.successCriteria = criteria
    return this
  }

  withSystemPolicies(policies: string[]) {
    this.context.system.policies = policies
    return this
  }

  addKnowledge(item: {
    source: string,
    content: string,
    score?: number
  }) {
    this.context.knowledge?.push(item)
    return this
  }

  addMemory(type: 'short'|'long', content:string) {
    this.context.memory?.push({type, content})
    return this
  }

  withConstraints(constraints: Partial<EnhancedContext['constraints']>) {
    this.context.constraints = {
      ...this.context.constraints,
      ...constraints
    }
    return this
  }

  build(): EnhancedContext {
    this.validate()
    return this.context
  }

  private validate() {
    if (!this.context.task.intent) {
      throw new Error('Task intent is required')
    }

    if (!this.context.user.input) {
      throw new Error('User input is required')
    }
  }
}