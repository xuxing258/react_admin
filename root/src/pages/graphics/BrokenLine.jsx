import { useBrokenLine } from "../../hooks/useHandleEcharts"


export default function BrokenLine() {
    let [domRef] =  useBrokenLine()

  return (
    <div className='cylinder' ref={domRef}>
        折线图
    </div>
  )
}
