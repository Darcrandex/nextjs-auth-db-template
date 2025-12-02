'use client'

import { getUserInfo, userSignOut } from '@/actions/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const router = useRouter()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user', 'info'],
    queryFn: () => getUserInfo(),
  })

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await userSignOut()
    },
    onSuccess: () => {
      router.replace('/')
    },
  })

  if (isLoading) {
    return <p className="m-10 text-center text-2xl font-bold text-gray-800">Loading...</p>
  }

  if (isError) {
    return (
      <>
        <p className="m-10 text-center text-2xl font-bold text-gray-800">Error loading user info</p>

        <footer className="flex justify-center gap-6">
          <button
            className="mt-4 inline-block rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none"
            onClick={() => router.replace('/')}
          >
            Go to Home
          </button>

          <button
            className="mt-4 inline-block rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none"
            onClick={() => router.replace('/sign-in')}
          >
            Sign In
          </button>
        </footer>
      </>
    )
  }

  return (
    <section className="container mx-auto">
      <h1 className="mt-10 text-center text-3xl font-bold text-sky-500">Admin</h1>

      <p>This is admin page</p>

      <h2 className="mt-4 mb-6 text-2xl font-bold text-gray-800">user info</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button
        className="mt-4 inline-block rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:outline-none"
        onClick={() => signOutMutation.mutate()}
      >
        Sign Out
      </button>
    </section>
  )
}
