import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getEventById } from "../../repositories/EventRepository";

export function EventDetail() {
    const { idEvent } = useParams();
    const [event, setEvent] = useState([]);

    useEffect(() => {
        getEventById(idEvent).then((res) => {
            setEvent(res.data);
            console.log(idEvent);
            console.log(res.data);
        });
    }, []);
    return (
        <div>
            {event.map((event) => (
                <div key={event}>
                    <h2>{event.name}</h2>
                    <p>{event.des}</p>
                    <p>Thời hạn đăng ký:<b>{new Date(event.reg_deadline).toLocaleDateString("en-GB")}</b></p>
                    <p>Ngày diễn ra: <b>{new Date(event.occasion_date).toLocaleDateString("en-GB")}</b></p>
                    <h3>Danh sách người tham gia:</h3>
                </div>
            ))}
        </div>
    );
}