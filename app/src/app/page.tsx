import DarkModeSwitcher from "@/components/darkmodeSwitch";
import { Button, Container, Divider } from "@mui/material";
import Link from "next/link";
import Appbar from "./(components)/appbar";
import Features from "./(components)/features";
import { KawaiBroswer, KawaiGhost } from "./(components)/kawai";
import Header from "./(components)/header";

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
        <div className="w-full h-full flex justify-end py-2 gap-2 items-center">
          {navItems.map(({ label }) => (
            <Link href={label}>
              <Button className="capitalize font-medium text-lg"> {label} </Button>
            </Link>
          ))}
          <DarkModeSwitcher />
        </div>
      </Appbar>
      <Container className="flex flex-col md:flex-row [&>*]:w-full md:[&>*]:w-1/2 min-h-[calc(100vh-4rem)] gap-12">
        <div className="flex justify-center flex-col h-full">
          <Header />
          <Divider className="my-4" />
          <div className="flex items-center gap-4">
            <p className="text-3xl font-extrabold"> Learn Offline, <br /> Thrive Online! </p>
            <KawaiGhost />
          </div>
          <div className="flex flex-col my-4 md:flex-row gap-4 md:items-center">
            <KawaiBroswer />
            <p> "Introducing the Ultimate Code Learning Experience for the Hostel Dwellers! Say goodbye to unreliable internet connections and hello to uninterrupted coding brilliance." </p>
          </div>
          <Divider className="my-4" />
          <div className="w-full flex [&>*]:w-1/2 gap-4 p-4 mb-0">
            <div className="flex flex-col gap-4">
              <p className="m-0 font-bold h-16"> Join our discord server for coding assistance </p>
              <Button> Discord server </Button>
            </div>
            <div className="flex flex-col gap-4">
              <p className="m-0 font-bold h-16"> Interested in the project? </p>
              <Button> Developer docs </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <img className="h-[300px] object-contain" src="Programmer Illustration.svg" alt="" />
          <Features />
        </div>
      </Container>
    </>
  );
}
