import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full  z-10">
      <nav className="container  flex flex-wrap items-center justify-between mx-auto p-8">
        <Link className="font-bond text-xl" href="/">
          Lead Forms
        </Link>
        <div className="space-x-4 text-xl">
          <Link href="/admins">Admins</Link>
        </div>
      </nav>
    </div>
  );
}
