import { redirect } from "next/navigation";

export default function Home() {
  redirect('/job-listings');

  return <></>;
}
