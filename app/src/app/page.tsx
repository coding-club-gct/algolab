import Appbar from "@/components/appbar";
import { Button } from "@mui/material";
import Link from "next/link";

const navItems = [
  {
    label: "play",
  },
  {
    label: "practice",
  },
];

export default function Home() {
  return (
    <>
      <Appbar>
        <div className="w-full h-full flex justify-end py-2 gap-2">
          {navItems.map(({ label }) => (
            <Link href={label}>
              <Button className="capitalize"> {label} </Button>
            </Link>
          ))}
        </div>
      </Appbar>
    </>
  );
}
