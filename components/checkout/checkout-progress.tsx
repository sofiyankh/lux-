"use client"

import { Check } from "lucide-react"

export interface CheckoutStep {
  id: string
  title: string
  description: string
}

export interface CheckoutProgressProps {
  steps: CheckoutStep[]
  currentStep: number
  className?: string
}

export function CheckoutProgress({ steps, currentStep, className }: CheckoutProgressProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-brand-accent border-brand-accent text-white"
                        : isCurrent
                          ? "bg-white border-brand-accent text-brand-accent"
                          : "bg-white border-brand-light text-brand-muted"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-brand-accent" : isCompleted ? "text-brand-primary" : "text-brand-muted"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-brand-muted">{step.description}</p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-all duration-200 ${
                      isCompleted ? "bg-brand-accent" : "bg-brand-light"
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
