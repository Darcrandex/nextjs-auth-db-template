'use client'

import { resetPassword } from '@/actions/auth'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const sign = searchParams.get('sign') || ''

  const submitMutation = useMutation({
    mutationFn: async (data: { sign: string; newPassword: string }) => {
      await resetPassword(data.sign, data.newPassword)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const newPassword = form.get('newPassword')
    if (sign && newPassword) {
      submitMutation.mutate({ sign, newPassword: newPassword.toString() })
    }
  }

  const disabled = !sign || submitMutation.isPending

  return (
    <section className="container mx-auto flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Reset Password</h1>

        {!sign && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            Invalid or expired sign.
          </div>
        )}

        {submitMutation.error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {(submitMutation.error as Error).message}
          </div>
        )}

        {submitMutation.isSuccess && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            <span>Password reset successfully, </span>
            <Link href="/sign-in" className="mx-2 font-medium text-sky-500 underline">
              Sign In
            </Link>
            <span>again.</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} aria-busy={submitMutation.isPending}>
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitMutation.isPending ? 'loading...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </section>
  )
}
