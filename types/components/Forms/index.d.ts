export interface IOptions {
  _id: string;
  name: string;
}

export type Step = {
  type: "text" | "textarea" | "toggle" | "dropdown";
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: IOptions[];
  loading?: boolean;
};

export type StepFormProps = {
  steps: Step[];
  onComplete: (formData: Record<string, any>) => void;
};
