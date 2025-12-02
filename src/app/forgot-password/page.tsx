'use client'

import { sendResetPasswordEmail } from '@/actions/auth'
import { useMutation } from '@tanstack/react-query'

export default function ForgotPassword() {
  const submitMutation = useMutation({
    mutationFn: async (email: string) => {
      await sendResetPasswordEmail(email)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    if (email) {
      submitMutation.mutate(email.toString())
    }
  }

  return (
    <section className="container mx-auto flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Forgot Password</h1>

        {submitMutation.error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {(submitMutation.error as Error).message}
          </div>
        )}

        {submitMutation.isSuccess && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            Email sent, please check your inbox for the reset link.
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} aria-busy={submitMutation.isPending}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitMutation.isPending ? 'Sending…' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </section>
  )
}
