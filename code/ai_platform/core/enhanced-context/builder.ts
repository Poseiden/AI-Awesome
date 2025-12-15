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

  build(): EnhancedContext {
    // this.validate()
    return this.context
  }
}