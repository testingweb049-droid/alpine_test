import { useState, useEffect } from "react";

export const useTypewriter = (
  list: string[],
  active: boolean
): [string, (b: boolean) => void] => {
  const [text, setText] = useState(list[0]);
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!active || paused) return;
    const full = list[idx];
    const speed = del ? 35 : 55;
    const endPause = 900;

    const tick = () => {
      if (!del) {
        const next = full.slice(0, char + 1);
        setText(next);
        setChar((c) => c + 1);
        if (next.length === full.length) setTimeout(() => setDel(true), endPause);
      } else {
        const next = full.slice(0, char - 1);
        setText(next);
        setChar((c) => c - 1);
        if (next.length === 0) {
          setDel(false);
          setIdx((i) => (i + 1) % list.length);
        }
      }
    };

    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [active, paused, idx, char, del, list]);

  useEffect(() => {
    setChar(0);
    setDel(false);
  }, [idx]);

  return [text, setPaused];
};

