interface Problem {
  id: number;
  status: string;
  sort: null;
  date_created: string;
  date_updated: string;
  name: string;
  description: string;
  cpp_template: string;
  java_template: string;
  javascript_template: string;
  python_template: string;
  go_template: string;
  rust_template: string;
  cpp_body: string;
  java_body: string;
  python_body: string;
  javascript_body: string;
  go_body: string;
  rust_body: string;
  parameters: Parameter[];
}

interface Parameter {
  id: number;
  problems_id: Problem;
  parameters_id: Parameter;
  name: string;
  values: number[] | number[][];
}

type Problems = Problem[]