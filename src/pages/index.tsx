import { useRouter } from "next/router"
import { useEffect } from "react"

const Home = () => {
  const router = useRouter()
  useEffect(
    () => {
      router.replace('/presale')
    }
  )
  
  return <></>
}

export default Home
