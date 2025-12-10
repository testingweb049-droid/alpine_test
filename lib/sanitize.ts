export function sanitize(value: string) {
    if (!value) return "";
    return value.replace(/[<>]/g, "").trim();
  }
  