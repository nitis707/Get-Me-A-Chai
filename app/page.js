import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] gap-4">
        <div className="font-bold text-5xl flex gap-2 justify-center items-center">
          Buy Me A Chai <span><img className="invertImg" src="tea.gif" width={65} alt="" /></span>
        </div>

        <p>
          A crowd funding platform for creators. Get funded by your fans and followers. Start now!
        </p>

        <div>
          <Link href={"/login"}><button type="button" className="btns">Start Here</button></Link>
          <Link href={`/about`}><button type="button" className="btns">Read More</button></Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 mt-3"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Your fans can buy you a chai!</h2>
        <div className="flex justify-around gap-5">
          <div className="item">
            <img className="bg-slate-400 p-2 rounded-full" width={88} src="man.gif" alt="" />
            <p className="font-bold">Fund yourself</p>
            <p className="">Your fans are available for you to help you</p>
          </div>

          <div className="item">
            <img className="bg-slate-400 p-2 rounded-full" width={88} src="coin.gif" alt="" />
            <p className="font-bold">Fund yourself</p>
            <p className="">Your fans are available for you to help you</p>
          </div>

          <div className="item">
            <img className="bg-slate-400 p-2 rounded-full" width={88} src="group.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className="">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us!</h2>
        <div className="flex justify-center items-center">
          <iframe width="570" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=3ieztkRjrPgjybaI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}