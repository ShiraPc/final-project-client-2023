import AutoComplete from "../maps/auto-complete";
export default function SingleTrack() {
    return <div>
        <AutoComplete
            setOffice={(position: any) => {
                console.log("setOffice");
                alert(position);
                position.getFromLocation(position.lat, position.len, 1);

            }} />
            <button >X</button>
    </div>
}
