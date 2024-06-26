import React from "react";

const initialFriends1 = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
]

export default function App() {
    const [initialFriends, setInitialFriends] = React.useState(initialFriends1)
    const [add, setAdd] = React.useState(false)
    const [input, setInput] = React.useState({ "name": "", "image": "" })
    const [selectedFriend, setSelectedFriend] = React.useState("")
    const [split, setSplit] = React.useState({ "value": "", "expense": "", "paying": "you" })
    
    

    function toggleAdd() {
        setAdd(prev => !prev)
    }

    function handleFriendsForm(e) {
        e.preventDefault()
        if (input.name !== "" && input.image !== "") {
            setInitialFriends(prev => [...prev, { ...input, id: Date.now() }])
            emptyForm()
            toggleAdd()
        }
    }

    function handleFriendsInput(e, valu) {
        setInput(prev => {return{...prev, [valu]: e}})
    }

    function emptyForm() {
        setInput({"name": "", "image": "" })
    }

    function onSelectFriends(value) {
        setSelectedFriend(value);

    }

    function handleValue(value, key) {
        setSplit(prev => { return {...prev, [key]: value } })
    }

    function handleSplitForm(e) {
        e.preventDefault()
        setInitialFriends(prev => prev.map((ele) => ele.id === selectedFriend.id ? { ...ele, balance: Number(split.value) - Number(split.expense) } : ele))
        setSplit({ "value": "", "expense": "", "paying": "you" })
        setSelectedFriend("")
    }

    return (
        <div className="main-div">
            <div className="sidebar">
                <FriendList add={add} toggleAdd={toggleAdd} handleFriendsForm={handleFriendsForm} initialFriends={initialFriends} input={input} handleFriendsInput={handleFriendsInput} onSelectFriends={onSelectFriends} selectedFriend={selectedFriend} />
                {/* <FriendList/> */}
            </div>
            {selectedFriend !== "" ? <div className="split">
                <SplitBill probs={selectedFriend} split={split} handleValue={handleValue} handleSplitForm={handleSplitForm} />
            </div> : ""}
            
        </div>
    )
}

function FriendList(probs) {
    const friend = probs.initialFriends
    return (
        <ul>
            {friend.map((ele) => {
                return <Friend probs={ele} key={ele.id} onSelectFriends={probs.onSelectFriends} selectedFriend={probs.selectedFriend} />
            })}
            <Addfriend add={probs.add} toggleAdd={probs.toggleAdd} handleFriendsForm={probs.handleFriendsForm} input={probs.input} handleFriendsInput={probs.handleFriendsInput} />
        </ul>
    )
}

function Friend({ probs, onSelectFriends, selectedFriend}) {
    return (
        <li className={selectedFriend === probs ? "active" : ""}>
            <img src={probs.image} alt={probs.name} />
            <div className="name">
                <h3>{probs.name}</h3>
                {/* <p className={probs.balance < 0 ? "red" : probs.balance > 0 ? "green" : ""} >you owe clark $8 so</p> */}
                {
                    probs.balance > 0 && <p className="green">{probs.name} owes you {Math.abs(probs.balance)}$</p>
                }
                {
                    probs.balance < 0 && <p className="red"> You owes {probs.name} {Math.abs(probs.balance)}$</p>
                }
                {
                    probs.balance === 0 && <p className=""> You and {probs.name} are even</p>
                }
            </div>
            {selectedFriend === probs ? selectedFriend === "" ? <button className="button"  onClick={() => onSelectFriends(probs)}>Select</button> : <button className="button"  onClick={() => onSelectFriends("")}>Close</button> : <button className="button"  onClick={() => onSelectFriends(probs)}>Select</button>}
        </li>
    )
}

function Addfriend(probs) {
    return (
        <>
            {
                probs.add
                    ?
                    <div className="main-form">
                        <form>
                            <div>
                                <label>🧑‍🤝‍🧑 Friend name </label> 
                                <input type="text" value={probs.input.name} onChange={(e) => probs.handleFriendsInput(e.target.value, "name")}/>
                            </div>
                            <div>
                                <label> 🌇 Image URL </label> 
                                <input type="text" value={probs.input.img} onChange={(e) => probs.handleFriendsInput(e.target.value, "image")}/>
                            </div>
                            <button className="button expand" onClick={(e) => probs.handleFriendsForm(e)}>Add</button>
                        </form>
                        <ToggleButton toggleAdd={probs.toggleAdd}>Close</ToggleButton>
                    </div>
                    : 
                    <ToggleButton toggleAdd={probs.toggleAdd}>Add</ToggleButton>
            }
        </>
    )
}

function ToggleButton(probs) {
    return <button className="btn-friend button" onClick={probs.toggleAdd}>{probs.children}</button>
}

function SplitBill({probs, split, handleValue, handleSplitForm}) {
    // console.log(probs)
    function empty() {

    }
    return (
        <form>
            <h2>Split a bill with {probs.name}</h2>
            <div>
                <label>💰 Bill value </label>
                <input type="number" min={"0"} value={split.value} onChange={(e) => Number(e.target.value) >= Number(split.expense) ? handleValue(Number(e.target.value), "value") : empty()} />
            </div>
            <div>
                <label>🧍Your expense </label>
                <input type="number" min={"0"} value={split.expense} onChange={(e) => Number(e.target.value) <= Number(split.value) ? handleValue(Number(e.target.value), "expense") : empty()} />
            </div>
            <div>
                <label>🧑‍🤝‍🧑{probs.name} expense</label>
                <input type="number" disabled value={split.value - split.expense} className="only"/>
            </div>
            <div>
                <label>🤑 Who is paying the bill ? </label>
                <select value={split.paying} onChange={(e) => handleValue(e.target.value, "paying")}>
                    <option value="you">You</option>
                    <option value="friend">{probs.name}</option>
                </select>
            </div>
            <button className="button" onClick={(e) => handleSplitForm(e)}>Add</button>
        </form>
    )
}