import { Render } from "@measured/puck";
import { PuckProps } from "./puck.types";

export function PuckRender({ data, config }: PuckProps) {
  return <Render config={config} data={data} />;
}
