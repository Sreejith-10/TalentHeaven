import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <h1 className="font-bold text-[60px]">404</h1>
      <br />
      <h2 className="text-[30px] font-semibold text-slate-700 dark:text-slate-100">
        You&lsquo;ve found a page that doesn&lsquo;t exist
      </h2>
      <p className="text-slate-500">
        Breathe in, and on the breath out, go back and try agian
      </p>
      <br />
      <Link href={"/"} className="hover:underline font-semibold">
        Go Back Home
      </Link>
    </div>
  );
}
