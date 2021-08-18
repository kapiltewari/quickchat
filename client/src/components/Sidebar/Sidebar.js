import React, { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import RoomList from "./RoomList";
import { useRoom } from "../../contexts/RoomContext";

function Sidebar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { rooms } = useRoom();

    function searchHandler(value) {
        setSearchTerm(value);
        if (searchTerm !== "") {
            const newRoomList = rooms.filter((room) => {
                return Object.values(room)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });

            setSearchResults(newRoomList);
        } else {
            setSearchResults(rooms);
        }
    }

    return (
        <div
            className='d-flex flex-column h-100 pb-4 ps-4 vh-100'
            style={{
                maxHeight: "100vh",
            }}>
            <Header />
            <Search term={searchTerm} searchKeyword={searchHandler} />
            <RoomList rooms={searchTerm.length === 0 ? rooms : searchResults} />
        </div>
    );
}

export default Sidebar;
