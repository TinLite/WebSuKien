import { useEffect, useState } from "react";
import { getEventCanJoin, joinEvent } from "../../repositories/EventRepository";
export function EventCanJoin() {
  const [data, setData] = useState([]);

  const populateData = () => getEventCanJoin()
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {
    populateData();
  }, []);
  return (
    <div>
      <div className="bg-primary text-white text-center py-2">
        <h5>Sự Kiện Có Thể Tham Gia</h5>
        <p> Sự kiện bạn có thể tham gia</p>
      </div>
      <div className="container mx-auto">
        {data.length === 0 ? (
          <div className="text-center">Không có sự kiện nào có thể tham gia</div>
        ) : (
          data.map((event) => (
            <div className="list-group" key={event.ID}>
              <div className="py-2">
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between mt2">
                    <h5 className="mb-1">{event.name}</h5>
                    <small>
                      {new Date(event.occasion_date).toLocaleDateString("en-GB")}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between">
                    <small className="mb-1">{event.des}</small>
                    <button onClick={() => joinEvent(event.ID).then(() => populateData()).catch(console.log)} className="btn btn-primary btn-sm ms-auto">
                      Tham gia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
