import { useCylinder } from "../../hooks/useHandleEcharts"

export default function Cylinder() {
 let [domRef] =  useCylinder()

  return (
    <div className='cylinder' ref={domRef}>

        圆柱
    </div>
  )
}


