import Image from "next/image";

export default function TestComp() {


  return (
    <div>
      TestComponent
      <Image src="/assets/images/bg-profile.jpg" width={40} height={120} alt="asd"/>
    </div>
  )
}