import { directusURL } from "@/constants";
import { ProblemsList } from "./(components)/problems-list";

export default async function Practice() {
  const { data }: { data: Problems } = await fetch(`${directusURL}/items/problems?fields=*.*.*`).then((res) => res.json());
  return <ProblemsList data={data} />;
}
