"use client";

import { CatppuccinContext } from "@/context/catppuccin";
import Editor from "@/components/editor";
import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Tab, Tabs } from "@mui/material";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p> Loading please wait... </p>
})

export const ProblemsList = ({ data }: { data: Problems }) => {
  const catppuccinColor = useContext(CatppuccinContext);
  const [currentProblem, setCurrentProblem] = useState(data[0]);
  const [tabVal, setTabVal] = useState(0)
  useEffect(() => {
    const quill = document.getElementsByClassName("quill")[0];
    const codeTags = quill.getElementsByTagName("code");
    Array.from(codeTags).forEach((codeTag) => {
      codeTag.style.background = catppuccinColor.base;
    });
    const preTags = quill.getElementsByTagName("pre");
    Array.from(preTags).forEach((preTag) => {
      preTag.style.background = catppuccinColor.mantle;
    });
  }, []);
  console.log(data);

  const Panel1 = () => <>
    <Editor problem={currentProblem} />
  </>

  const Panel2 = ({ mobile }: { mobile?: boolean }) => <>
    {!mobile && <span style={{ background: catppuccinColor.mantle }} className="my-0 px-4 h-12 leading-12 inline-flex items-center">
      Description
    </span>}
    <div style={{ background: catppuccinColor.mantle, height: mobile ? "100%" : undefined }} className="h-[calc(100%-3rem-2px)] overflow-y-auto scrollbar-none px-4">
      <ReactQuill className="w-full h-full" theme="snow" value={currentProblem.description} onChange={() => { }} readOnly={true} />
    </div>
  </>

  const Panel3 = ({ mobile }: { mobile?: boolean }) => <>
    {!mobile && <span className="h-12 leading-12 inline-flex items-center px-4"> Problems </span>}
    {data.map(({ id, name }, key) => (
      <p
        key={key}
        onClick={() => setCurrentProblem(data.find(({ id: _id }) => id === _id)!)}
        style={{ background: id === currentProblem.id ? catppuccinColor.mantle : undefined, color: id === currentProblem.id ? catppuccinColor.text : catppuccinColor.subtext0 }}
        className="p-4 m-0 text-sm cursor-pointer"
      >
        {name}
      </p>
    ))}
  </>

  return (
    <div>
      <div className="md:hidden">
        <Tabs value={tabVal} onChange={(e: React.SyntheticEvent, newTab: number) => setTabVal(newTab)}>
          <Tab className="w-1/3" sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Playground"></Tab>
          <Tab className="w-1/3" sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Description"></Tab>
          <Tab className="w-1/3" sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Problems"></Tab>
        </Tabs>
      </div>
      <div className="md:hidden h-[calc(100%-14px)]">
        {tabVal === 0 && <Panel1 />}
        {tabVal === 1 && <div className="h-full">
          <Panel2 mobile={true} />
        </div>}
        {tabVal === 2 && <Panel3 mobile={true} />}
      </div>
      <div className="hidden md:flex h-screen">
        <div className="md:w-[calc(100%-33.333%-150px)]">
          <Panel1 />
        </div>
        <div className="md:w-1/3 h-full">
          <Panel2 />
        </div>
        <div className="w-[150px] h-full overflow-y-auto scrollbar-none" style={{ background: catppuccinColor.crust }}>
          <Panel3 />
        </div>
      </div>
    </div>
  );
};
