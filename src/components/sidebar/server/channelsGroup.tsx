import React, { MouseEvent,useState,useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Channel from './channel';
import firebase from 'firebase'
import db from '../../../firebase';
interface Channell  {
    id: string | null |undefined,
    channel: firebase.firestore.DocumentData 
    
    
}
const ChannelsGroup:React.FC = () => {

 const [channels,setChannels] = useState<Channell[]|null|undefined>(null)

 useEffect(()=>{
        db.collection("channels").onSnapshot((snapshot)=>
        setChannels(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                channel: doc.data(),
            })
            )
        )
        )
 },[])

const handleAddChannel =(e:MouseEvent<SVGSVGElement>) =>{
    e.preventDefault();
    const channelName = prompt("Enter a new channel name")
    if(channelName){
        db.collection("channels").add({
            channelName:channelName,
        })
    }
    console.log("srsly",channels)
}
    return (
        <div className="channelsGroup">
            <div className="channelsGroup-header"> 
            <div className="channelsGroup-header_title">
            <ExpandMoreIcon className="expand"/> <h5>Text Channel</h5>
            </div>
            <AddIcon onClick={(e)=>handleAddChannel(e)} className="addIcon"/>
            </div>
            {channels ? channels.map((ch):JSX.Element=><Channel id={ch.id} channel={ch.channel.channelName} />):null }
        </div>
    )
}

export default ChannelsGroup
