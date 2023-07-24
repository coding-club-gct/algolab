"use client";

import { CatppuccinContext } from "@/context/catppuccin";
import Editor from "@/components/editor";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "./styles.css";
export const ProblemsList = ({ data }: { data: Problems }) => {
  const catppuccinColor = useContext(CatppuccinContext);
  const [currentProblem, setCurrentProblem] = useState(data[0]);
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
  return (
    <div className="flex h-screen">
      <div className="w-[calc(100%-33.333%-150px)]">
        <Editor problem={currentProblem} />
      </div>
      <div className="w-1/3 h-full">
        <span style={{ background: catppuccinColor.mantle }} className="my-0 px-4 h-[calc(3rem-2px)] leading-[calc(3rem-2px)] inline-flex items-center">
          Description
        </span>
        <hr style={{ background: catppuccinColor.mantle }} className="my-0 border-0 h-[2px]" />
        <div className="h-[calc(100%-3rem-2px)] overflow-y-auto scrollbar-none px-4">
          <ReactQuill className="w-full h-full" theme="snow" value={currentProblem.description} onChange={() => {}} readOnly={true} />
        </div>
      </div>
      <div className="w-[150px] h-full overflow-y-auto scrollbar-none" style={{ background: catppuccinColor.mantle }}>
        {data.map(({ id, name }, key) => (
          <p
            key={key}
            onClick={() => setCurrentProblem(data.find(({ id: _id }) => id === _id)!)}
            style={{ background: id === currentProblem.id ? catppuccinColor.base : undefined, color: id === currentProblem.id ? catppuccinColor.text : catppuccinColor.subtext0 }}
            className="p-4 m-0 text-sm cursor-pointer"
          >
            {name}
          </p>
        ))}
      </div>
    </div>
  );
};
