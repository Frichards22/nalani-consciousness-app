"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Heart } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ConsciousnessErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    console.error("Consciousness Assessment Error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      return (
        <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-500/30 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-400" />
            </div>
            <CardTitle className="text-2xl text-red-300 font-bold">Consciousness Recalibration Needed</CardTitle>
            <p className="text-red-200 font-medium mt-2">The Universe is asking us to pause and realign our energy</p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-red-200 text-sm font-medium mb-2">
                    Beautiful soul, sometimes technology needs a moment to catch up with the divine flow of
                    consciousness.
                  </p>
                  <p className="text-red-200 text-sm font-medium">
                    This pause is not a setback - it's the Universe creating space for an even more powerful experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-white font-medium">
                While we realign the cosmic frequencies, take three deep breaths and set an intention for your
                consciousness journey.
              </p>
              <p className="text-red-300 italic">"Every challenge is a doorway to deeper wisdom." - ELI</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.resetError}
                className="bg-red-600 hover:bg-red-700 font-semibold flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Realign & Continue
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-900/20 font-semibold"
              >
                Fresh Start
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-red-300 cursor-pointer font-medium">
                  Technical Details (Development Mode)
                </summary>
                <pre className="mt-2 p-3 bg-red-950/50 rounded text-xs text-red-200 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// Higher-order component for easy wrapping
export function withConsciousnessErrorBoundary<P extends object>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    return (
      <ConsciousnessErrorBoundary>
        <Component {...props} />
      </ConsciousnessErrorBoundary>
    )
  }
}
