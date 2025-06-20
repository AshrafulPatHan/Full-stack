import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <Link href='/send' className="hover:underline text-2xl ">Post</Link>
      <Link href='/read' className="hover:underline text-2xl ">Read</Link>
      <Link href='/put' className="hover:underline text-2xl ">Put</Link>
      <Link href='/delete' className="hover:underline text-2xl ">Delete</Link>
    </div>
  );
}
