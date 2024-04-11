import Link from "next/link";

export function Header() {
  return (
    <div className="w-full bg-slate-700 h-16 flex items-center py-5 px-10 justify-between">
      <div>
        <p className="font-semibold text-white text-lg">Wizard Creator</p>
      </div>
      <div className="bg-white rounded-lg px-4 py-1.5 cursor-pointer">
        <Link className="text-sm" href={"/wizard-creator"}>
          Criar Wizard
        </Link>
      </div>
    </div>
  );
}
