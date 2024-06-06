import { ParserOptions, Printer } from 'prettier'

export interface TransformerMetadata {
  // Default customizations for a given transformer
  staticAttrs?: string[]
  dynamicAttrs?: string[]
  functions?: string[]
}

export interface Customizations {
  functions: Set<string>
  staticAttrs: Set<string>
  dynamicAttrs: Set<string>
}

export interface TransformerContext {
  env: TransformerEnv
  changes: StringChange[]
}

export interface LegacyTailwindContext {
  tailwindConfig: {
    prefix: string | ((selector: string) => string)
  }

  getClassOrder?: (classList: string[]) => [string, bigint | null][]

  layerOrder: {
    components: bigint
  }
}

export interface TransformerEnv {
  context: LegacyTailwindContext
  customizations: Customizations
  generateRules: (
    classes: Iterable<string>,
    context: LegacyTailwindContext,
  ) => [bigint][]
  parsers: any
  options: ParserOptions
}

export interface ContextContainer {
  context: any
  generateRules: () => any
}

export interface InternalOptions {
  printer: Printer<any>
}

export interface InternalPlugin {
  name?: string
}

declare module 'prettier' {
  interface RequiredOptions extends InternalOptions {}
  interface ParserOptions extends InternalOptions {}
  interface Plugin<T = any> extends InternalPlugin {}
}

export interface StringChange {
  start: number
  end: number
  before: string
  after: string
}
