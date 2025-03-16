import { Button, Result } from "antd"

function FallBackUI() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh]">  <Result
    status="warning"
    title="There are some problems with your operation."
    extra={<a href="/dashboard">go home</a>}
  /></div>
  )
}

export default FallBackUI