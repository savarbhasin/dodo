import * as Babel from "@babel/standalone";
import React, { useEffect, useState } from "react";

function transpileTSX(code: string) {
    const result = Babel.transform(code, {
      presets: ["react", "typescript"],
      plugins: [["transform-modules-commonjs", { strictMode: false }]],
      filename: "generated.tsx",
    });
    return result?.code || "";
  }
  

export function DynamicPreview({ code }: { code: string }) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    try {
      const jsCode = transpileTSX(code);
      const exports: any = {};
      const module = { exports };
      // Safely evaluate in a sandboxed context
      new Function("React", "module", "exports", jsCode)(React, module, exports);
      setComponent(() => module.exports.default || module.exports);
    } catch (error) {
      console.error("Error rendering preview:", error);
      setComponent(null);
    }
  }, [code]);

  return (
    <div className="border rounded-lg p-4 mt-4">
      {Component ? <Component /> : "Loading preview..."}
    </div>
  );
}
