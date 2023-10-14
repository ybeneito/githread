import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthSession } from "@/lib/auth";


export default async function Home() {

  const session = await getAuthSession()
  return (
    <div>
      <h1>Home</h1>
      <p>
        {session ?  JSON.stringify(session, null, 2) : ""}
      </p>
    </div>
  )
}
