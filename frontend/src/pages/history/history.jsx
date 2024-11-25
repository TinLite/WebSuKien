import { useState } from "react";
import { useEffect } from "react";
import { getHistory } from "../../repositories/UserRepository";

export function History() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getHistory().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="bg-primary text-white text-center py-2">
        <h5>Lịch Sử Sự Kiện</h5>
        <p>Sự kiện bạn đã tham gia</p>
      </div>
      <div className="container mx-auto">
        <div className="py-2">
          {data.length === 0 ? (
            <div className="text-center">Không có lịch sử sự kiện</div>
          ) : (
            data.map((history) => (
              <div className="list-group" key={history.ID}>
                <a href="/" className="list-group-item list-group-item-action">
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-1">{history.name}</h5>
                    <small>
                      {new Date(history.occasion_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </small>
                  </div>
                  <small className="mb-1">{history.des}</small>
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
