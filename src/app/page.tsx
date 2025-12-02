import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="mt-10 text-center text-3xl font-bold text-sky-500">nextjs Auth DB Template</h1>

      <p className="m-10">
        <Link href="/admin" className="text-sky-500 underline">
          To Admin
        </Link>
      </p>
    </>
  )
}
