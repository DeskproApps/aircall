import { Call } from "@/AirCallTypes"

export default function CallList(props: { calls: Call[] }) {
  return <div>
    <h1>Calls {props.calls.length}</h1>
    {props.calls.map((call) => {
      return <div key={call.id}>{call.id}: <a target="_blank" href={call.direct_link}>Open in Aircall</a></div>
    })}
  </div>
}