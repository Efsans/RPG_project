"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import DemonRelicButton from "./DemonRelicButton";
import { rollDie, type DieKind } from "@/lib/dice/roll";

const ThreeDiceTray = dynamic(() => import("./ThreeDiceTray"), {
  ssr: false,
});

type RelicState = "idle" | "hot" | "spit";

type Props = {
  sides?: DieKind;
  size?: "table" | "pocket";
  onRolled?: (value: number, sides: DieKind) => void;
};

export default function DiceReliquary({
  sides = 20,
  size = "table",
  onRolled,
}: Props) {
  const [relic, setRelic] = useState<RelicState>("idle");
  const [showTray, setShowTray] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [pending, setPending] = useState(1);
  const pendingRef = useRef(1);
  const [busy, setBusy] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const summon = useCallback(() => {
    if (busy) return;
    const rolled = rollDie(sides);
    pendingRef.current = rolled;
    setBusy(true);
    setValue(null);
    setPending(rolled);
    setRelic("spit");
    setShowTray(true);
    onRolled?.(rolled, sides);

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, [busy, sides, onRolled]);

  const settle = useCallback(() => {
    setValue(pendingRef.current);
    setRelic("idle");
    setBusy(false);
    window.setTimeout(() => setShowTray(false), 1400);
  }, []);

  const crit = value === sides;
  const miss = value === 1;

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => !busy && setRelic("hot")}
      onMouseLeave={() => !busy && setRelic("idle")}
    >
      <DemonRelicButton
        onSummon={summon}
        disabled={busy || !mounted}
        size={size}
        state={relic}
      />

      {showTray && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {webglOk ? (
            <ThreeDiceTray
              sides={sides}
              result={pending}
              dieCount={1}
              onSettled={settle}
            />
          ) : (
            <FallbackSpit onDone={settle} />
          )}
          {value != null && (
            <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 pointer-events-none">
              <div
                className="font-display text-5xl px-8 py-3 border-2"
                style={{
                  color: crit ? "#e8c547" : miss ? "#b01c22" : "#e6d3b0",
                  borderColor: crit ? "#e8c547" : miss ? "#7a1418" : "#6e5418",
                  background: "rgba(12,8,6,0.82)",
                  letterSpacing: "0.2em",
                }}
              >
                {value}
              </div>
              <p className="text-center text-xs mt-2" style={{ color: "#9c8b6e" }}>
                d{sides} cravado
              </p>
            </div>
          )}
        </div>
      )}

      {value != null && !showTray && (
        <p className="font-display mt-3 text-lg" style={{ color: miss ? "#b01c22" : "#e8c547" }}>
          {value}
        </p>
      )}
    </div>
  );
}

function FallbackSpit({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 w-16 h-16 surface-panel dice-fly"
      style={{ ["--land-y" as string]: "80px" }}
      onAnimationEnd={onDone}
    />
  );
}
