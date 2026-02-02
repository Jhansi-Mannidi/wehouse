"use client"

export function TypographyShowcase() {
  return (
    <div className="space-y-8">
      {/* Headings */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Headings</h4>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Heading 1</h1>
            <span className="text-xs text-muted-foreground font-mono">text-4xl font-bold</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">Heading 2</h2>
            <span className="text-xs text-muted-foreground font-mono">text-3xl font-semibold</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h3 className="text-2xl font-semibold text-foreground">Heading 3</h3>
            <span className="text-xs text-muted-foreground font-mono">text-2xl font-semibold</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h4 className="text-xl font-semibold text-foreground">Heading 4</h4>
            <span className="text-xs text-muted-foreground font-mono">text-xl font-semibold</span>
          </div>
          <div className="flex items-baseline justify-between">
            <h5 className="text-lg font-medium text-foreground">Heading 5</h5>
            <span className="text-xs text-muted-foreground font-mono">text-lg font-medium</span>
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Body Text</h4>
        <div className="space-y-4">
          <div className="border-b border-border pb-4">
            <p className="text-base leading-relaxed text-foreground">
              Body text (base) - The quick brown fox jumps over the lazy dog. This is the standard body text used throughout the Wehouse platform for descriptions, paragraphs, and general content.
            </p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-base leading-relaxed</span>
          </div>
          <div className="border-b border-border pb-4">
            <p className="text-sm leading-relaxed text-foreground">
              Small text - Used for secondary information, captions, and helper text throughout the interface.
            </p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-sm leading-relaxed</span>
          </div>
          <div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Extra small - Labels, timestamps, and metadata. Also used for input helper text.
            </p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-xs text-muted-foreground</span>
          </div>
        </div>
      </div>

      {/* Display Numbers */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Display Numbers (KPIs)</h4>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="text-center">
            <p className="text-5xl font-bold tabular-nums text-foreground">355</p>
            <p className="mt-1 text-xs text-muted-foreground">Total Partners</p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-5xl font-bold</span>
          </div>
          <div className="text-center">
            <p className="text-4xl font-semibold tabular-nums text-foreground">499</p>
            <p className="mt-1 text-xs text-muted-foreground">Skilled Workers</p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-4xl font-semibold</span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-semibold tabular-nums text-foreground">93</p>
            <p className="mt-1 text-xs text-muted-foreground">Architects</p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-3xl font-semibold</span>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium tabular-nums text-foreground">78%</p>
            <p className="mt-1 text-xs text-muted-foreground">Target Achieved</p>
            <span className="mt-2 block text-xs text-muted-foreground font-mono">text-2xl font-medium</span>
          </div>
        </div>
      </div>

      {/* Monospace */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h4 className="mb-6 text-sm font-medium text-muted-foreground">Monospace (Code & Data)</h4>
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <code className="font-mono text-sm text-foreground">
              PROJECT_ID: WH-2024-001234
            </code>
          </div>
          <div className="rounded-md bg-muted p-4">
            <code className="font-mono text-sm text-foreground">
              Phone: +91 98765 43210
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
