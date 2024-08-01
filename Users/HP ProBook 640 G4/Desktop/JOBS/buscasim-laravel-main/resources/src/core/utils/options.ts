export function getOptionsFromArray(options: string[]) {
  return options.map((label, index) => ({
    value: String(index),
    label,
  }));
}

export function getOptionsFromObject<T extends string>(obj: Record<T, string>) {
  return Object.entries(obj).map((result) => ({
    value: result[0],
    label: result[1] as string,
  }));
}
