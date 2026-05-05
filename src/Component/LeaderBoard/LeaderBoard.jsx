import React, { useEffect, useState } from 'react'

const LeaderBoard = () => {
    const [leader,setLeader]=useState([])
    let fetchLeader=async()=>{
        try{
            let res=await fetch(`http://localhost:7000/users/leader`)
            let data = await res.json()
            if(!res.ok){
                alert(data.message)
                return
            }
            setLeader(data.response)
        }
        catch(err){
            alert(err.message)
            return
        }
    }
    useEffect(()=>{
        fetchLeader()
    },[])
    console.log("leader => ",leader);
    
  return (
    <>
        <div className="groupContainer">
            <div className="groupsBox">
                <div className="gp">
                    {
                        (leader.length>0)?(
                            leader.map(l=>(
                                <div className="grpCard" key={l._id}>
                                    <div className="grpName">
                                        {l.name}
                                    </div>
                                    <div className="grpView">
                                        <button disabled>{(l.completedTask)?(l.completedTask):0}</button>
                                        {/* <h3>{(l.completedTask)?(l.completedTask):0}</h3> */}
                                    </div>
                                </div>
                            ))
                        ):(
                            <div className="grpCard">
                                <h4>No data</h4>
                            </div>
                        )
                    }
                    {/* <div className="grpCard">
                        <div className="grpName">
                            deepak
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default LeaderBoard