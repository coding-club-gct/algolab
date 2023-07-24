"use client";
import { DarkModeContext } from "@/context/darkmode";
import { Editor as MonacoEditor, useMonaco } from "@monaco-editor/react";
import { Button, Container, IconButton, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState, MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import themes from "../../monaco-themes/themelist.json";
import { CgCPlusPlus } from "react-icons/cg";
import { LiaJava, LiaPython } from "react-icons/lia";
import { DiJavascript1 } from "react-icons/di";
import { TbBrandGolang, TbBrandRust } from "react-icons/tb";
import { BsPlay } from "react-icons/bs";
import { judge0URL } from "@/constants";
import { CatppuccinContext } from "@/context/catppuccin";

const shouldAddNewLine = (arr: any[], i: number) => (arr.length && arr.length - i - 1 !== 0 ? "\n" : "");

function generateTestCases(problem: Problem, i: number): string {
  let text = "";
  console.log(problem);
  const currentParameters = problem.parameters.reduce<(number | number[])[]>((current, { parameters_id }) => {
    const { values } = parameters_id;
    return [...current, values[i]];
  }, []);
  currentParameters.forEach((currentParameter, j) => {
    if (Array.isArray(currentParameter)) {
      text += currentParameter.join(" ");
      text += shouldAddNewLine(currentParameters, j);
    } else {
      text += currentParameter;
      text += shouldAddNewLine(currentParameters, j);
    }
  });
  return text;
}

function timeAgo(epochTimestamp: number): string {
  const currentTime = Date.now();
  const secondsAgo = Math.floor((currentTime - epochTimestamp) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  }
}

const languages = [
  {
    Icon: CgCPlusPlus,
    language: "cpp",
    langDetail: "C++ (GCC 9.2.0)",
  },
  {
    Icon: LiaJava,
    language: "java",
    langDetail: "Java (OpenJDK 13.0.1)",
  },
  {
    Icon: LiaPython,
    language: "python",
    langDetail: "Python (3.8.1)",
  },
  {
    Icon: DiJavascript1,
    language: "javascript",
    langDetail: "JavaScript (Node.js 12.14.0)",
  },
  {
    Icon: TbBrandRust,
    language: "rust",
    langDetail: "Rust (1.40.0)",
  },
  {
    Icon: TbBrandGolang,
    language: "go",
    langDetail: "Go (1.13.5)",
  },
];

const SubmissionBox = ({ langName, time, status, current }: { langName: string; time: number; status: string; current: boolean }) => {
  const { Icon, language } = languages.find(({ language }) => language === langName)!;
  const catppuccinColor = useContext(CatppuccinContext);
  return (
    <div style={{ background: current ? catppuccinColor.base : catppuccinColor.mantle, borderColor: catppuccinColor.text }} className="p-4 cursor-pointer w-full border-0 border-b-[1px] border-solid flex flex-col gap">
      <div className="flex gap-2 items-center my-0 py-0 [&>*]:my-0">
        <Icon size="1.5rem"></Icon>
        <p className="capitalize">{language}</p>
      </div>
      <div>
        <p color={catppuccinColor.subtext1} className="my-0 text-sm">
          {timeAgo(time)}
        </p>
        <p color={catppuccinColor.subtext1} className="my-0 text-sm">
          {status}
        </p>
      </div>
    </div>
  );
};

export default function Editor({ problem }: { problem?: Problem }) {
  const catppuccinColor = useContext(CatppuccinContext);
  const monaco = useMonaco();
  const [val, setVal] = useState("print('Hello world')");
  const [stdin, setStdin] = useState("");
  const [lang, setLang] = useState(languages[2]);
  const { darkMode } = useContext(DarkModeContext);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [tab, setTab] = useState(0);
  const [supportedLangs, setSupportedLangs] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const [theme, setTheme] = useState<{
    themeName: string;
    fileName: string;
    theme: any;
  }>(
    darkMode
      ? {
          themeName: "drakula",
          fileName: "Dracula",
          theme: require("../../monaco-themes/Dracula.json"),
        }
      : {
          themeName: "github-light",
          fileName: "GitHub Light",
          theme: require("../../monaco-themes/GitHub Light.json"),
        }
  );
  const [background, setBackground] = useState(theme.theme.colors["editor.background"]);
  const [foreground, setForeground] = useState(theme.theme.colors["editor.foreground"]);
  const [submissions, setSubmissions] = useState<{ language: string; val: string; time: number; status: string }[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<(typeof submissions)[0] | null>(null);
  const [subStatus, setSubStatus] = useState<null | string>(null);
  const closeThemeMenu = (themeName: string, fileName: string) => {
    setThemeAnchor(null);
    setTheme({ themeName, fileName, theme: require(`../../monaco-themes/${fileName}.json`) });
  };
  const fetchSupportedLanguages = async () => {
    const res = await fetch(`${judge0URL}/languages`);
    const data = await res.json();
    setSupportedLangs(data);
  };
  const submitCode = async () => {
    if (!val) return;
    let payloadVal = val;
    let test_cases = stdin;
    const { id } = supportedLangs.find(({ name }) => name === lang.langDetail)!;
    if (problem) {
      const template = Object.entries(problem).reduce((curr, [key, value]) => {
        if (key.split("_template")[0] === lang.language) {
          curr = value;
        }
        return curr;
      }, "");
      payloadVal = template.replace("/* USER IMPLEMENTATION */", val).replace('""" USER IMPLEMENTATION """', val);
      test_cases = generateTestCases(problem, 0);
      console.log(payloadVal);
    }
    try {
      const { token } = await fetch(`${judge0URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: payloadVal,
          language_id: id,
          stdin: test_cases,
        }),
      }).then((res) => res.json());
      if (token) {
        let status: any;
        do {
          ({ status } = await fetch(`${judge0URL}/submissions/${token}`).then((res) => res.json()));
          console.log(status);
          setSubStatus(status.description);
          if (status.id !== 1 || status.id !== 2) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } while (status.id === 1 || status.id === 2);
        const { stdout, stderr } = await fetch(`${judge0URL}/submissions/${token}`).then((res) => res.json());
        setSubmissions((prev) => [{ language: lang.language, val: stdout ?? stderr, time: Date.now(), status: status.description }, ...prev]);
        setSubStatus(null);
      }
    } catch (error) {
      console.error("Error occurred during submission:", error);
    }
  };
  useEffect(() => {
    console.log(submissions);
  }, [submissions]);
  useEffect(() => {
    if (!problem) return;
    setVal((prev) => {
      return Object.entries(problem).reduce((str, [key, val]) => {
        if (key.split("_body")[0] === lang.language) {
          str = val;
        }
        return str;
      }, prev);
    });
  }, [problem, lang]);
  useEffect(() => {
    console.log(subStatus);
  }, [subStatus]);
  useEffect(() => {
    fetchSupportedLanguages();
  }, []);
  useEffect(() => {
    setCurrentSubmission(submissions[0]);
  }, [submissions]);
  useEffect(() => {
    if (monaco && theme.theme) {
      monaco.editor.defineTheme(theme.themeName, theme.theme);
      monaco.editor.setTheme(theme.themeName);
      setBackground(theme.theme.colors["editor.background"]);
      setForeground(theme.theme.colors["editor.foreground"]);
    }
  }, [theme, monaco]);
  return supportedLangs.length ? (
    <div className="h-screen flex flex-col">
      <Tabs value={tab} onChange={(e: React.SyntheticEvent, newTab: number) => setTab(newTab)}>
        <Tab sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Editor"></Tab>
        {!problem && <Tab sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Stdin"></Tab>}
        <Tab sx={{ background: catppuccinColor.mantle, fontSize: "1rem" }} label="Stdout"></Tab>
      </Tabs>
      {tab === 0 ? (
        <>
          <div style={{ backgroundColor: background }} className="flex justify-between p-2 items-center">
            <div className="flex gap-2 my-2 items-center" style={{ color: foreground }}>
              <IconButton onClick={submitCode}>
                <BsPlay color={foreground} size={"1.5rem"} />
              </IconButton>
              <span> {subStatus && subStatus} </span>
            </div>
            <div>
              <IconButton onClick={(e: MouseEvent<HTMLButtonElement>) => setLangAnchor(e.currentTarget)} className="cursor-pointer">
                <lang.Icon size={"1.5rem"} color={foreground} />
              </IconButton>
              <Button className="pl-2" style={{ color: foreground }} onClick={(e: MouseEvent<HTMLButtonElement>) => setThemeAnchor(e.currentTarget)}>
                {theme.fileName}
              </Button>
              <Menu sx={{ fontSize: "0.875rem" }} anchorEl={themeAnchor} open={Boolean(themeAnchor)} onClose={() => setThemeAnchor(null)}>
                {Object.entries(themes).map(([themeName, fileName], key) => (
                  <MenuItem key={key} onClick={() => closeThemeMenu(themeName, fileName)}>
                    {fileName}
                  </MenuItem>
                ))}
              </Menu>
              <Menu sx={{ fontSize: "0.875rem" }} anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}>
                {languages.map((l, i) => (
                  <MenuItem
                    onClick={() => {
                      setLang(languages.find(({ language }) => language === l.language)!);
                      setLangAnchor(null);
                    }}
                    key={i}
                  >
                    <div className="flex gap-4 items-center p-2">
                      <l.Icon size={"2rem"} />
                      <div className="[&>*]:my-0">
                        <p className="capitalize"> {l.language} </p>
                        <p className="text=[0.6rem]"> {l.langDetail.match(/\(([^)]+)\)/)![1]} </p>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          <div style={{ backgroundColor: background }} className="h-screen">
            <MonacoEditor value={val} theme={theme.themeName} options={{ fontSize: 16 }} onChange={(value, event) => setVal(value ?? val)} language={lang.language} className="w-full h-full" />
          </div>
        </>
      ) : tab === 1 && !problem ? (
        <div className="p-4 h-full w-full">
          <div className="flex h-full gap-4">
            <p className="text-sm w-1/3 h-full">
              The textbox on the website acts as a virtual keyboard or input field for users. Users can enter data into the textbox, which serves as input for the underlying program or algorithm running on the editor. The program processes
              the entered data to perform specific tasks or calculations, displaying the results or using them for various functionalities on the website.
            </p>
            <div style={{ backgroundColor: background }} className="h-full w-2/3 py-4">
              <MonacoEditor value={stdin} theme={theme.themeName} options={{ fontSize: 16 }} onChange={(value, event) => setStdin((prev) => value || prev)} language="plain text" className="w-full h-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-[calc(100%-3rem)]">
          <div style={{ background: catppuccinColor.mantle, borderColor: catppuccinColor.mantle }} className="flex flex-col h-full w-[180px] overflow-y-auto scrollbar-thin border-0 border-r-[1px] border-solid">
            {submissions.length && currentSubmission ? (
              submissions.map(({ language, time, status }, key) => (
                <div onClick={() => setCurrentSubmission(submissions[key])} key={key}>
                  <SubmissionBox current={currentSubmission.time === time} langName={language} time={time} status={status}></SubmissionBox>
                </div>
              ))
            ) : (
              <p className="m-4"> No submissions yet </p>
            )}
          </div>
          <div className="h-full w-[calc(100%-180px)] p-4" style={{ background: catppuccinColor.base }}>
            {currentSubmission && <p> {currentSubmission.val} </p>}
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
