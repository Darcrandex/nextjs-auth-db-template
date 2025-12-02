'use client'
import { userSignUp } from '@/actions/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()
  const submitMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await userSignUp(data)
    },
    onSuccess: () => {
      router.replace('/sign-in')
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = form.get('email')
    const password = form.get('password')
    if (email && password) {
      submitMutation.mutate({ email: email.toString(), password: password.toString() })
    }
  }

  return (
    <section className="container mx-auto flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Sign Up</h1>

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

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitMutation.isPending ? 'loading...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  )
}
