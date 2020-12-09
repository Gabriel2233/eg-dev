import { useRouter } from "next/router";

export default function UserProfile() {
  const { query } = useRouter();

  return <h1>{query.uid}</h1>;
}
