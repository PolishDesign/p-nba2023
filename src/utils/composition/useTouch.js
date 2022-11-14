import { reactive } from 'vue'
import { useLog } from '@/utils/composition/useLog.js'
export function useTouch(callback) {
  const pStart = reactive({ x: 0, y: 0 })
  const pStop = reactive({ x: 0, y: 0 })
  const { debug } = useLog()

  const isPullUp = (dY, dX) => {
    debug(`dY ${dY}`)
    debug(`dX ${dX}`)
    return (
      dY > 0 &&
      (Math.abs(dX) <= 100 && Math.abs(dY) >= 40)
    );
  }
  const swipeCheck = () => {
    const changeY = pStart.y - pStop.y;
    const changeX = pStart.x - pStop.x;
    if (isPullUp(changeY, changeX)) {
      callback()
    }
  }
  const swipeStart = (e) => {
    if (typeof e["targetTouches"] !== "undefined") {
      const touch = e.targetTouches[0];
      pStart.x = touch.screenX;
      pStart.y = touch.screenY;
    } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
    }
  }

  const swipeEnd = (e) => {
    if (typeof e["changedTouches"] !== "undefined") {
      const touch = e.changedTouches[0];
      pStop.x = touch.screenX;
      pStop.y = touch.screenY;
    } else {
      pStop.x = e.screenX;
      pStop.y = e.screenY;
    }
    swipeCheck();
  }

  return {
    swipeStart,
    swipeEnd
  }
}