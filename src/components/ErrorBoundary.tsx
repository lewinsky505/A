/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { children } = (this as any).props;
    if (this.state.hasError) {
      let errorDetails = '';
      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          errorDetails = JSON.stringify(parsed, null, 2);
        }
      } catch (e) {
        errorDetails = this.state.error?.message || 'Unknown error';
      }

      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/30">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-blue-200/50 mb-8 max-w-md">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          
          {errorDetails && (
            <pre className="bg-black/50 p-4 rounded-xl text-xs text-red-400 text-left max-w-lg w-full overflow-auto mb-8 border border-white/5">
              {errorDetails}
            </pre>
          )}

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold hover:bg-blue-50 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh App
          </button>
        </div>
      );
    }

    return children;
  }
}
