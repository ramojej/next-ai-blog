import { useRouter } from 'next/router'

function RegError() {
  const router = useRouter()
  const errorMessage = router.query.error

  return (
    <div>
      <h1>Registration Error</h1>
      <p>{errorMessage}</p>
    </div>
  )
}

export default RegError
